package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.BadEventDTO;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.mapper.BadEventMapper;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class BadEventService {
	
	
	@Autowired
	private BadEventMapper caseMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<BadEventDTO>> getBadEventList(BadEventDTO caseDto) {
		int recordsCount = 0;
		ResponseDTO<List<BadEventDTO>> res = new ResponseDTO<List<BadEventDTO>>();
		
		caseDto.setDeviceName(StringUtils.isEmpty(caseDto.getDeviceName())?null:"%"+caseDto.getDeviceName()+"%");
		caseDto.setEventSubject(StringUtils.isEmpty(caseDto.getEventSubject())?null:"%"+caseDto.getEventSubject()+"%");
		caseDto.setDeptName(StringUtils.isEmpty(caseDto.getDeptName())?null:"%"+caseDto.getDeptName()+"%");
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的不良事件信息!";
			return res;
		}
		
		List<BadEventDTO> mtCases = caseMapper.getBadEventList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	
	
public ResponseDTO<BadEventDTO> getBadEventInfo(int caseId) {
		
		ResponseDTO<BadEventDTO> res = new ResponseDTO<BadEventDTO>();

		BadEventDTO mtCase = caseMapper.getBadEventInfo(caseId);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的不良事件信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}


	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO addBadEvent(BadEventDTO caseDto) {

		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getDeviceId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未选择设备";
			
			return res;
		}
		
		if (StringUtils.isEmpty(caseDto.getEventTime())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未输入事件发生时间";
			
			return res;
		}
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setCreateTime(now);
		caseDto.setModifyTime(now);
		
		try {
			int count = caseMapper.addBadEvent(caseDto);
			
			if (count > 0) {
				
				int caseSeqNo= caseMapper.getSequenceNo();
				caseDto.setEventId(caseSeqNo);
				
				res.message = "不良事件创建成功";
				res.recordCount = count;
				res.data = caseDto;
				
				DvTimelineDTO timelineDto = new DvTimelineDTO();
				
				timelineDto.setDeviceId(caseDto.getDeviceId());
				timelineDto.setEventSubject(caseDto.getEventSubject());
				timelineDto.setEventType(60);  // 不良事件
				timelineDto.setEventId(caseDto.getEventId());
				timelineDto.setEventTime(now);
				
				timelineDto.setCreateTime(now);
				timelineDto.setModifyTime(now);
				timelineDto.setCreater(caseDto.getModifier());
				timelineDto.setModifier(caseDto.getModifier());
				timelineDto.setUserId(caseDto.getModifier());
				
				tlCaseMapper.addDvTimelineCase(timelineDto);
				
				
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}

	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public ResponseDTO updBadEvent(BadEventDTO caseDto) {

		ResponseDTO res = new ResponseDTO();

		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		
		try {
			int count = caseMapper.updBadEvent(caseDto);
			
			if (count > 0) {
				
				res.code = ConstantInfo.NORMAL;
				res.message = "不良事件已更新";
				res.recordCount = count;
				res.data = caseDto;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "不良事件更新失败";
				
			} 
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
		
	}


}
