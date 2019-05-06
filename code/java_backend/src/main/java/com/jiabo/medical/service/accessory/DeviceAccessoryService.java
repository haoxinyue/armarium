package com.jiabo.medical.service.accessory;

import java.sql.Timestamp;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Accessory;
import com.jiabo.medical.mapper.AccessoryMapper;
import com.jiabo.medical.pojo.ResponseDTO;

@Service
public class DeviceAccessoryService {

	@Autowired
	private AccessoryMapper accessoryMapper;
	
	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO getAccessory(Integer accessoryID) {
		ResponseDTO res = new ResponseDTO();
		
		if (accessoryID == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "附件ID为空";
			
			return res;
		}
		
		Accessory accessory = accessoryMapper.getAccessoryInfo(accessoryID);
		
		if (accessory == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "无相应附件!";
			

		} else {
			res.code = ConstantInfo.NORMAL;
			res.data = accessory;
		}
		
		return res;
	}
	
	public ResponseDTO addAccessory(Accessory accessory) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (accessory.getUserManual() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "用户手册为空";
			
			return res;
		}
		
		if (accessory.getMaintenanceManual() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "维修手册为空";
			
			return res;
		}
		
		if (accessory.getHandbook() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "简易使用手册为空";
			
			return res;
		}
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		accessory.setCreateTime(now);
		accessory.setModifyTime(now);
		
		try {
			int count = accessoryMapper.addAccessory(accessory);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
			
				
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
	
public ResponseDTO delAccessory(int contractId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = accessoryMapper.delAccessory(contractId);
			
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
