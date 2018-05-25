package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Department;


@Mapper
public interface DepartmentMapper  {
	public List<Department> getDeptTree(int userId) throws DataAccessException;
	public Department getDeptInfo( int deptId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addDeptInfo( Department deptInfo) throws DataAccessException;
    public int updDeptInfo(Department deptInfo) throws DataAccessException;
    public int delDeptInfo(int deptId) throws DataAccessException;  
}
