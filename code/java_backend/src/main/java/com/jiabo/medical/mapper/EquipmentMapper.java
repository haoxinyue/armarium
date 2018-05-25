package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Equipment;


@Mapper
public interface EquipmentMapper  {
	public int getEquipRecCount(Equipment condition) throws DataAccessException;
	public List<Equipment> getEquipmentList(Equipment condition) throws DataAccessException;
	public Equipment getEquipmentInfo(int deviceId) throws DataAccessException;
    public int addEquipmentInfo( Equipment equip) throws DataAccessException;
    public int getSequenceNo() throws DataAccessException;
    public int updEquipmentInfo(Equipment equip) throws DataAccessException;
    public int delEquipmentInfo(int deviceId) throws DataAccessException;  
}
