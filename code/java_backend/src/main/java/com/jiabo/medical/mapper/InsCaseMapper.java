package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;


@Mapper
public interface InsCaseMapper  {
	public int getCaseRecCount( InstCaseDTO caseDto) throws DataAccessException;
	public List<InstCaseDTO> getInsCaseList( InstCaseDTO caseDto) throws DataAccessException;
	public InstCaseDTO getInsCaseInfo(int caseId) throws DataAccessException;
	public int rotateInsCaseState(int assigneeUserId) throws DataAccessException;
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
	public List<Integer> getAssigneeIds(String roleName) throws DataAccessException;
    public int addInsCase(InstCaseDTO caseDto) throws DataAccessException;
    public int completeInsCase(InstCaseDTO caseDto) throws DataAccessException;
    public int updInsCase(InstCaseDTO caseDto) throws DataAccessException;
}
