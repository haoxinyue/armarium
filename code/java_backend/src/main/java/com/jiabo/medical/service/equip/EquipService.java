package com.jiabo.medical.service.equip;


import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.EquipAttachment;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.util.QRCodeUtil;



@Service
public class EquipService {
	
	@Value("${server.ip.address}")
	private String serverAdd;
	
	@Value("${accessory.file.path}") 
	private String filePath;
	
	private static String URL_PICTURE = "/accessory/queryPic?file=";
	
	@Autowired
	private EquipmentMapper equipmentMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<Equipment>> getEquipmentInfos(Equipment equip) {
		int recordsCount = 0;
		ResponseDTO<List<Equipment>> res = new ResponseDTO<List<Equipment>>();
		
		
        equip.setDeviceCode(StringUtils.isEmpty(equip.getDeviceCode())?null:"%"+equip.getDeviceCode()+"%");
        equip.setDeviceName(StringUtils.isEmpty(equip.getDeviceName())?null:"%"+equip.getDeviceName()+"%");
        equip.setHospital(StringUtils.isEmpty(equip.getHospital())?null:"%"+equip.getHospital()+"%");
        equip.setDepartment(StringUtils.isEmpty(equip.getDepartment())?null:"%"+equip.getDepartment()+"%");
        equip.setAssetNo(StringUtils.isEmpty(equip.getAssetNo())?null:"%"+equip.getAssetNo()+"%");
        equip.setDeviceModel(StringUtils.isEmpty(equip.getDeviceModel())?null:"%"+equip.getDeviceModel()+"%");
        equip.setManufacturer(StringUtils.isEmpty(equip.getManufacturer())?null:"%"+equip.getManufacturer()+"%");
        equip.setProducingPlace(StringUtils.isEmpty(equip.getProducingPlace())?null:"%"+equip.getProducingPlace()+"%");
        equip.setDeviceOwner(StringUtils.isEmpty(equip.getDeviceOwner())?null:"%"+equip.getDeviceOwner()+"%");
		
        recordsCount = equipmentMapper.getEquipRecCount(equip);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的设备信息!";
			return res;
		}
		
		if (equip.getPageIndex() == null) {
			equip.setPageIndex(0);
		} else {
			equip.setPageIndex(equip.getPageIndex()*10);
		}
		
		List<Equipment> equips = equipmentMapper.getEquipmentList(equip);
		
		res.data = equips;
		res.recordCount = recordsCount;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
public ResponseDTO<Equipment> getEquipmentInfo(int deviceId) {
		
		ResponseDTO<Equipment> res = new ResponseDTO<Equipment>();

		Equipment equip = equipmentMapper.getEquipmentInfo(deviceId);
		
		if (equip == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的设备信息!";
			return res;
		}
		
		if (!StringUtils.isEmpty(equip.getPicture1())) {
			equip.setPicture1(serverAdd + URL_PICTURE + equip.getPicture1().split(filePath)[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture2())) {
			equip.setPicture2(serverAdd + URL_PICTURE + equip.getPicture2().split(filePath)[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture3())) {
			equip.setPicture3(serverAdd + URL_PICTURE + equip.getPicture3().split(filePath)[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture4())) {
			equip.setPicture4(serverAdd + URL_PICTURE + equip.getPicture4().split(filePath)[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture5())) {
			equip.setPicture5(serverAdd + URL_PICTURE + equip.getPicture5().split(filePath)[1]);
		}
		
		res.data = equip;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO addEquipmentInfo(Equipment equip) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(equip.getDeviceCode())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备编号未输入";
			
			return res;
		}
		
		if (StringUtils.isEmpty(equip.getDeviceName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备名称未输入";
			
			return res;
		}
		
		if (equip.getDeviceType() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备类型未输入";
			
			return res;
		}
		
		if (equip.getUsageState() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "使用状态未选择";
			
			return res;
		}
		
		
		if (!StringUtils.isEmpty(equip.getPicture1())) {
			equip.setPicture1(filePath + equip.getPicture1().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture2())) {
			equip.setPicture2(filePath + equip.getPicture2().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture3())) {
			equip.setPicture3(filePath + equip.getPicture3().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture4())) {
			equip.setPicture4(filePath + equip.getPicture4().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture5())) {
			equip.setPicture5(filePath + equip.getPicture5().split("file=")[1]);
		}
		
		
		int seqNo= equipmentMapper.getSequenceNo() + 1;
		
		equip.setQrCode(String.valueOf(seqNo));
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		equip.setCreateTime(now);
		equip.setModifyTime(now);
		
		try {
			int count = equipmentMapper.addEquipmentInfo(equip);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
				
				equip.setDeviceId(seqNo);
				
				res.data = equip;
				
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "添加失败，可能存在重复主键";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
			
			log.error(e.getMessage());
		}
		
		return res;
		
	}

	public ResponseDTO updEquipmentInfo(Equipment equip) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(equip.getDeviceCode())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备编号未输入";
			
			return res;
		}
		
		if (StringUtils.isEmpty(equip.getDeviceName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备名称未输入";
			
			return res;
		}
		
		if (StringUtils.isEmpty(equip.getDeviceModel())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备型号未输入";
			
			return res;
		}
		
		if (equip.getDeviceType() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备类型未输入";
			
			return res;
		}
		
		if (equip.getUsageState() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "使用状态未选择";
			
			return res;
		}
		
		if (StringUtils.isEmpty(equip.getSerialNumber())) {
			res.code = ConstantInfo.INVALID;
			res.message = "设备序列号未输入";
			
			return res;
		}
		
		if (!StringUtils.isEmpty(equip.getPicture1())) {
			equip.setPicture1(filePath + equip.getPicture1().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture2())) {
			equip.setPicture2(filePath + equip.getPicture2().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture3())) {
			equip.setPicture3(filePath + equip.getPicture3().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture4())) {
			equip.setPicture4(filePath + equip.getPicture4().split("file=")[1]);
		}
		
		if (!StringUtils.isEmpty(equip.getPicture5())) {
			equip.setPicture5(filePath + equip.getPicture5().split("file=")[1]);
		}

		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		equip.setModifyTime(now);
		
		try {
			int count = equipmentMapper.updEquipmentInfo(equip);
			
			if (count > 0) {
				
				
				for (EquipAttachment eAttach:equip.getAccessories() ) {
					eAttach.setDeviceId(equip.getDeviceId());
					eAttach.setAttachmentName(eAttach.getFilePath().split("file=")[1]);
					
					
					eAttach.setCreateTime(now);
					eAttach.setModifyTime(now);
					
					eAttach.setCreater(equip.getModifier());
					eAttach.setModifier(equip.getModifier());
					
					equipmentMapper.addAttatchment(eAttach);
					
				}
				res.code = ConstantInfo.NORMAL;
				res.message = "更新成功";
				
				res.data = equip;
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
	
	public ResponseDTO delEquipment(int deviceId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = equipmentMapper.delEquipmentInfo(deviceId);
			
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
