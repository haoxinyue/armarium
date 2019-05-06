package com.jiabo.medical.service.cases;

import java.sql.Timestamp;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.sql.visitor.functions.Substring;
import com.alibaba.druid.util.StringUtils;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.entity.User;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.MtCaseMapper;
import com.jiabo.medical.mapper.UserRoleMapper;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.util.CommonUtils;


@Service
public class CaseService {
	
	//产品名称:云通信短信API产品,开发者无需替换
    static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    static final String domain = "dysmsapi.aliyuncs.com";

    // TODO 此处需要替换成开发者自己的AK(在阿里云访问控制台寻找)
    static final String accessKeyId = "LTAIeR0KwW9P3ZxQ";
    static final String accessKeySecret = "bM9Op8g6H3XdtvKq8xCio63Hr24qY5";
    
	@Autowired
	private MtCaseMapper caseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;
	
	@Autowired
	private UserRoleMapper usrMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<MtCaseDTO>> getMtCaseInfos(MtCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<MtCaseDTO>> res = new ResponseDTO<List<MtCaseDTO>>();
		
		if (caseDto.getAssigneeUserId() != null) {
			List<String> roleNames = caseMapper.getRoleName(caseDto.getAssigneeUserId());
			
			boolean engineerFlg = false;
			for (String roleName : roleNames) {
				if (roleName.endsWith(ConstantInfo.ROLE_ENGINEER)) {
					engineerFlg = true;
				}
			}
			
			if (!engineerFlg) {
				caseDto.setAssigneeUserId(null);
			}
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*caseDto.getPageSize());
		}
		
		recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的报修单信息!";
			return res;
		}
		
		
		
		List<MtCaseDTO> mtCases = caseMapper.getMtCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	
	
public ResponseDTO<MtCaseDTO> getMtCaseInfo(int caseId) {
		
		ResponseDTO<MtCaseDTO> res = new ResponseDTO<MtCaseDTO>();

		MtCaseDTO mtCase = caseMapper.getMtCaseInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的报修单信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

	public ResponseDTO<List<MtCaseDTO>> getCaseTimeShaft(int caseId) {
	
		ResponseDTO<List<MtCaseDTO>> res = new ResponseDTO<List<MtCaseDTO>>();
	
		List<MtCaseDTO> mtCase = caseMapper.getCaseTimeShaft(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合条件的报修单时间轴信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = mtCase.size();
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO addMtCase(MtCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getDeviceId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备编号未输入";
			
			return res;
		}
		
		if (caseMapper.getDeviceCount(caseDto.getDeviceId()) == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "不存在此设备ID";
			
			return res;
		}
		
		
		if (StringUtils.isEmpty(caseDto.getReporterWeixin()) && 
				caseDto.getReporterUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "报修人微信号或账号为空";
			
			return res;
		}
		
		
		List<Integer> assignees =  caseMapper.getAssigneeIds("调度");
		
		if (assignees == null || assignees.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "调度担当人不存在";
			
			return res;
		}
		
		int assigneeUserId = assignees.get(0);
		
		caseDto.setAssigneeUserId(assigneeUserId);
		
		// 工单状态设置为'报修中（10）'
		caseDto.setCaseState(10);
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setCreateTime(now);
		caseDto.setModifyTime(now);
		
		try {
			int count = caseMapper.addMtCase(caseDto);
			
			if (count > 0) {
				
				int seqNo= caseMapper.getSequenceNo();
				caseDto.setCaseId(seqNo);
				caseDto.setHisRemark(caseDto.getCaseRemark());
				
				count = caseMapper.addMtCaseHistory(caseDto);
				
				if (count > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "报修工单创建成功";
					
					res.recordCount = count;
					
					res.data = caseDto;
				}
				
				Equipment equipInfo = equipMapper.getEquipmentInfo(caseDto.getDeviceId());
				
				String params = "{\"device_name\":\"" + equipInfo.getDeviceName() +"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)+"\"}";
				sendMobileMsg(caseDto.getReporterMobile(), "SMS_144146674", params);
				
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}

	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO updMtCase(MtCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getReporterUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "用户处理人ID为空";
			
			return res;
		}
		
		if (caseDto.getCaseState() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "工单状态未指定";
			
			return res;
		}
		
		int assigneeUserId;
		String assignerUserRole = null;
		
		if (caseDto.getReporterUserId() != null && caseDto.getAssigneeUserId() == null) {
		
			assignerUserRole = getAssignerUserRole(caseDto.getReporterUserId());
			if (assignerUserRole == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "用户角色未指定";
				
				return res;
			}
			
			
			List<Integer> assignees =  caseMapper.getAssigneeIds(assignerUserRole);
			
			if (assignees == null || assignees.size() == 0) {
				res.code = ConstantInfo.INVALID;
				res.message = "不存在该"+assignerUserRole;
				
				return res;
			}
			
			assigneeUserId = assignees.get(0);
			caseDto.setAssigneeUserId(assigneeUserId);
		}
		
		
		// 工单状态设置为'维修处理中（30）'
		caseDto.setCaseState(caseDto.getCaseState());
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		
		
		try {
			int count = caseMapper.updMtCaseState(caseDto);
			
			if (count > 0) {
				caseDto.setHisRemark(caseDto.getCaseRemark());
				caseDto.setCreateTime(now);
				caseDto.setCreater(caseDto.getModifier());
				
				count = caseMapper.addMtCaseHistory(caseDto);
				
				if (count > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "工单状态更新成功";
					res.recordCount = count;
					res.data = caseDto;
				}
				
				
				int userId;
				if (ConstantInfo.ROLE_RESIDENT_ENGINEER.equals(assignerUserRole)) {
					userId = caseDto.getAssigneeUserId();
				} else {
					userId = caseDto.getReporterUserId();
				}
				
				/*Equipment equipInfo = equipMapper.getEquipmentInfo(caseDto.getDeviceId());
				
				User usrInfo = usrMapper.getUserInfo(userId);
				
				String params = "{\"device_name\":\"" + equipInfo.getDeviceName() 
     		 	+"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)
     		 	+"\", \"case_state\":\"维修中\", \"engineer_name\":\""+usrInfo.getDisplayName()
     		 	+"\",\"engineer_mobile\":\""+usrInfo.getMobile()+"\"}";*/
     		 //sendMobileMsg(caseDto.getReporterMobile(), "SMS_144146678", params);
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "工单状态更新失败，请确认是否存在此纪录";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
		
	}
	
	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO closeMtCase(MtCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getReporterUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "用户处理人ID为空";
			
			return res;
		}
		
		if (caseDto.getDeviceId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备ID为空";
			
			return res;
		}

		// 工单状态设置为'已关闭（50）'
		caseDto.setCaseState(50);
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		
		
		try {
			int count = caseMapper.updMtCaseState(caseDto);
			
			if (count > 0) {
				caseDto.setHisRemark(caseDto.getCaseRemark());
				caseDto.setCreateTime(now);
				caseDto.setCreater(caseDto.getModifier());
				
				count = caseMapper.addMtCaseHistory(caseDto);
				
				if (count > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "工单已关闭";
					
					res.data = caseDto;
				}
				
				DvTimelineDTO timelineDto = new DvTimelineDTO();
				
				timelineDto.setDeviceId(caseDto.getDeviceId());
				timelineDto.setEventSubject(caseDto.getCaseSubject());
				timelineDto.setEventType(30);  // 报修
				timelineDto.setEventId(caseDto.getCaseId());
				timelineDto.setEventTime(now);
				
				timelineDto.setCreateTime(now);
				timelineDto.setModifyTime(now);
				timelineDto.setCreater(caseDto.getModifier());
				timelineDto.setModifier(caseDto.getModifier());
				timelineDto.setUserId(caseDto.getReporterUserId());
				
				tlCaseMapper.addDvTimelineCase(timelineDto);
				
//				Equipment equipInfo = equipMapper.getEquipmentInfo(caseDto.getDeviceId());
//				User usrInfo = usrMapper.getUserInfo(caseDto.getReporterUserId());
//				
//				String params = "{\"device_name\":\"" + equipInfo.getDeviceName() 
//     		 	+"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)
//     		 	+"\", \"engineer_name\":\""+usrInfo.getDisplayName()
//     		 	+"\",\"engineer_mobile\":\""+usrInfo.getMobile()+"\"}";
				
				//sendMobileMsg(caseDto.getReporterMobile(), "SMS_144151765", params);
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "工单关闭失败，请确认是否存在此纪录";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
		
	}

	public ResponseDTO rotateMtCaseState(MtCaseDTO caseDto) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getAssigneeUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "被指派人ID为空";
			
			return res;
		}
		
		//轮询待处理工单
		int count = caseMapper.rotateMtCaseState(caseDto.getAssigneeUserId());
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.recordCount = count;
			res.message = "有新的报修工单待处理";
		} else {
			res.code = ConstantInfo.NORMAL;
			res.message = "";
		}
		return res;
	}
	
	private String getAssignerUserRole(int userId) {
		
		String assignerUserRole = null;
		String reportUserRole = caseMapper.getRoleName(userId).get(0);
		
		if (StringUtils.isEmpty(reportUserRole)) {
			return assignerUserRole; 
		}
		
		if (reportUserRole.indexOf(ConstantInfo.ROLE_ENGINEER) >= 0) {
			assignerUserRole = ConstantInfo.ROLE_CHARGER;
		} else if (reportUserRole.indexOf(ConstantInfo.ROLE_MANAGER) >= 0) {
			assignerUserRole = ConstantInfo.ROLE_RESIDENT_ENGINEER;
		}  
		
		return assignerUserRole;

	}
	
	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO addMockMtCase(MtCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getDeviceId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备编号未输入";
			
			return res;
		}
		
		if (caseMapper.getDeviceCount(caseDto.getDeviceId()) == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "不存在此设备ID";
			
			return res;
		}
		
		/*if (StringUtils.isEmpty(caseDto.getReporterName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定报修人";
			
			return res;
		}
		
		if (StringUtils.isEmpty(caseDto.getReporterMobile())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未输入报修人手机";
			
			return res;
		}*/
		
		
		List<Integer> assignees =  caseMapper.getAssigneeIds("调度");
		
		if (assignees == null || assignees.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "调度担当人不存在";
			
			return res;
		}
		
		int assigneeUserId = assignees.get(0);
		
		caseDto.setAssigneeUserId(assigneeUserId);
		
		// 工单状态设置为'报修中（10）'
		caseDto.setCaseState(10);
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setCreateTime(now);
		caseDto.setModifyTime(now);
		
		try {
			int count = caseMapper.addMtCase(caseDto);
			
			if (count > 0) {
				
				int seqNo= caseMapper.getSequenceNo();
				caseDto.setCaseId(seqNo);
				caseDto.setHisRemark(caseDto.getCaseRemark());
				
				count = caseMapper.addMtCaseHistory(caseDto);
				
				if (count > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "报修工单创建成功";
					
					res.recordCount = count;
					
					res.data = caseDto;
				}
				
				Equipment equipInfo = equipMapper.getEquipmentInfo(caseDto.getDeviceId());
				
				mockUpdMtCase(caseDto, equipInfo);
				
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}
	
	private void mockUpdMtCase(final MtCaseDTO caseDto, final Equipment equipInfo) {
		
		String params = "{\"device_name\":\"" + equipInfo.getDeviceName() +"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)+"\"}";
		sendMobileMsg(caseDto.getReporterMobile(), "SMS_144146674", params);
		 
		Timer timer = new Timer();
		
		TimerTask t1 = new TimerTask() {
            @Override
            public void run() {
          	  
            	caseDto.setCaseState(25);//已派单
          	  
            	Timestamp now = new Timestamp(System.currentTimeMillis());
        		
        		 caseDto.setModifyTime(now);
        		   
        		 int count = caseMapper.updMtCaseState(caseDto);
        		   
        		 if (count > 0) {
	   				caseDto.setCreateTime(now);
	   				caseDto.setCreater(caseDto.getModifier());
	   				
	   				count = caseMapper.addMtCaseHistory(caseDto);
        		 }
        		 
        		 String params = "{\"device_name\":\"" + equipInfo.getDeviceName() 
        		 	+"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)
        		 	+"\", \"case_state\":\"已派单\", \"engineer_name\":\"吴亦凡\",\"engineer_mobile\":\"13918532856\"}";
        		 sendMobileMsg(caseDto.getReporterMobile(), "SMS_144855162", params);
            }
        };
		
		timer.schedule(t1, 30000);
		
		
		TimerTask t2 = new TimerTask() {
            @Override
            public void run() {
          	  
          	 caseDto.setCaseState(30); //维修中
          	  
          	 Timestamp now = new Timestamp(System.currentTimeMillis());
        		
        		 caseDto.setModifyTime(now);
        		   
        		 int count = caseMapper.updMtCaseState(caseDto);
        		   
        		 if (count > 0) {
	   				caseDto.setCreateTime(now);
	   				caseDto.setCreater(caseDto.getModifier());
	   				
	   				count = caseMapper.addMtCaseHistory(caseDto);
        		 }
        		 
        		 String params = "{\"device_name\":\"" + equipInfo.getDeviceName() 
     		 	+"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)
     		 	+"\", \"case_state\":\"维修中\", \"engineer_name\":\"吴亦凡\",\"engineer_mobile\":\"13918532856\"}";
     		 sendMobileMsg(caseDto.getReporterMobile(), "SMS_144855162", params);
            }
        };
		
		timer.schedule(t2, 60000);
		
		TimerTask t3 = new TimerTask() {
            @Override
            public void run() {
          	  
          	 caseDto.setCaseState(50); //已关闭
          	  
          	 Timestamp now = new Timestamp(System.currentTimeMillis());
        		
        		 caseDto.setModifyTime(now);
        		   
        		 int count = caseMapper.updMtCaseState(caseDto);
        		   
        		 if (count > 0) {
	   				caseDto.setCreateTime(now);
	   				caseDto.setCreater(caseDto.getModifier());
	   				
	   				count = caseMapper.addMtCaseHistory(caseDto);
        		 }
        		 
        		 String params = "{\"device_name\":\"" + equipInfo.getDeviceName() 
     		 	+"\", \"device_code\":\""+CommonUtils.substring(equipInfo.getDeviceCode(),20)
     		 	+"\", \"engineer_name\":\"吴亦凡\",\"engineer_mobile\":\"13918532856\"}";
     		 sendMobileMsg(caseDto.getReporterMobile(), "SMS_144151765", params);
            }
        };
		
		timer.schedule(t3, 90000);
		
	}
	
	
	public void sendMobileMsg(String phoneNumber, String tmpltCode, String tmpltParams) {
		//可自助调整超时时间
        System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
        System.setProperty("sun.net.client.defaultReadTimeout", "10000");

        //初始化acsClient,暂不支持region化
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        try {
			DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
		} catch (ClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        IAcsClient acsClient = new DefaultAcsClient(profile);
        
        //组装请求对象-具体描述见控制台-文档部分内容
        SendSmsRequest request = new SendSmsRequest();
        //必填:待发送手机号
        request.setPhoneNumbers(phoneNumber);
        
        //必填:短信签名-可在短信控制台中找到
        request.setSignName(ConstantInfo.SIGN_NAME);
        //必填:短信模板-可在短信控制台中找到
        request.setTemplateCode(tmpltCode);
        
        //可选:模板中的变量替换串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
        request.setTemplateParam(tmpltParams);
        
        //hint 此处可能会抛出异常，注意catch
        try {
			SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
			
			String result = sendSmsResponse.getCode();
		} catch (ServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
}
