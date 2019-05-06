package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.entity.StockTKCaseDTO;


@Mapper
public interface DvTimelineMapper  {
	public int getCaseRecCount( DvTimelineDTO caseDto) throws DataAccessException;
	public List<DvTimelineDTO> getTimelineCaseList( DvTimelineDTO caseDto) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addDvTimelineCase(DvTimelineDTO caseDto) throws DataAccessException;
}
