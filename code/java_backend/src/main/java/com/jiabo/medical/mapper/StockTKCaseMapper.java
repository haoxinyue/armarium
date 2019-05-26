package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.StockCaseDTO;
import com.jiabo.medical.entity.StockTKCaseDTO;


@Mapper
public interface StockTKCaseMapper  {
	public int getCaseRecCount(StockTKCaseDTO caseDto) throws DataAccessException;
	public int getDeviceTKCount( int caseId) throws DataAccessException;
	public List<StockTKCaseDTO> getStockTKCaseList( StockTKCaseDTO caseDto) throws DataAccessException;
	public List<StockCaseDTO> getStockTKDeviceList( StockCaseDTO caseDto) throws DataAccessException;
	public StockTKCaseDTO getStockTKDevice(StockCaseDTO caseDto) throws DataAccessException;
	public List<Integer> getDeviceIds(int deptId) throws DataAccessException;
	public List<Integer> getPmCaseId(int caseState) throws DataAccessException;
	public List<String> getRoleName(int userId) throws DataAccessException;
	public int rotateTKCaseState(int assigneeUserId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addStockTKCase(StockTKCaseDTO caseDto) throws DataAccessException;
    public int updStockTKDevCase(StockCaseDTO caseDto) throws DataAccessException;
    public int updStockTKCaseState(StockCaseDTO caseDto) throws DataAccessException;
    public int delStockTKCase(int caseId) throws DataAccessException;
    public int updStockTKCase(int caseId) throws DataAccessException;
    public int addStockDeptCase(StockCaseDTO caseDto) throws DataAccessException;
    public int addStockDeviceCase(StockCaseDTO caseDto) throws DataAccessException;
}
