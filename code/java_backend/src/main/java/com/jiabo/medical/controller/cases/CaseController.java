package com.jiabo.medical.controller.cases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.CaseService;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/case")
public class CaseController {
	
	@Autowired
	private CaseService caseService;
	
	@RequestMapping(value="/getMtCaseList",method=RequestMethod.POST)
	public ResponseDTO getMtCaseList(@RequestBody MtCaseDTO caseDto) {
		return caseService.getMtCaseInfos(caseDto);
	}
	
	
	@RequestMapping(value="/rotateMtCase",method=RequestMethod.POST)
	public ResponseDTO rotateMtCaseState(@RequestBody MtCaseDTO caseDto) {
		return caseService.rotateMtCaseState(caseDto);
	}
	
	@RequestMapping(value="/getCaseTimeShaft",method=RequestMethod.POST)
	public ResponseDTO getCaseTimeShaft(@RequestBody MtCaseDTO caseDto) {
		return caseService.getCaseTimeShaft(caseDto.getCaseId());
	}
	
	
	@RequestMapping(value="/getMtCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getMtCaseInfo(@RequestBody MtCaseDTO caseDto) {
		return caseService.getMtCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/addMtCase",method=RequestMethod.POST)
	public ResponseDTO addMtCase(@RequestBody MtCaseDTO caseDto) {
		return caseService.addMockMtCase(caseDto);
	}
	
	@RequestMapping(value="/updMtCase",method=RequestMethod.POST)
	public ResponseDTO updMtCase(@RequestBody MtCaseDTO caseDto) {
		return caseService.updMtCase(caseDto);
	}
	
	@RequestMapping(value="/closeMtCase",method=RequestMethod.POST)
	public ResponseDTO closeMtCase(@RequestBody MtCaseDTO caseDto) {
		return caseService.closeMtCase(caseDto);
	}
	
	@RequestMapping(value="/sendMsg",method=RequestMethod.POST)
	public void sendMsg(@RequestBody MtCaseDTO caseDto) {
		String params = "{\"device_name\":\"核磁共振\", \"device_code\":\"333\", \"case_state\":\"已派单\", \"engineer_name\":\"吴亦凡\",\"engineer_mobile\":\"13918532856\"}";
		caseService.sendMobileMsg(caseDto.getReporterMobile(), "SMS_144855162", params);
	}
}
