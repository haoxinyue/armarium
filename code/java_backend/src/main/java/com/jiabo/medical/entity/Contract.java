package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Contract implements Serializable {
	
	private Integer pageIndex = null;
	private Integer contractId;
	private String contractNo;
	private Integer parentDeptId;
	private Integer hospitalId;
	private String hospital;
	private String contractName;
	private String contractFile;
	private Integer deviceCount;
	
	private Timestamp acceptDate;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	public Integer getContractId() {
		return contractId;
	}
	public void setContractId(Integer contractId) {
		this.contractId = contractId;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
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
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getContractFile() {
		return contractFile;
	}
	public void setContractFile(String contractFile) {
		this.contractFile = contractFile;
	}
	public Integer getDeviceCount() {
		return deviceCount;
	}
	public void setDeviceCount(Integer deviceCount) {
		this.deviceCount = deviceCount;
	}
	public Timestamp getAcceptDate() {
		return acceptDate;
	}
	public void setAcceptDate(Timestamp acceptDate) {
		this.acceptDate = acceptDate;
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
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	
	
}