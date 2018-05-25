package com.jiabo.medical.service.purchase;


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
import com.jiabo.medical.entity.Purchase;
import com.jiabo.medical.mapper.ContractMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.PurchaseMapper;
import com.jiabo.medical.mapper.UserMapper;
import com.jiabo.medical.pojo.ResponseDTO;



@Service
public class PurchaseService {

	@Autowired
	private PurchaseMapper purchaseMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<Purchase>> getPurchaseInfos(Purchase purchase) {
		
		int recordsCnt = 0;
		ResponseDTO<List<Purchase>> res = new ResponseDTO<List<Purchase>>();
		
		purchase.setPurchaseOwner(StringUtils.isEmpty(purchase.getPurchaseOwner())?null:"%"+purchase.getPurchaseOwner()+"%");
		
		if (purchase.getPageIndex() == null) {
		
			recordsCnt = purchaseMapper.getPurchaseCount(purchase);
			
			if (recordsCnt == 0) {
				res.code = ConstantInfo.INVALID;
				res.message = "没有符合该条件的采购信息!";
				return res;
			}
			
			purchase.setPageIndex(0);
		} else {
			purchase.setPageIndex(purchase.getPageIndex()*10);
		}
		
		List<Purchase> purchaseList = purchaseMapper.getPurchaseList(purchase);
		
		if (purchaseList.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的采购信息!";
			return res;
		}
		
		res.data = purchaseList;
		res.recordCount = recordsCnt;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
public ResponseDTO<Purchase> getPurchaseInfo(int purchaseId) {
		
		ResponseDTO<Purchase> res = new ResponseDTO<Purchase>();

		Purchase purchase = purchaseMapper.getPurchaseInfo(purchaseId);
		
		if (purchase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的采购信息!";
			return res;
		}
		
		res.data = purchase;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO addPurchaseInfo(Purchase purchase) {

		ResponseDTO res = new ResponseDTO();
		
		if (purchase.getContractId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同ID未输入";
			
			return res;
		}
		
		if (purchase.getHasBid() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "是否招标未录入";
			
			return res;
		}
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		purchase.setCreateTime(now);
		purchase.setModifyTime(now);
		
		try {
			int count = purchaseMapper.addPurchaseInfo(purchase);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
				
				int seqNo = purchaseMapper.getSequenceNo();
				
				purchase.setPurchaseId(seqNo);
				
				res.data = purchase;
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

	public ResponseDTO updPurchaseInfo(Purchase purchase) {

		ResponseDTO res = new ResponseDTO();
		
		if (purchase.getContractId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "合同ID未输入";
			
			return res;
		}
		
		if (purchase.getHasBid() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "是否招标未录入";
			
			return res;
		}
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		purchase.setModifyTime(now);
		
		try {
			int count = purchaseMapper.updPurchaseInfo(purchase);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "更新成功";
				
				res.data = purchase;
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
	
	public ResponseDTO delPurchase(int purchaseId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = purchaseMapper.delPurchase(purchaseId);
			
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
