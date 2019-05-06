package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Accessory;
import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;


@Mapper
public interface AccessoryMapper  {
	public Accessory getAccessoryInfo(int accessoryId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addAccessory( Accessory accessory) throws DataAccessException;
    public int updAccessory(Accessory accessory) throws DataAccessException;
    public int delAccessory(int accessoryId) throws DataAccessException;  
}
