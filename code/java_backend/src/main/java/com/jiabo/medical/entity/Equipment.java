package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Equipment implements Serializable {
	
	private Integer pageIndex = null;
	private Integer deviceId;
	private String deviceCode;
	private String deviceName;
	private Integer hospitalId;
	private String hospital;
	private Integer departmentId;
	private String department;
	
	private String picture1;
	private String picture2;
	private String picture3;
	private String picture4;
	private String picture5;
	
	private String assetNo;
	private String deviceModel;
	private String deviceDesc;
	
	private Integer deviceState;
	private Integer deviceType;
	private String serialNumber;
	
	private Integer usageState;
	private String qrCode;
	private String manufacturer;
	private String producingPlace;
	
	private String accessory;
	private String setupDate;
	private String acceptDate;
	
	private String acceptRemark;
	private String acceptFile;
	private String useDate;
	
	private String deviceOwner;
	private String storageDate;
	
	private Integer purchaseAmount;
	private String maintenanceEndDate;
	private String warrantyBeginDate;
	private String warrantyEndDate;
	private Integer warrantyAmount;
	
	private String warrantyContent;
	
	private String salesSupplier;
	private String salesSupplierContact;
	private String salesSupplierPhone;
	private String salesSupplierDesc;
	private String afterSaleProvider;
	private String afterSaleProviderEngineer;
	private String afterSaleProviderPhone;
	private String afterSaleProviderDesc;
	private Integer contractId;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public String getDeviceCode() {
		return deviceCode;
	}
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	
	public String getPicture1() {
		return picture1;
	}
	public void setPicture1(String picture1) {
		this.picture1 = picture1;
	}
	public String getPicture2() {
		return picture2;
	}
	public void setPicture2(String picture2) {
		this.picture2 = picture2;
	}
	public String getPicture3() {
		return picture3;
	}
	public void setPicture3(String picture3) {
		this.picture3 = picture3;
	}
	public String getPicture4() {
		return picture4;
	}
	public void setPicture4(String picture4) {
		this.picture4 = picture4;
	}
	public String getPicture5() {
		return picture5;
	}
	public void setPicture5(String picture5) {
		this.picture5 = picture5;
	}
	public String getAssetNo() {
		return assetNo;
	}
	public void setAssetNo(String assetNo) {
		this.assetNo = assetNo;
	}
	public String getDeviceModel() {
		return deviceModel;
	}
	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}
	public String getDeviceDesc() {
		return deviceDesc;
	}
	public void setDeviceDesc(String deviceDesc) {
		this.deviceDesc = deviceDesc;
	}
	public Integer getDeviceState() {
		return deviceState;
	}
	public void setDeviceState(Integer deviceState) {
		this.deviceState = deviceState;
	}
	public Integer getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(Integer deviceType) {
		this.deviceType = deviceType;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public Integer getUsageState() {
		return usageState;
	}
	public void setUsageState(Integer usageState) {
		this.usageState = usageState;
	}
	public String getQrCode() {
		return qrCode;
	}
	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
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
	public String getAccessory() {
		return this.accessory;
	}
	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}
	public String getSetupDate() {
		return setupDate;
	}
	public void setSetupDate(String setupDate) {
		this.setupDate = setupDate;
	}
	public String getAcceptDate() {
		return acceptDate;
	}
	public void setAcceptDate(String acceptDate) {
		this.acceptDate = acceptDate;
	}
	public String getAcceptRemark() {
		return acceptRemark;
	}
	public void setAcceptRemark(String acceptRemark) {
		this.acceptRemark = acceptRemark;
	}
	public String getAcceptFile() {
		return acceptFile;
	}
	public void setAcceptFile(String acceptFile) {
		this.acceptFile = acceptFile;
	}
	public String getUseDate() {
		return useDate;
	}
	public void setUseDate(String useDate) {
		this.useDate = useDate;
	}
	public String getDeviceOwner() {
		return deviceOwner;
	}
	public void setDeviceOwner(String deviceOwner) {
		this.deviceOwner = deviceOwner;
	}
	public String getStorageDate() {
		return storageDate;
	}
	public void setStorageDate(String storageDate) {
		this.storageDate = storageDate;
	}
	public Integer getPurchaseAmount() {
		return purchaseAmount;
	}
	public void setPurchaseAmount(Integer purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}
	public String getMaintenanceEndDate() {
		return maintenanceEndDate;
	}
	public void setMaintenanceEndDate(String maintenanceEndDate) {
		this.maintenanceEndDate = maintenanceEndDate;
	}
	public String getWarrantyBeginDate() {
		return warrantyBeginDate;
	}
	public void setWarrantyBeginDate(String warrantyBeginDate) {
		this.warrantyBeginDate = warrantyBeginDate;
	}
	public String getWarrantyEndDate() {
		return warrantyEndDate;
	}
	public void setWarrantyEndDate(String warrantyEndDate) {
		this.warrantyEndDate = warrantyEndDate;
	}
	public Integer getWarrantyAmount() {
		return warrantyAmount;
	}
	public void setWarrantyAmount(Integer warrantyAmount) {
		this.warrantyAmount = warrantyAmount;
	}
	public String getWarrantyContent() {
		return warrantyContent;
	}
	public void setWarrantyContent(String warrantyContent) {
		this.warrantyContent = warrantyContent;
	}
	public String getSalesSupplier() {
		return salesSupplier;
	}
	public void setSalesSupplier(String salesSupplier) {
		this.salesSupplier = salesSupplier;
	}
	public String getSalesSupplierContact() {
		return salesSupplierContact;
	}
	public void setSalesSupplierContact(String salesSupplierContact) {
		this.salesSupplierContact = salesSupplierContact;
	}
	public String getSalesSupplierPhone() {
		return salesSupplierPhone;
	}
	public void setSalesSupplierPhone(String salesSupplierPhone) {
		this.salesSupplierPhone = salesSupplierPhone;
	}
	public String getSalesSupplierDesc() {
		return salesSupplierDesc;
	}
	public void setSalesSupplierDesc(String salesSupplierDesc) {
		this.salesSupplierDesc = salesSupplierDesc;
	}
	public String getAfterSaleProvider() {
		return afterSaleProvider;
	}
	public void setAfterSaleProvider(String afterSaleProvider) {
		this.afterSaleProvider = afterSaleProvider;
	}
	public String getAfterSaleProviderEngineer() {
		return afterSaleProviderEngineer;
	}
	public void setAfterSaleProviderEngineer(String afterSaleProviderEngineer) {
		this.afterSaleProviderEngineer = afterSaleProviderEngineer;
	}
	public String getAfterSaleProviderPhone() {
		return afterSaleProviderPhone;
	}
	public void setAfterSaleProviderPhone(String afterSaleProviderPhone) {
		this.afterSaleProviderPhone = afterSaleProviderPhone;
	}
	public String getAfterSaleProviderDesc() {
		return afterSaleProviderDesc;
	}
	public void setAfterSaleProviderDesc(String afterSaleProviderDesc) {
		this.afterSaleProviderDesc = afterSaleProviderDesc;
	}
	public Integer getContractId() {
		return contractId;
	}
	public void setContractId(Integer contractId) {
		this.contractId = contractId;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Integer getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	
}
