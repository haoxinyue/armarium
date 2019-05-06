package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.MtCaseDTO;


@Mapper
public interface MtCaseMapper  {
	public int getDeviceCount( int deviceId) throws DataAccessException;
	public List<MtCaseDTO> getMtCaseList( MtCaseDTO caseDto) throws DataAccessException;
	public MtCaseDTO getMtCaseInfo(int caseId) throws DataAccessException;
	public List<MtCaseDTO> getCaseTimeShaft( int caseId) throws DataAccessException;
	public int rotateMtCaseState(int assigneeUserId) throws DataAccessException;
	public int getCaseRecCount( MtCaseDTO caseDto) throws DataAccessException;
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
	public List<Integer> getAssigneeIds(String roleName) throws DataAccessException;
    public int addMtCase(MtCaseDTO caseDto) throws DataAccessException;
    public int addMtCaseHistory( MtCaseDTO caseDto) throws DataAccessException;
    public int updMtCaseState(MtCaseDTO caseDto) throws DataAccessException;
}
