package com.jiabo.medical.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.MeteringCaseDTO;
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.MaintainCaseMapper;
import com.jiabo.medical.mapper.MeterCaseMapper;


@Component 
public class ScheduledTasks {
	
	@Autowired
	private MaintainCaseMapper mainCaseMapper;
	
	@Autowired
	private MeterCaseMapper meterCaseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;
	
	// 自动生成保养case
	@Scheduled(cron = "0 0 0 15 * *")  //cron接受cron表达式，根据cron表达式确定定时规则 
    public void setAutoPmCase() {

		Calendar c = Calendar.getInstance();
		List<Integer> assignees =  mainCaseMapper.getAssigneeIds(ConstantInfo.ROLE_MANAGER);
		
		if (assignees == null || assignees.size() == 0) {
			return ;
		}
		
		c.add(Calendar.MONTH, 1);
		SimpleDateFormat  sdf = new  SimpleDateFormat("yyyyMM");
		String nextTime = sdf.format(c.getTime());
		//待保养设备
		List<Equipment> pmDeviceList = equipMapper.getMainDeviceInfos(nextTime);
		
		for (Equipment equip : pmDeviceList) {
			Timestamp now = new Timestamp(System.currentTimeMillis());
			PmCaseDTO caseDto = new PmCaseDTO();
			
			caseDto.setDeviceId(equip.getDeviceId());
			caseDto.setPlanTime(equip.getNextMaintenanceDate().toString());
			
			// 状态为"待保养"
			caseDto.setCaseState(10);
			caseDto.setAssigneeUserId(assignees.get(0));
			
			caseDto.setCreater(assignees.get(0));
			caseDto.setModifier(assignees.get(0));
			caseDto.setCreateTime(now);
			caseDto.setModifyTime(now);
			
			mainCaseMapper.addMaintainCase(caseDto);
		}
		
	
    }
	
	// 自动生成计量case
	@Scheduled(cron = "0 0 1 * * ?")  //每天凌晨一点，根据cron表达式确定定时规则 
    public void setAutoMeteringCase() {
		
		Calendar c = Calendar.getInstance();
		List<Integer> assignees =  mainCaseMapper.getAssigneeIds(ConstantInfo.ROLE_MANAGER);
		
		if (assignees == null || assignees.size() == 0) {
			return ;
		}
		
		c.add(Calendar.MONTH, 1);
		SimpleDateFormat  sdf = new  SimpleDateFormat("yyyyMMdd");
		String nextTime = sdf.format(c.getTime());
		//待保养设备
		List<Equipment> meteringDeviceList = equipMapper.getMeteringDeviceInfos(nextTime);
		
		for (Equipment equip : meteringDeviceList) {
			
			Timestamp now = new Timestamp(System.currentTimeMillis());
			MeteringCaseDTO caseDto = new MeteringCaseDTO();
			
			caseDto.setDeviceId(equip.getDeviceId());
			
			// 状态为"待计量"
			caseDto.setCaseState(10);
			caseDto.setAssigneeUserId(assignees.get(0));
			
			caseDto.setCreater(assignees.get(0));
			caseDto.setModifier(assignees.get(0));
			caseDto.setCreateTime(now);
			caseDto.setModifyTime(now);
			
			meterCaseMapper.addMeteringCase(caseDto);

		}
	}
	
}
