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
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.entity.MeteringCaseDTO;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.InspCaseMapper;
import com.jiabo.medical.mapper.MeterCaseMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class MeteringCaseService {
	
	@Value("${user.rolename}")
	private String roleName;
	
	@Autowired
	private MeterCaseMapper caseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<MeteringCaseDTO>> getMeterCaseInfos(MeteringCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<MeteringCaseDTO>> res = new ResponseDTO<List<MeteringCaseDTO>>();
		
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
			res.message = "没有符合该条件的计量工单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<MeteringCaseDTO> mtCases = caseMapper.getMeteringCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO<List<MeteringCaseDTO>> getNewMeterCaseInfos(MeteringCaseDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<MeteringCaseDTO>> res = new ResponseDTO<List<MeteringCaseDTO>>();
		
		recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有相应的计量工单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<MeteringCaseDTO> mtCases = caseMapper.getMeteringCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	
public ResponseDTO<MeteringCaseDTO> getMeterCaseInfo(int caseId) {
		
		ResponseDTO<MeteringCaseDTO> res = new ResponseDTO<MeteringCaseDTO>();

		MeteringCaseDTO mtCase = caseMapper.getMeteringCaseInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的计量工单信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public ResponseDTO updAssignPersonMeterCase(MeteringCaseDTO caseDto) {

	ResponseDTO res = new ResponseDTO();
	
	if (caseDto.getAssigneeUserId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未指定计量工程师";
		return res;
	}
	
	Timestamp now = new Timestamp(System.currentTimeMillis());
	
	caseDto.setModifyTime(now);
	caseDto.setCreateTime(now);
	
	int count = caseMapper.updAssignPerson(caseDto);
	
	res.code = ConstantInfo.NORMAL;
	res.message = "工单指派成功";
	res.recordCount = count;
	res.data = caseDto;
	
	return res;
}

@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public ResponseDTO completeMeterCase(MeteringCaseDTO caseDto) {

	ResponseDTO res = new ResponseDTO();
	
	if (caseDto.getDeviceId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未选择巡检设备!";
		return res;
	}
	
	if (StringUtils.isEmpty(caseDto.getMeteringData())) {
		res.code = ConstantInfo.INVALID;
		res.message = "未输入计量数据!";
		return res;
	}
	
	
	// 工单状态设置为'已关闭（50）'
	caseDto.setCaseState(50);
	
	Timestamp now = new Timestamp(System.currentTimeMillis());
	
	caseDto.setModifyTime(now);
	caseDto.setCreateTime(now);
	caseDto.setMeteringTime(now.toString());
	
	try {
		int count = caseMapper.updMeteringCase(caseDto);
		
		if (count > 0) {
			
			Equipment intervalInfo = equipMapper.getMeterDeviceInfo(caseDto.getDeviceId());
			
			Equipment equip = new Equipment();
			
			equip.setDeviceId(caseDto.getDeviceId());
			
			long interval = intervalInfo.getMeteringInterval();
			
			long nextMeteringDate = now.getTime() + interval*24*3600*1000;
			
			equip.setNextMeteringDate(new Timestamp(nextMeteringDate));
			
			equipMapper.updEquipMeterTime(equip);
			
			caseDto.setCaseId(caseMapper.getSequenceNo());
			
			res.code = ConstantInfo.NORMAL;
			res.message = "工单更新成功";
			res.recordCount = count;
			res.data = caseDto;
			
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
	
	public ResponseDTO rotateMeterCaseState(Integer assigneeUserId) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (assigneeUserId == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "被指派人ID为空";
			
			return res;
		}
		
		//轮询待处理工单
		int count = caseMapper.rotateMeterCaseState(assigneeUserId);
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.recordCount = count;
			res.message = "有新的计量工单待处理";
		} else {
			res.code = ConstantInfo.NORMAL;
			res.message = "";
		}
		
		return res;
		
	}

}
