package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.BadEventDTO;

import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.BadEventService;

@RestController
@RequestMapping("/bad_event")
public class BadEventController {
	
	@Autowired
	private BadEventService caseService;
	
	@RequestMapping(value="/getBadEventList",method=RequestMethod.POST)
	public ResponseDTO getBadEventList(@RequestBody BadEventDTO caseDto) {
		return caseService.getBadEventList(caseDto);
	}
	
	@RequestMapping(value="/getBadEventInfo",method=RequestMethod.POST)
	public ResponseDTO getBadEventInfo(@RequestBody BadEventDTO caseDto) {
		return caseService.getBadEventInfo(caseDto.getEventId());
	}
	
	@RequestMapping(value="/addBadEvent",method=RequestMethod.POST)
	public ResponseDTO addBadEvent(@RequestBody BadEventDTO caseDto) {
		return caseService.addBadEvent(caseDto);
	}
	
	@RequestMapping(value="/updBadEvent",method=RequestMethod.POST)
	public ResponseDTO updBadEvent(@RequestBody BadEventDTO caseDto) {
		return caseService.updBadEvent(caseDto);
	}
	
}
