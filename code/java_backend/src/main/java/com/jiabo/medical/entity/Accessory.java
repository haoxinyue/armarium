package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Accessory implements Serializable {
	
	private Integer accessoryId;
	private Integer userManual;
	private Integer maintenanceManual;
	private Integer handbook;
	
	private String data1file;
	private String data1desc;
	private String data2file;
	private String data2desc;
	private String data3file;
	private String data3desc;
	private String data4file;
	private String data4desc;
	private String data5file;
	private String data5desc;
	
	private String paperFilePlace;
	private String paperFileContent;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	public Integer getAccessoryId() {
		return accessoryId;
	}
	public void setAccessoryId(Integer accessoryId) {
		this.accessoryId = accessoryId;
	}
	public Integer getUserManual() {
		return userManual;
	}
	public void setUserManual(Integer userManual) {
		this.userManual = userManual;
	}
	public Integer getMaintenanceManual() {
		return maintenanceManual;
	}
	public void setMaintenanceManual(Integer maintenanceManual) {
		this.maintenanceManual = maintenanceManual;
	}
	public Integer getHandbook() {
		return handbook;
	}
	public void setHandbook(Integer handbook) {
		this.handbook = handbook;
	}
	public String getData1file() {
		return data1file;
	}
	public void setData1file(String data1file) {
		this.data1file = data1file;
	}
	public String getData1desc() {
		return data1desc;
	}
	public void setData1desc(String data1desc) {
		this.data1desc = data1desc;
	}
	public String getData2file() {
		return data2file;
	}
	public void setData2file(String data2file) {
		this.data2file = data2file;
	}
	public String getData2desc() {
		return data2desc;
	}
	public void setData2desc(String data2desc) {
		this.data2desc = data2desc;
	}
	public String getData3file() {
		return data3file;
	}
	public void setData3file(String data3file) {
		this.data3file = data3file;
	}
	public String getData3desc() {
		return data3desc;
	}
	public void setData3desc(String data3desc) {
		this.data3desc = data3desc;
	}
	public String getData4file() {
		return data4file;
	}
	public void setData4file(String data4file) {
		this.data4file = data4file;
	}
	public String getData4desc() {
		return data4desc;
	}
	public void setData4desc(String data4desc) {
		this.data4desc = data4desc;
	}
	public String getData5file() {
		return data5file;
	}
	public void setData5file(String data5file) {
		this.data5file = data5file;
	}
	public String getData5desc() {
		return data5desc;
	}
	public void setData5desc(String data5desc) {
		this.data5desc = data5desc;
	}
	public String getPaperFilePlace() {
		return paperFilePlace;
	}
	public void setPaperFilePlace(String paperFilePlace) {
		this.paperFilePlace = paperFilePlace;
	}
	public String getPaperFileContent() {
		return paperFileContent;
	}
	public void setPaperFileContent(String paperFileContent) {
		this.paperFileContent = paperFileContent;
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
	
}
