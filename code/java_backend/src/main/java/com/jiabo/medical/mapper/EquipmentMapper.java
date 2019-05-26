package com.jiabo.medical.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.EquipAttachment;
import com.jiabo.medical.entity.Equipment;


@Mapper
public interface EquipmentMapper  {
	public int getEquipRecCount(Equipment condition) throws DataAccessException;
	public List<Equipment> getEquipmentList(Equipment condition) throws DataAccessException;
	public Equipment getEquipmentInfo(int deviceId) throws DataAccessException;
	public Equipment getEquipRepairInfo(int deviceId) throws DataAccessException;
    public int addEquipmentInfo( Equipment equip) throws DataAccessException;
    public int updAttatchment (EquipAttachment eAttach) throws DataAccessException;
    public int getSequenceNo() throws DataAccessException;
    public int getAttachSequenceNo() throws DataAccessException;
    public List<Equipment> getInspDeviceInfos(int assigneeUserId) throws DataAccessException;
    public List<Equipment> getMeteringDeviceInfos(String nextTime) throws DataAccessException;
    public List<Equipment> getMainDeviceInfos(String nextTime) throws DataAccessException;
    public List<EquipAttachment> getEquipAttatchment(int deviceId) throws DataAccessException;
    public Equipment getInspDeviceInfo(int deviceId) throws DataAccessException;
    public Equipment getPmDeviceInfo(int deviceId) throws DataAccessException;
    public Equipment getMeterDeviceInfo(int deviceId) throws DataAccessException;
    public int getEquipId(int setupCaseId) throws DataAccessException;
    public int updEquipmentInfo(Equipment equip) throws DataAccessException;
    public int addAttatchment(EquipAttachment eAttach) throws DataAccessException;
    public int updEquipUsageState(Equipment equip) throws DataAccessException;
    public int updEquipSetupTime(Equipment equip) throws DataAccessException;
    public int updEquipInspTime(Equipment equip) throws DataAccessException;
    public int updEquipMeterTime(Equipment equip) throws DataAccessException;
    public int updEquipPmTime(Equipment equip) throws DataAccessException;
    public int delAttachment(int attachmentId) throws DataAccessException; 
    public int delEquipmentInfo(int deviceId) throws DataAccessException;  
}
