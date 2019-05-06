package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class PmCaseDTO implements Serializable {
	
	private Integer pageIndex = null;
	private Integer pageSize = 10;
	private Integer caseId;
	private String caseSubject=null;
	private String caseRemark=null;
	private Integer caseState=null;
	private String planTime;
	private Integer assigneeUserId;
	private String assigneeUserName;
	private String actualTime;
	private Integer deviceId;
	private String deviceCode;
	private String deviceName;
	private Integer actualUserId;
	private String actualUserName;
	private String accessoryInfo;
	private String pmFile;
	private String pmFileName;
	private String remark;
	
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
	public Integer getAssigneeUserId() {
		return assigneeUserId;
	}
	public void setAssigneeUserId(Integer assigneeUserId) {
		this.assigneeUserId = assigneeUserId;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public String getPlanTime() {
		return planTime;
	}
	public void setPlanTime(String planTime) {
		this.planTime = planTime;
	}
	public String getActualTime() {
		return actualTime;
	}
	public void setActualTime(String actualTime) {
		this.actualTime = actualTime;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
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
	public Integer getActualUserId() {
		return actualUserId;
	}
	public void setActualUserId(Integer actualUserId) {
		this.actualUserId = actualUserId;
	}
	public String getAccessoryInfo() {
		return accessoryInfo;
	}
	public void setAccessoryInfo(String accessoryInfo) {
		this.accessoryInfo = accessoryInfo;
	}
	public String getPmFile() {
		return pmFile;
	}
	public void setPmFile(String pmFile) {
		this.pmFile = pmFile;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	public String getAssigneeUserName() {
		return assigneeUserName;
	}
	public void setAssigneeUserName(String assigneeUserName) {
		this.assigneeUserName = assigneeUserName;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getActualUserName() {
		return actualUserName;
	}
	public void setActualUserName(String actualUserName) {
		this.actualUserName = actualUserName;
	}
	public String getPmFileName() {
		return pmFileName;
	}
	public void setPmFileName(String pmFileName) {
		this.pmFileName = pmFileName;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public String getDeviceCode() {
		return deviceCode;
	}
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}
	
}
