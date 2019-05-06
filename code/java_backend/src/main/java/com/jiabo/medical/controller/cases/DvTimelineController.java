package com.jiabo.medical.controller.cases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.cases.DvTimeLineService;

@RestController
@RequestMapping("/dev_timeline")
public class DvTimelineController {
	
	@Autowired
	private DvTimeLineService caseService;
	
	@RequestMapping(value="/getTimelineList",method=RequestMethod.POST)
	public ResponseDTO getTimelineCaseList(@RequestBody DvTimelineDTO caseDto) {
		return caseService.getTimelineCaseList(caseDto);
	}

}
