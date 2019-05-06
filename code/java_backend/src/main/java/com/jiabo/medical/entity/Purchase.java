package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class Purchase implements Serializable {
	
	private Integer pageIndex = null;
	private Integer pageSize = 10;
	private Integer purchaseId;
	private Integer contractId;
	private String purchaseOwner;
	private Integer hasBid;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	public Integer getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(Integer purchaseId) {
		this.purchaseId = purchaseId;
	}
	public Integer getContractId() {
		return contractId;
	}
	public void setContractId(Integer contractId) {
		this.contractId = contractId;
	}
	public String getPurchaseOwner() {
		return purchaseOwner;
	}
	public void setPurchaseOwner(String purchaseOwner) {
		this.purchaseOwner = purchaseOwner;
	}
	public Integer getHasBid() {
		return hasBid;
	}
	public void setHasBid(Integer hasBid) {
		this.hasBid = hasBid;
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
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
}