package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.entity.StockCaseDTO;
import com.jiabo.medical.entity.StockTKCaseDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.StockTKCaseService;

@RestController
@RequestMapping("/stock_tk_case")
public class StockTKCaseController {
	
	@Autowired
	private StockTKCaseService caseService;
	
	@RequestMapping(value="/getStockTKCaseList",method=RequestMethod.POST)
	public ResponseDTO getStockCaseInfos(@RequestBody StockTKCaseDTO caseDto) {
		return caseService.getStockCaseInfos(caseDto);
	}
	
	@RequestMapping(value="/getStockTKDeviceList",method=RequestMethod.POST)
	public ResponseDTO getStockTKDeviceList(@RequestBody StockCaseDTO caseDto) {
		return caseService.getStockTKDeviceList(caseDto);
	}
	
	
	@RequestMapping(value="/rotateTKCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateTKCaseState(@RequestBody StockTKCaseDTO caseDto) {
		return caseService.rotateTKCaseState(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/getStockTKDevice",method=RequestMethod.POST)
	public ResponseDTO getStockTKDevice(@RequestBody StockCaseDTO caseDto) {
		return caseService.getStockTKDevice(caseDto);
	}
	
	@RequestMapping(value="/addStockTKCase",method=RequestMethod.POST)
	public ResponseDTO addStockTKCase(@RequestBody StockTKCaseDTO caseDto) {
		return caseService.addStockTKCase(caseDto);
	}
	
	@RequestMapping(value="/updStockTKCase",method=RequestMethod.POST)
	public ResponseDTO updStockTKCase(@RequestBody StockCaseDTO caseDto) {
		return caseService.updStockTKCase(caseDto);
	}
	
}
