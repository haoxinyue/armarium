package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.PmCaseDTO;

@Mapper
public interface MaintainCaseMapper  {
	public int getCaseRecCount( PmCaseDTO caseDto) throws DataAccessException;
	public List<PmCaseDTO> getMainCaseList( PmCaseDTO caseDto) throws DataAccessException;
	public PmCaseDTO getMainCaseInfo(int caseId) throws DataAccessException;
	public List<Integer> getAssigneeIds(String roleName) throws DataAccessException;
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int rotateMtCaseState(int assigneeUserId) throws DataAccessException;
	public int queryMainCaseState(int deviceId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
	public List<Integer> getPmCaseId(Integer deviceId) throws DataAccessException;
    public int addMaintainCase(PmCaseDTO caseDto) throws DataAccessException;
    public int updMaintainCase(PmCaseDTO caseDto) throws DataAccessException;
}
