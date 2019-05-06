package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;


@Mapper
public interface InspCaseMapper  {
	public int getCaseRecCount( InspCaseDTO caseDto) throws DataAccessException;
	public List<InspCaseDTO> getInspCaseList( InspCaseDTO caseDto) throws DataAccessException;
	public InspCaseDTO getInspCaseInfo(int caseId) throws DataAccessException;
	
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addInspCase(InspCaseDTO caseDto) throws DataAccessException;
    public int updInspCase(InspCaseDTO caseDto) throws DataAccessException;
}
