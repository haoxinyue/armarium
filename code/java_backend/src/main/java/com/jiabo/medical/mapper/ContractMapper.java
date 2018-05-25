package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;


@Mapper
public interface ContractMapper  {
	public int getContrRecCount( Contract contract) throws DataAccessException;
	public List<Contract> getContractList( Contract contract) throws DataAccessException;
	public Contract getContractInfo(int contractId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addContractInfo( Contract contract) throws DataAccessException;
    public int updContractInfo(Contract contract) throws DataAccessException;
    public int delContractInfo(int contractId) throws DataAccessException;  
}
