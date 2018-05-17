package com.jiabo.medical;

import javax.sql.DataSource;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class JiaboMedicalApplication extends SpringBootServletInitializer {
	@Autowired
	DataSource dataSource;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		// TODO Auto-generated method stub
		System.out.println("数据源："+dataSource);
		return builder.sources(JiaboMedicalApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(JiaboMedicalApplication.class, args);
		
		
		//String password = DigestUtils.md5Hex("111");
		//System.out.println("加密后密码："+ds);
	}
}
