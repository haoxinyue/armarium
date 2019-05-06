package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.MeteringCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.MeteringCaseService;

@RestController
@RequestMapping("/meter_case")
public class MeterCaseController {
	
	@Autowired
	private MeteringCaseService caseService;
	
	@RequestMapping(value="/getMeterCaseInfos",method=RequestMethod.POST)
	public ResponseDTO getMeterCaseInfos(@RequestBody MeteringCaseDTO caseDto) {
		return caseService.getMeterCaseInfos(caseDto);
	}
	
	@RequestMapping(value="/rotateMeterCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateMeterCaseState(@RequestBody MeteringCaseDTO caseDto) {
		return caseService.rotateMeterCaseState(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/getMeterCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getMeterCaseInfo(@RequestBody MeteringCaseDTO caseDto) {
		return caseService.getMeterCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/updAssignPersonMeterCase",method=RequestMethod.POST)
	public ResponseDTO updAssignPersonMeterCase(@RequestBody MeteringCaseDTO caseDto) {
		return caseService.updAssignPersonMeterCase(caseDto);
	}
	
	@RequestMapping(value="/completeMeterCase",method=RequestMethod.POST)
	public ResponseDTO completeMeterCase(@RequestBody MeteringCaseDTO caseDto) {
		return caseService.completeMeterCase(caseDto);
	}
	
}
