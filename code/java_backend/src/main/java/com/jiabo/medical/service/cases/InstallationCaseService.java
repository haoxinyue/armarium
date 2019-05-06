package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.InsCaseMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class InstallationCaseService {
	
	@Value("${user.rolename}")
	private String roleName;
	
	@Autowired
	private InsCaseMapper caseMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<InstCaseDTO>> getInsCaseInfos(InstCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<InstCaseDTO>> res = new ResponseDTO<List<InstCaseDTO>>();
		
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
		
		if (!StringUtils.isEmpty(caseDto.getDeviceCode())) 
		caseDto.setDeviceCode("%" + caseDto.getDeviceCode() + "%");
		
		if (!StringUtils.isEmpty(caseDto.getDeviceName())) 
		caseDto.setDeviceName("%" + caseDto.getDeviceName() + "%");
		
		recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的安装单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<InstCaseDTO> mtCases = caseMapper.getInsCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO<InstCaseDTO> getInsCaseInfo(int caseId) {
		
		ResponseDTO<InstCaseDTO> res = new ResponseDTO<InstCaseDTO>();

		InstCaseDTO mtCase = caseMapper.getInsCaseInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的安装单信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}


	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO addInsCase(InstCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		//for (InstCaseDTO caseDto : caseDtos) {
		
			if (StringUtils.isEmpty(caseDto.getDeviceName())) {
				res.code = ConstantInfo.INVALID;
				res.message = "存在未输入的设备名";
				
				return res;
			}
			
			if (caseDto.getHospitalId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "存在未输入的医院";
				
				return res;
			}
			
			if (caseDto.getDeptId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "存在未输入的科室！";
				
				return res;
			}
			
			if (caseDto.getDeviceType() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "存在未输入的设备类型！";
				
				return res;
			}
			
			if (StringUtils.isEmpty(caseDto.getExpectedTime())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未输入期待安装时间";
				
				return res;
			}
			
			if (caseDto.getAssigneeUserId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未选择被指派工程师";
				
				return res;
			}
		//}
		
		
		/*List<Integer> assignees =  caseMapper.getAssigneeIds("调度");
		
		if (assignees == null || assignees.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "调度担当人不存在";
			
			return res;
		}
		
		int assigneeUserId = assignees.get(0);
		
		caseDto.setAssigneeUserId(assigneeUserId);*/
		
		// 工单状态设置为'待安装（10）'
		caseDto.setCaseState(10);
		caseDto.setCaseSubject(caseDto.getDeviceName()+"设备安装");
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setCreateTime(now);
		caseDto.setModifyTime(now);
		
		try {
			int count = caseMapper.addInsCase(caseDto);
			
			if (count > 0) {
				
				int caseSeqNo= caseMapper.getSequenceNo();
				caseDto.setCaseId(caseSeqNo);
				
				Equipment equip = new Equipment();
				
				equip.setSetupCaseId(caseSeqNo);
				
				int equipSeqNo= equipMapper.getSequenceNo() + 1;
				
				caseDto.setDeviceId(equipSeqNo);
				
				equip.setQrCode(String.valueOf(equipSeqNo));
				
				equip.setDeviceModel(caseDto.getDeviceModel());
				
				equip.setDeviceType(caseDto.getDeviceType());
				
				equip.setDeviceName(caseDto.getDeviceName());
				
				equip.setUsageState(2);//2:安装中
				
				
				equip.setCreateTime(now);
				equip.setModifyTime(now);
				equip.setCreater(caseDto.getCreater());
				equip.setModifier(caseDto.getCreater());
				
				count = equipMapper.addEquipmentInfo(equip);
				
				if (count > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "安装工单创建成功";
					
					res.recordCount = count;
					
					res.data = caseDto;
				} else {
					res.code = ConstantInfo.INVALID;
					res.message = "新增设备失败";
				}
				
				
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}

	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO completeInsCase(InstCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		// 工单状态设置为'已关闭（50）'
		caseDto.setCaseState(50);
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		caseDto.setSetupTime(now.toString());
		
		try {
			int count = caseMapper.updInsCase(caseDto);
			
			if (count > 0) {
				
				Equipment equip = new Equipment();
				
				//BeanUtils.copyProperties(caseDto, equip);
				
				
				equip.setAssetNo(caseDto.getAssetNo());
				equip.setDeviceName(caseDto.getDeviceName());
				equip.setDeviceCode(caseDto.getDeviceCode());
				equip.setDeviceModel(caseDto.getDeviceModel());
				equip.setDeviceDesc(caseDto.getDeviceDesc());
				equip.setSerialNumber(caseDto.getSerialNumber());
				equip.setManufacturer(caseDto.getManufacturer());
				equip.setProducingPlace(caseDto.getProducingPlace());
				
				
				equip.setSetupCaseId(caseDto.getCaseId());
				equip.setSetupDate(now.toString());
				equip.setUsageState(1); // '使用中'
				equip.setModifyTime(now);
				equip.setModifier(caseDto.getModifier());
				
				count = equipMapper.updEquipmentInfo(equip);
				
				if (count > 0) {
					
					res.code = ConstantInfo.NORMAL;
					res.message = "工单更新成功";
					res.recordCount = count;
					res.data = caseDto;
					
					int deviceId = equipMapper.getEquipId(caseDto.getCaseId());
					
					DvTimelineDTO timelineDto = new DvTimelineDTO();
					
					timelineDto.setDeviceId(deviceId);
					timelineDto.setEventSubject(caseDto.getCaseSubject());
					timelineDto.setEventType(10);  // 安装
					timelineDto.setEventId(caseDto.getCaseId());
					timelineDto.setEventTime(now);
					timelineDto.setUserId(caseDto.getAssigneeUserId());
					
					timelineDto.setCreateTime(now);
					timelineDto.setModifyTime(now);
					timelineDto.setCreater(caseDto.getModifier());
					timelineDto.setModifier(caseDto.getModifier());
					
					tlCaseMapper.addDvTimelineCase(timelineDto);
					
				} else {
					res.code = ConstantInfo.INVALID;
					res.message = "设备更新失败，请确认是否存在此设备";
				}
				
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "工单更新失败，请确认是否存在此纪录";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
		
	}
	
	/*@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO closeInsCase(InstCaseDTO caseDto) {

		ResponseDTO res = new ResponseDTO();

		// 工单状态设置为'已关闭（50）'
		caseDto.setCaseState(50);
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		
		
		try {
			int count = caseMapper.updInsCase(caseDto);
			
			if (count > 0) {
				
				Equipment equip = new Equipment();
				
				equip.setSetupCaseId(caseDto.getCaseId());
				equip.setUsageState(1); // '使用中'
				
				count = equipMapper.updEquipUsageState(equip);
				
				if (count > 0) {
				
					res.code = ConstantInfo.NORMAL;
					res.message = "工单已关闭";
					res.recordCount = count;
					res.data = caseDto;
				} else {
					res.code = ConstantInfo.INVALID;
					res.message = "设备状态更新失败";
				}
				
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
		
	}*/

	public ResponseDTO rotateInsCaseState(InstCaseDTO caseDto) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getAssigneeUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "被指派人未设置";
			
			return res;
		}
		
		//轮询待处理工单
		int count = caseMapper.rotateInsCaseState(caseDto.getAssigneeUserId());
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.recordCount = count;
			res.message = "有委托的安装工单待处理";
		} else {
			res.code = ConstantInfo.NORMAL;
			res.message = "";
		}
		return res;
	}
	
}
