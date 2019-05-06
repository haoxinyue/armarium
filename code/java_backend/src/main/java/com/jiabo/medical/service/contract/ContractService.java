package com.jiabo.medical.service.contract;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.mapper.ContractMapper;
import com.jiabo.medical.pojo.ResponseDTO;



@Service
public class ContractService {
	@Autowired
	private ContractMapper contractMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<Contract>> getContractInfos(Contract contr) {
		int recordsCnt = 0;
		
		ResponseDTO<List<Contract>> res = new ResponseDTO<List<Contract>>();
		
		
		contr.setContractNo(StringUtils.isEmpty(contr.getContractNo())?null:"%"+contr.getContractNo()+"%");
		contr.setHospital(StringUtils.isEmpty(contr.getHospital())?null:"%"+contr.getHospital()+"%");
		
		recordsCnt = contractMapper.getContrRecCount(contr);
		
		if (recordsCnt == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的合同信息!";
			return res;
		}
		
		if (contr.getPageIndex() == null) {
			contr.setPageIndex(0);
		} else {
			contr.setPageIndex(contr.getPageIndex()*10);
		}
		
		List<Contract> contracts = contractMapper.getContractList(contr);
		
		res.data = contracts;
		res.recordCount = recordsCnt;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
public ResponseDTO<Contract> getContractInfo(int contractId) {
		
		ResponseDTO<Contract> res = new ResponseDTO<Contract>();

		Contract contr = contractMapper.getContractInfo(contractId);
		
		if (contr == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的合同信息!";
			return res;
		}
		
		res.data = contr;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO addContractInfo(Contract contr) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(contr.getContractNo())) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同编号未输入";
			
			return res;
		}
		
		if (StringUtils.isEmpty(contr.getContractName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同名称未输入";
			
			return res;
		}
		
		if (contr.getHospitalId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "医院未选择";
			
			return res;
		}
		
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		contr.setCreateTime(now);
		contr.setModifyTime(now);
		
		try {
			int count = contractMapper.addContractInfo(contr);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
				
				int seqNo = contractMapper.getSequenceNo();
				
				contr.setContractId(seqNo);
				
				res.data = contr;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "添加失败，可能存在重复主键";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}

	public ResponseDTO updContractInfo(Contract contr) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(contr.getContractNo())) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同编号未输入";
			
			return res;
		}
		
		if (StringUtils.isEmpty(contr.getContractName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同名称未输入";
			
			return res;
		}
		
		if (contr.getHospitalId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "医院未选择";
			
			return res;
		}
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		contr.setModifyTime(now);
		
		try {
			int count = contractMapper.updContractInfo(contr);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "更新成功";
				
				res.data = contr;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "更新失败，请确认是否存在此纪录";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
		
	}
	
	public ResponseDTO delContract(int contractId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = contractMapper.delContractInfo(contractId);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "删除成功";
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "删除失败，请确认是否存在此纪录";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			log.error(e.getMessage());
		}
		
		return res;
	}
	

}
