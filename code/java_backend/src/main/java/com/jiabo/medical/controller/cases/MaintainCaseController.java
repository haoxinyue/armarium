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
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.CaseService;
import com.jiabo.medical.service.cases.InspectionCaseService;
import com.jiabo.medical.service.cases.InstallationCaseService;
import com.jiabo.medical.service.cases.MaintainCaseService;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/pm_case")
public class MaintainCaseController {
	
	@Autowired
	private MaintainCaseService caseService;
	
	@RequestMapping(value="/getPmCaseList",method=RequestMethod.POST)
	public ResponseDTO getPmCaseList(@RequestBody PmCaseDTO caseDto) {
		return caseService.getPmCaseInfos(caseDto);
	}
	
	
	@RequestMapping(value="/rotatePmCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateMaintainCaseState(@RequestBody PmCaseDTO caseDto) {
		return caseService.rotateMaintainCaseState(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/getPmCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getPmCaseInfo(@RequestBody PmCaseDTO caseDto) {
		return caseService.getPmCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/completePmCase",method=RequestMethod.POST)
	public ResponseDTO completePmCase(@RequestBody PmCaseDTO caseDto) {
		return caseService.completePmCase(caseDto);
	}
	
}
