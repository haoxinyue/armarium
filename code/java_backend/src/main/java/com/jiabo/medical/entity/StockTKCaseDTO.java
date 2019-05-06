package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

public class StockTKCaseDTO implements Serializable {
	
	private Integer pageIndex = null;
	private Integer pageSize = 10;
	private Integer caseId;
	private String caseSubject=null;
	private String caseRemark=null;
	private Integer caseState=null;
	
	private Integer hospitalId;
	private Integer assigneeUserId;
	private String planBeginTimeFrom;
	private String planBeginTimeTo;
	private String planBeginTime;
	private String planEndTime;
	private String actualTime;
	private String assigneeUserName;
	private String deptNameArr;
	private List<Integer> depts;
	
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
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public String getPlanBeginTime() {
		return planBeginTime;
	}
	public void setPlanBeginTime(String planBeginTime) {
		this.planBeginTime = planBeginTime;
	}
	public String getPlanEndTime() {
		return planEndTime;
	}
	public void setPlanEndTime(String planEndTime) {
		this.planEndTime = planEndTime;
	}
	public String getActualTime() {
		return actualTime;
	}
	public void setActualTime(String actualTime) {
		this.actualTime = actualTime;
	}
	public List<Integer> getDepts() {
		return depts;
	}
	public void setDepts(List<Integer> depts) {
		this.depts = depts;
	}
	public String getAssigneeUserName() {
		return assigneeUserName;
	}
	public void setAssigneeUserName(String assigneeUserName) {
		this.assigneeUserName = assigneeUserName;
	}
	public String getDeptNameArr() {
		return deptNameArr;
	}
	public void setDeptNameArr(String deptNameArr) {
		this.deptNameArr = deptNameArr;
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
	public String getPlanBeginTimeFrom() {
		return planBeginTimeFrom;
	}
	public void setPlanBeginTimeFrom(String planBeginTimeFrom) {
		this.planBeginTimeFrom = planBeginTimeFrom;
	}
	public String getPlanBeginTimeTo() {
		return planBeginTimeTo;
	}
	public void setPlanBeginTimeTo(String planBeginTimeTo) {
		this.planBeginTimeTo = planBeginTimeTo;
	}
	
}
