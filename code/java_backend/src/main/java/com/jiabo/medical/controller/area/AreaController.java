package com.jiabo.medical.controller.area;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.area.AreaService;
import com.jiabo.medical.service.auth.UserAuthService;

@RestController
@RequestMapping("/area")
public class AreaController {
	
	@Autowired
	private AreaService areaService;
	
	@RequestMapping(value="/getAreaInfo",method=RequestMethod.POST)
	public ResponseDTO login() {
		ResponseDTO result = areaService.getAreaInfo();
		return result;
	}

}
