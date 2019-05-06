package com.jiabo.medical.controller.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Hospital;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.common.CommonService;

@RestController
@RequestMapping("/common")
public class CommonController {
	
	@Autowired
	private CommonService caseService;
	
	@RequestMapping(value="/getHosptList",method=RequestMethod.POST)
	public ResponseDTO getHosptList(@RequestBody Hospital caseDto) {
		return caseService.getHosptList(caseDto);
	}
	
	@RequestMapping(value="/getDeviceTypeList",method=RequestMethod.POST)
	public ResponseDTO getDeviceTypeList() {
		return caseService.getDeviceTypeList();
	}

}
