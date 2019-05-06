package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class BadEventDTO implements Serializable {
	
	private Integer pageIndex = null;
	private Integer eventId= null;
	private String eventSubject;
	private String caseRemark;
	private Integer caseState=null;
	private String eventRemark;
	private String eventTime;
	private Integer reporterUserId=null;
	private Integer deviceId=null;
	private String hospital;
	private String deviceName;
	private String deptName;
	private String discussionSuggestion;
	private String discussionParticipant;
	private String discussionTime;
	private String solveResult;
	private String solveTime;
	
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
	public Integer getReporterUserId() {
		return reporterUserId;
	}
	public void setReporterUserId(Integer reporterUserId) {
		this.reporterUserId = reporterUserId;
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
	public Integer getPageIndex() {
		return pageIndex;
	}
	public Integer getEventId() {
		return eventId;
	}
	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}
	public String getEventSubject() {
		return eventSubject;
	}
	public void setEventSubject(String eventSubject) {
		this.eventSubject = eventSubject;
	}
	public String getEventRemark() {
		return eventRemark;
	}
	public void setEventRemark(String eventRemark) {
		this.eventRemark = eventRemark;
	}
	public String getEventTime() {
		return eventTime;
	}
	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}
	public String getDiscussionSuggestion() {
		return discussionSuggestion;
	}
	public void setDiscussionSuggestion(String discussionSuggestion) {
		this.discussionSuggestion = discussionSuggestion;
	}
	public String getDiscussionParticipant() {
		return discussionParticipant;
	}
	public void setDiscussionParticipant(String discussionParticipant) {
		this.discussionParticipant = discussionParticipant;
	}
	public String getDiscussionTime() {
		return discussionTime;
	}
	public void setDiscussionTime(String discussionTime) {
		this.discussionTime = discussionTime;
	}
	public String getSolveResult() {
		return solveResult;
	}
	public void setSolveResult(String solveResult) {
		this.solveResult = solveResult;
	}
	public String getSolveTime() {
		return solveTime;
	}
	public void setSolveTime(String solveTime) {
		this.solveTime = solveTime;
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
	
}
