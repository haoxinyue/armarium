package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class DvTimeLineService {
	
	
	@Autowired
	private DvTimelineMapper caseMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<DvTimelineDTO>> getTimelineCaseList(DvTimelineDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<DvTimelineDTO>> res = new ResponseDTO<List<DvTimelineDTO>>();
		
		recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的设备时间线信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<DvTimelineDTO> mtCases = caseMapper.getTimelineCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

}
