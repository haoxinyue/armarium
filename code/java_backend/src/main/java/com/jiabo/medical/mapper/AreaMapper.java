package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Area;
import com.jiabo.medical.entity.Department;


@Mapper
public interface AreaMapper  {
	public List<Area> getAreaInfo() throws DataAccessException;
}
