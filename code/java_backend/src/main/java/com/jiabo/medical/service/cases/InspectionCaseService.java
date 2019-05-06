package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
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
import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.InspCaseMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class InspectionCaseService {
	
	@Value("${user.rolename}")
	private String roleName;
	
	@Autowired
	private InspCaseMapper caseMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<InspCaseDTO>> getInspCaseInfos(InspCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<InspCaseDTO>> res = new ResponseDTO<List<InspCaseDTO>>();
		
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
			res.message = "没有符合该条件的巡检单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<InspCaseDTO> mtCases = caseMapper.getInspCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	

	
	public ResponseDTO<InspCaseDTO> getInspCaseInfo(int caseId) {
		
		ResponseDTO<InspCaseDTO> res = new ResponseDTO<InspCaseDTO>();

		InspCaseDTO mtCase = caseMapper.getInspCaseInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的巡检单信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public ResponseDTO completeInspCase(InspCaseDTO caseDto) {

	ResponseDTO res = new ResponseDTO();
	
	if (caseDto.getDeviceId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未选择巡检设备!";
		return res;
	}
	
	caseDto.setInspectionType(1);
	
	// 工单状态设置为'已关闭（50）'
	caseDto.setCaseState(50);
	
	Timestamp now = new Timestamp(System.currentTimeMillis());
	
	caseDto.setModifyTime(now);
	caseDto.setCreateTime(now);
	caseDto.setInspectionTime(now.toString());
	
	try {
		int count = caseMapper.addInspCase(caseDto);
		
		if (count > 0) {
			
			Equipment intervalInfo = equipMapper.getInspDeviceInfo(caseDto.getDeviceId());
			
			Equipment equip = new Equipment();
			
			equip.setDeviceId(caseDto.getDeviceId());
			
			long interval = intervalInfo.getInspectionInterval();
			
			long nextInspectionDate = now.getTime() + interval*24*3600*1000;
			
			equip.setNextInspectionDate(new Timestamp(nextInspectionDate));
			
			equipMapper.updEquipInspTime(equip);
			
			caseDto.setCaseId(caseMapper.getSequenceNo());
			
			res.code = ConstantInfo.NORMAL;
			res.message = "巡检处理完成";
			res.recordCount = count;
			res.data = caseDto;
			
			DvTimelineDTO timelineDto = new DvTimelineDTO();
			
			timelineDto.setDeviceId(caseDto.getDeviceId());
			timelineDto.setEventSubject(caseDto.getCaseSubject());
			timelineDto.setEventType(50);  // 不良事件
			timelineDto.setEventId(caseDto.getCaseId());
			timelineDto.setEventTime(now);
			
			timelineDto.setCreateTime(now);
			timelineDto.setModifyTime(now);
			timelineDto.setCreater(caseDto.getModifier());
			timelineDto.setModifier(caseDto.getModifier());
			timelineDto.setUserId(caseDto.getModifier());
			
			tlCaseMapper.addDvTimelineCase(timelineDto);
			
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


	public ResponseDTO getInspDevices(int assigneeUserId) {
		
		ResponseDTO res = new ResponseDTO();
		
		List<Equipment> inspecList = new ArrayList<Equipment>();
		
		//String role = caseMapper.getRoleName(assigneeUserId);
		
		//轮询待处理工单
		List<Equipment> totalList = equipMapper.getInspDeviceInfos(assigneeUserId);
		
		long now = System.currentTimeMillis();
		
		for (Equipment equip : totalList) {
			long leftTime = equip.getNextInspectionDate().getTime() - now;
			
			if (leftTime/(1000*60*60*24) <= 30) {
				inspecList.add(equip);
			}
		}
		
		
		res.code = ConstantInfo.NORMAL;
		res.recordCount = inspecList.size();
		
		if (res.recordCount > 0) {
			res.data = inspecList;
			res.message = "查询成功";
		}
		
		return res;
	}
	
	public ResponseDTO rotateInspCaseState(Integer assigneeUserId) {
		
		ResponseDTO res = new ResponseDTO();
		
		boolean stateFlg = false;
		
		//String role = caseMapper.getRoleName(assigneeUserId);
		
		//轮询待处理工单
		List<Equipment> totalList = equipMapper.getInspDeviceInfos(assigneeUserId);
		
		long now = System.currentTimeMillis();
		
		for (Equipment equip : totalList) {
			long leftTime = equip.getNextInspectionDate().getTime() - now;
			
			if (leftTime/(1000*60*60*24) <= 30) {
				stateFlg = true;
				break;
			}
		}
		
		if (stateFlg) {
			res.code = ConstantInfo.NORMAL;
			res.message = "有新的设备巡检单待处理";
		}
		
		return res;
	}

}
