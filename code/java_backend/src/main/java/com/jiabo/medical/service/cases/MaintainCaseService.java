package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
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
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.MaintainCaseMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class MaintainCaseService {
	
	@Autowired
	private MaintainCaseMapper caseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<PmCaseDTO>> getPmCaseInfos(PmCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<PmCaseDTO>> res = new ResponseDTO<List<PmCaseDTO>>();
		
		caseDto.setCaseState(10);
		
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
			res.message = "没有符合该条件的保养单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<PmCaseDTO> mtCases = caseMapper.getMainCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	
	
public ResponseDTO<PmCaseDTO> getPmCaseInfo(int caseId) {
		
		ResponseDTO<PmCaseDTO> res = new ResponseDTO<PmCaseDTO>();

		PmCaseDTO mtCase = caseMapper.getMainCaseInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的保养单信息!";
			return res;
		}
		
		if (!StringUtils.isEmpty(mtCase.getPmFile())) {
			String pmFileName = mtCase.getPmFile().substring(mtCase.getPmFile().lastIndexOf("/")+1);
			mtCase.setPmFileName(pmFileName);
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public ResponseDTO completePmCase(PmCaseDTO caseDto) {

	ResponseDTO res = new ResponseDTO();
	
	if (caseDto.getDeviceId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未选择保养设备!";
		return res;
	}
	
	
	if (caseDto.getActualUserId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未输入实际保养人!";
		return res;
	}

	// 工单状态设置为'已关闭（50）'
	caseDto.setCaseState(50);
	
	Timestamp now = new Timestamp(System.currentTimeMillis());
	
	caseDto.setModifyTime(now);
	caseDto.setCreateTime(now);
	
	try {
		
		int count;
		List<Integer> caseIds = caseMapper.getPmCaseId(caseDto.getDeviceId());
		if (caseIds != null && caseIds.size() > 0) {
			caseDto.setCaseId(caseIds.get(0));
			count = caseMapper.updMaintainCase(caseDto);
		} else {
			
			caseDto.setCreater(caseDto.getActualUserId());
			caseDto.setCreateTime(now);
			count = caseMapper.addMaintainCase(caseDto);
			
			caseDto.setCaseId(caseMapper.getSequenceNo());
		}
		
		if (count > 0) {
			
			Equipment intervalInfo = equipMapper.getPmDeviceInfo(caseDto.getDeviceId());
			
			Equipment equip = new Equipment();
			
			equip.setDeviceId(caseDto.getDeviceId());
			
			long interval = intervalInfo.getMaintenanceInterval();
			
			long nextPmDate = now.getTime() + interval*24*3600*1000;
			
			equip.setNextMaintenanceDate(new Timestamp(nextPmDate));
			
			equipMapper.updEquipPmTime(equip);
			
			res.code = ConstantInfo.NORMAL;
			res.message = "工单更新成功";
			res.recordCount = count;
			res.data = caseDto;
			
			DvTimelineDTO timelineDto = new DvTimelineDTO();
			
			timelineDto.setDeviceId(caseDto.getDeviceId());
			timelineDto.setEventSubject(caseDto.getCaseSubject());
			timelineDto.setEventType(40);  // 保养
			timelineDto.setEventId(caseDto.getCaseId());
			timelineDto.setEventTime(now);
			timelineDto.setUserId(caseDto.getActualUserId());
			
			timelineDto.setCreateTime(now);
			timelineDto.setModifyTime(now);
			timelineDto.setCreater(caseDto.getModifier());
			timelineDto.setModifier(caseDto.getModifier());
			
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

	public ResponseDTO rotateMaintainCaseState(Integer assigneeUserId) {
		ResponseDTO res = new ResponseDTO();
		
		if (assigneeUserId == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "被指派人ID为空";
			
			return res;
		}
		
		//轮询待处理工单
		int count = caseMapper.rotateMtCaseState(assigneeUserId);
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.recordCount = count;
			res.message = "有新的保养工单待处理";
		} else {
			res.code = ConstantInfo.NORMAL;
			res.message = "";
		}
		
		return res;
	}

	// 增加
	public  void addMaintainCase(PmCaseDTO caseDto) {
		
		
		Calendar c = Calendar.getInstance();
		
		if (c.get(Calendar.DATE) == 15) {
			
		}
		
	}
	
	

}
