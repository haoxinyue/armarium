package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.CaseService;
import com.jiabo.medical.service.cases.InstallationCaseService;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/install_case")
public class InstallationCaseController {
	
	@Autowired
	private InstallationCaseService caseService;
	
	@RequestMapping(value="/getInsCaseList",method=RequestMethod.POST)
	public ResponseDTO getInsCaseList(@RequestBody InstCaseDTO caseDto) {
		return caseService.getInsCaseInfos(caseDto);
	}
	
	
	@RequestMapping(value="/rotateInsCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateInsCaseState(@RequestBody InstCaseDTO caseDto) {
		return caseService.rotateInsCaseState(caseDto);
	}
	
	
	@RequestMapping(value="/getInsCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getInsCaseInfo(@RequestBody InstCaseDTO caseDto) {
		return caseService.getInsCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/addInsCase",method=RequestMethod.POST)
	public ResponseDTO addInsCase(@RequestBody InstCaseDTO caseDto) {
		return caseService.addInsCase(caseDto);
	}
	
	@RequestMapping(value="/completeInsCase",method=RequestMethod.POST)
	public ResponseDTO completeInsCase(@RequestBody InstCaseDTO caseDto) {
		return caseService.completeInsCase(caseDto);
	}
	
}
