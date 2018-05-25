package com.jiabo.medical.service.dept;


import java.sql.Timestamp;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.mapper.DepartmentMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.pojo.ResponseDTO;



@Service
public class DeptService {
	
	@Autowired
	private DepartmentMapper departmentMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<Department>> getDeptTree(int userId) {
		
		ResponseDTO<List<Department>> res = new ResponseDTO<List<Department>>();
		
		
		List<Department> depts = departmentMapper.getDeptTree(userId);
		
		if (depts.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的部门信息!";
			return res;
		}
		
		res.data = depts;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	public ResponseDTO addDeptInfo(Department dept) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(dept.getDeptName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "部门名称未输入";
			
			return res;
		}
		
		if (dept.getHospitalId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "所属医院ID未设置";
			
			return res;
		}
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		dept.setCreateTime(now);
		dept.setModifyTime(now);
		
		try {
			int count = departmentMapper.addDeptInfo(dept);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
				
				int seqNo = departmentMapper.getSequenceNo();
				
				dept.setDeptId(seqNo);
				
				res.data = dept;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "插入失败，可能存在重复主键";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}

	public ResponseDTO updDeptInfo(Department dept) {

		ResponseDTO res = new ResponseDTO();
		
		if (StringUtils.isEmpty(dept.getDeptName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "部门名称未输入";
			
			return res;
		}
		
		if (dept.getHospitalId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "所属医院ID未设置";
			
			return res;
		}
		
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		dept.setModifyTime(now);
		
		try {
			int count = departmentMapper.updDeptInfo(dept);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "更新成功";
				
				res.data = dept;
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
	
	public ResponseDTO delDeptInfo(int deptId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = departmentMapper.delDeptInfo(deptId);
			
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

	public ResponseDTO getDeptInfo(int deptId) {

		ResponseDTO<Department> res = new ResponseDTO<Department>();
		
		Department dept = departmentMapper.getDeptInfo(deptId);
		
		if (dept == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的部门信息!";
			return res;
		}
		
		res.data = dept;
		res.code = ConstantInfo.NORMAL;
		
		return res;
		
	}
	

}
