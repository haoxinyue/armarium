package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.BadEventDTO;
import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;


@Mapper
public interface BadEventMapper  {
	public int getCaseRecCount( BadEventDTO caseDto) throws DataAccessException;
	public List<BadEventDTO> getBadEventList( BadEventDTO caseDto) throws DataAccessException;
	public BadEventDTO getBadEventInfo(int caseId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addBadEvent(BadEventDTO caseDto) throws DataAccessException;
    public int updBadEvent(BadEventDTO caseDto) throws DataAccessException;
}
