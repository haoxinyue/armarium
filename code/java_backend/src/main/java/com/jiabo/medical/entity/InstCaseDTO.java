package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;


public class InstCaseDTO implements Serializable {
	
	public Integer getNeedInspection() {
		return needInspection;
	}
	public void setNeedInspection(Integer needInspection) {
		this.needInspection = needInspection;
	}
	public Integer getNeedMetering() {
		return needMetering;
	}
	public void setNeedMetering(Integer needMetering) {
		this.needMetering = needMetering;
	}
	public Integer getUsageState() {
		return usageState;
	}
	public void setUsageState(Integer usageState) {
		this.usageState = usageState;
	}
	private Integer pageIndex = null;
	private Integer pageSize = 10;
	private Integer caseId= null;
	private String caseSubject;
	private String caseRemark;
	private String deviceModel;
	private String serialNumber;
	private Integer caseState=null;
	private Integer reporterUserId=null;
	private Integer assigneeUserId=null;
	private Integer deviceId=null;
	private Integer deviceType=null;
	private Integer needInspection;
	private Integer needMetering;
	private Integer usageState;
	private Integer hospitalId;
	private Integer deptId;
	private String deviceName;
	private String assigneeUserName;
	private String assetNo;
	private String deviceDesc;
	private String deviceCode;
	private String manufacturer;
	private String producingPlace;
	private String setupBeginTime;
	private String expectedTime= null;
	private String setupTime= null;
	private Integer contractId=null;
	private Integer cost=null;
	private String setupRemark;
	
	
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
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
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
	public Integer getContractId() {
		return contractId;
	}
	public void setContractId(Integer contractId) {
		this.contractId = contractId;
	}
	public Integer getCost() {
		return cost;
	}
	public void setCost(Integer cost) {
		this.cost = cost;
	}
	public String getSetupRemark() {
		return setupRemark;
	}
	public void setSetupRemark(String setupRemark) {
		this.setupRemark = setupRemark;
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
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	
	public Integer getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(Integer deviceType) {
		this.deviceType = deviceType;
	}
	public String getExpectedTime() {
		return expectedTime;
	}
	public void setExpectedTime(String expectedTime) {
		this.expectedTime = expectedTime;
	}
	public String getSetupTime() {
		return setupTime;
	}
	public void setSetupTime(String setupTime) {
		this.setupTime = setupTime;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Integer getDeptId() {
		return deptId;
	}
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	public String getDeviceModel() {
		return deviceModel;
	}
	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}
	public String getAssetNo() {
		return assetNo;
	}
	public void setAssetNo(String assetNo) {
		this.assetNo = assetNo;
	}
	public String getDeviceDesc() {
		return deviceDesc;
	}
	public void setDeviceDesc(String deviceDesc) {
		this.deviceDesc = deviceDesc;
	}
	public String getDeviceCode() {
		return deviceCode;
	}
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getProducingPlace() {
		return producingPlace;
	}
	public void setProducingPlace(String producingPlace) {
		this.producingPlace = producingPlace;
	}
	public String getSetupBeginTime() {
		return setupBeginTime;
	}
	public void setSetupBeginTime(String setupBeginTime) {
		this.setupBeginTime = setupBeginTime;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
}
