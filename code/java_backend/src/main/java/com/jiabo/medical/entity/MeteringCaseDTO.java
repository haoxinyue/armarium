package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class MeteringCaseDTO implements Serializable {
	
	private Integer pageSize=null;
	private Integer pageIndex=null;
	private Integer caseId;
	private String caseSubject=null;
	private String caseRemark=null;
	private Integer caseState=null;
	private Integer deviceId;
	private Integer assigneeUserId;
	private Integer meteringType;
	private String deviceCode=null;
	private String deviceName=null;
	private String deptName=null;
	private String meteringTime;
	private String meteringData;
	private Integer meteringResult;
	private String resultFile;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	public Integer getCaseId() {
		return caseId;
	}
	public void setCaseId(Integer caseId) {
		this.caseId = caseId;
	}
	public String getCaseSubject() {
		return caseSubject;
	}
	public void setCaseSubject(String caseSubject) {
		this.caseSubject = caseSubject;
	}
	public String getCaseRemark() {
		return caseRemark;
	}
	public void setCaseRemark(String caseRemark) {
		this.caseRemark = caseRemark;
	}
	public Integer getCaseState() {
		return caseState;
	}
	public void setCaseState(Integer caseState) {
		this.caseState = caseState;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public Integer getAssigneeUserId() {
		return assigneeUserId;
	}
	public void setAssigneeUserId(Integer assigneeUserId) {
		this.assigneeUserId = assigneeUserId;
	}
	public Integer getMeteringType() {
		return meteringType;
	}
	public void setMeteringType(Integer meteringType) {
		this.meteringType = meteringType;
	}
	public String getMeteringTime() {
		return meteringTime;
	}
	public void setMeteringTime(String meteringTime) {
		this.meteringTime = meteringTime;
	}
	public String getMeteringData() {
		return meteringData;
	}
	public void setMeteringData(String meteringData) {
		this.meteringData = meteringData;
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
	public Integer getMeteringResult() {
		return meteringResult;
	}
	public void setMeteringResult(Integer meteringResult) {
		this.meteringResult = meteringResult;
	}
	public String getResultFile() {
		return resultFile;
	}
	public void setResultFile(String resultFile) {
		this.resultFile = resultFile;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeviceCode() {
		return deviceCode;
	}
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}
	
}
