package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.CaseService;
import com.jiabo.medical.service.cases.InspectionCaseService;
import com.jiabo.medical.service.cases.InstallationCaseService;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/insp_case")
public class InspectionCaseController {
	
	@Autowired
	private InspectionCaseService caseService;
	
	@RequestMapping(value="/getInspCaseList",method=RequestMethod.POST)
	public ResponseDTO getInspCaseList(@RequestBody InspCaseDTO caseDto) {
		return caseService.getInspCaseInfos(caseDto);
	}
	
	
	@RequestMapping(value="/getInspDevices",method=RequestMethod.POST)
	public ResponseDTO getInspDevices(@RequestBody InspCaseDTO caseDto) {
		return caseService.getInspDevices(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/rotateInspCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateInspCaseState(@RequestBody InspCaseDTO caseDto) {
		return caseService.rotateInspCaseState(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/getInspCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getInspCaseInfo(@RequestBody InspCaseDTO caseDto) {
		return caseService.getInspCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/completeInspCase",method=RequestMethod.POST)
	public ResponseDTO completeInspCase(@RequestBody InspCaseDTO caseDto) {
		return caseService.completeInspCase(caseDto);
	}
	
}
