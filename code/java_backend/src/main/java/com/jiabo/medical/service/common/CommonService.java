package com.jiabo.medical.service.common;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Hospital;
import com.jiabo.medical.mapper.CommonMapper;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class CommonService {
	
	
	@Autowired
	private CommonMapper caseMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<Hospital>> getHosptList(Hospital caseDto) {
		ResponseDTO<List<Hospital>> res = new ResponseDTO<List<Hospital>>();
		
		
		List<Hospital> mtCases = caseMapper.getHosptList();
		
		res.data = mtCases;
		res.recordCount = mtCases.size();
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO<List<String>> getDeviceTypeList() {
		int recordsCount = 0;
		ResponseDTO<List<String>> res = new ResponseDTO<List<String>>();
		
		
		List<String> mtCases = caseMapper.getDeviceTypeList();
		
		res.data = mtCases;
		res.recordCount = mtCases.size();
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}

}
