package com.jiabo.medical.entity;

import java.io.Serializable;
import java.sql.Timestamp;

public class DvTimelineDTO implements Serializable {
	
	
	private Integer pageIndex = null;
	private Integer timelineId;
	private String eventSubject;
	private String eventName;
	private Integer eventType;
	private Integer deviceId;
	private Integer eventId;
	private String deviceName;
	private Integer userId;
	private String respPersonName;
	
	private Timestamp eventTime;
	
	private String eventBeginTime;
	private String eventEndTime;
	
	private Timestamp createTime;
	private Integer creater;
	private Timestamp modifyTime;
	private Integer modifier;
	
	
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
	public Integer getTimelineId() {
		return timelineId;
	}
	public void setTimelineId(Integer timelineId) {
		this.timelineId = timelineId;
	}
	public String getEventSubject() {
		return eventSubject;
	}
	public void setEventSubject(String eventSubject) {
		this.eventSubject = eventSubject;
	}
	public Integer getEventType() {
		return eventType;
	}
	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}
	public Integer getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}
	public Integer getEventId() {
		return eventId;
	}
	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}
	public Timestamp getEventTime() {
		return eventTime;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public void setEventTime(Timestamp eventTime) {
		this.eventTime = eventTime;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getRespPersonName() {
		return respPersonName;
	}
	public void setRespPersonName(String respPersonName) {
		this.respPersonName = respPersonName;
	}
	public String getEventBeginTime() {
		return eventBeginTime;
	}
	public void setEventBeginTime(String eventBeginTime) {
		this.eventBeginTime = eventBeginTime;
	}
	public String getEventEndTime() {
		return eventEndTime;
	}
	public void setEventEndTime(String eventEndTime) {
		this.eventEndTime = eventEndTime;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	
}