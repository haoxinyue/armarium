package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Department implements Serializable {
	private Integer deptId;
	private String deptName;
	private String deptOwner;
	private Integer parentDeptId;
	private Integer hospitalId;
	private String hospital;
	private String deptPath;
	private String remark;
	private Integer userId;
	
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	public Integer getDeptId() {
		return deptId;
	}
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptOwner() {
		return deptOwner;
	}
	public void setDeptOwner(String deptOwner) {
		this.deptOwner = deptOwner;
	}
	public Integer getParentDeptId() {
		return parentDeptId;
	}
	public void setParentDeptId(Integer parentDeptId) {
		this.parentDeptId = parentDeptId;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getDeptPath() {
		return deptPath;
	}
	public void setDeptPath(String deptPath) {
		this.deptPath = deptPath;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public Integer getCreater() {
		return creater;
	}
	public void setCreater(Integer creater) {
		this.creater = creater;
	}
	public Timestamp getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Timestamp modifyTime) {
		this.modifyTime = modifyTime;
	}
	public Integer getModifier() {
		return modifier;
	}
	public void setModifier(Integer modifier) {
		this.modifier = modifier;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
}
