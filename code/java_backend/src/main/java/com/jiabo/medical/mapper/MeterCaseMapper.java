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
import com.jiabo.medical.entity.MeteringCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;


@Mapper
public interface MeterCaseMapper  {
	public int getCaseRecCount( MeteringCaseDTO caseDto) throws DataAccessException;
	public List<MeteringCaseDTO> getMeteringCaseList( MeteringCaseDTO caseDto) throws DataAccessException;
	public MeteringCaseDTO getMeteringCaseInfo(int caseId) throws DataAccessException;
	public int rotateMeterCaseState(int assigneeUserId) throws DataAccessException;
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addMeteringCase(MeteringCaseDTO caseDto) throws DataAccessException;
    public int updAssignPerson(MeteringCaseDTO caseDto) throws DataAccessException;
    public int updMeteringCase(MeteringCaseDTO caseDto) throws DataAccessException;
}
