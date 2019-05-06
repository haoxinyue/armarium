package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class MtCaseDTO implements Serializable {
	
	private Integer pageIndex = null;
	private Integer pageSize = 10;
	private Integer caseId= null;
	private Integer hisId= null;
	private String caseSubject;
	private String caseRemark;
	private Integer caseState=null;
	private Integer deviceState=null;
	private String hisRemark;
	private String reporterWeixin;
	private Integer reporterUserId=null;
	private Integer assigneeUserId=null;
	private Integer deviceId=null;
	
	private String hospital;
	private String deviceName;
	private String deptName;
	private String assigneeUserName;
	private Integer responseInterval=null;
	private Integer solveInterval=null;
	private Integer feedbackScore=null;
	private String feedbackContent;
	private Integer cost=null;
	private String caseFilePath;
	private String reporterName;
	
	private String reporterCompany;
	private String reporterMobile;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getAssigneeUserName() {
		return assigneeUserName;
	}
	public void setAssigneeUserName(String assigneeUserName) {
		this.assigneeUserName = assigneeUserName;
	}
	public Integer getCaseId() {
		return caseId;
	}
	public void setCaseId(Integer caseId) {
		this.caseId = caseId;
	}
	public Integer getHisId() {
		return hisId;
	}
	public void setHisId(Integer hisId) {
		this.hisId = hisId;
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
	public String getReporterWeixin() {
		return reporterWeixin;
	}
	public void setReporterWeixin(String reporterWeixin) {
		this.reporterWeixin = reporterWeixin;
	}
	public Integer getReporterUserId() {
		return reporterUserId;
	}
	public void setReporterUserId(Integer reporterUserId) {
		this.reporterUserId = reporterUserId;
	}
	public Integer getAssigneeUserId() {
		return assigneeUserId;
	}
	public void setAssigneeUserId(Integer assigneeUserId) {
		this.assigneeUserId = assigneeUserId;
	}
	public Integer getResponseInterval() {
		return responseInterval;
	}
	public void setResponseInterval(Integer responseInterval) {
		this.responseInterval = responseInterval;
	}
	public Integer getSolveInterval() {
		return solveInterval;
	}
	public void setSolveInterval(Integer solveInterval) {
		this.solveInterval = solveInterval;
	}
	public Integer getFeedbackScore() {
		return feedbackScore;
	}
	public void setFeedbackScore(Integer feedbackScore) {
		this.feedbackScore = feedbackScore;
	}
	public String getFeedbackContent() {
		return feedbackContent;
	}
	public void setFeedbackContent(String feedbackContent) {
		this.feedbackContent = feedbackContent;
	}
	public Integer getCost() {
		return cost;
	}
	public void setCost(Integer cost) {
		this.cost = cost;
	}
	public String getCaseFilePath() {
		return caseFilePath;
	}
	public void setCaseFilePath(String caseFilePath) {
		this.caseFilePath = caseFilePath;
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
	public String getHisRemark() {
		return hisRemark;
	}
	public void setHisRemark(String hisRemark) {
		this.hisRemark = hisRemark;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getReporterName() {
		return reporterName;
	}
	public void setReporterName(String reporterName) {
		this.reporterName = reporterName;
	}
	public String getReporterCompany() {
		return reporterCompany;
	}
	public void setReporterCompany(String reporterCompany) {
		this.reporterCompany = reporterCompany;
	}
	public String getReporterMobile() {
		return reporterMobile;
	}
	public void setReporterMobile(String reporterMobile) {
		this.reporterMobile = reporterMobile;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getDeviceState() {
		return deviceState;
	}
	public void setDeviceState(Integer deviceState) {
		this.deviceState = deviceState;
	}
}
