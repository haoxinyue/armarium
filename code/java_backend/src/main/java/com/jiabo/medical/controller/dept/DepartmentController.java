package com.jiabo.medical.controller.dept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Department;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.dept.DeptService;


@RestController
@RequestMapping("/dept")
public class DepartmentController {
	
	@Autowired
	private DeptService deptService;
	
	@RequestMapping(value="/getDeptTree",method=RequestMethod.POST)
	public ResponseDTO getDeptTree(@RequestBody Department dept) {
		return deptService.getDeptTree(dept.getUserId());
	}
	
	@RequestMapping(value="/getDept",method=RequestMethod.POST)
	public ResponseDTO getDeptInfo(@RequestBody Department dept) {
		return deptService.getDeptInfo(dept.getDeptId());
	}
	
	@RequestMapping(value="/addDept",method=RequestMethod.POST)
	public ResponseDTO addDeptInfo(@RequestBody Department dept) {
		return deptService.addDeptInfo(dept);
	}
	
	@RequestMapping(value="/updDept",method=RequestMethod.POST)
	public ResponseDTO updDeptInfo(@RequestBody Department dept) {
		return deptService.updDeptInfo(dept);
	}
	
	@RequestMapping(value="/delDept",method=RequestMethod.POST)
	public ResponseDTO delDeptInfo(@RequestBody Department dept) {
		return deptService.delDeptInfo(dept.getDeptId());
	}
	
}
