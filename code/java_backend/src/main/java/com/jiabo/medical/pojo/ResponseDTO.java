package com.jiabo.medical.pojo;

import java.io.Serializable;

public class ResponseDTO<T> implements Serializable{
	
	public int code;
	public String message;
	public int recordCount = 0;
	public T data;

}
