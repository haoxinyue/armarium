package com.jiabo.medical;

import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableScheduling 
@Configuration
public class LianzhiMedicalApplication extends SpringBootServletInitializer {
	@Autowired
	DataSource dataSource;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		// TODO Auto-generated method stub
		System.out.println("数据源："+dataSource);
		return builder.sources(LianzhiMedicalApplication.class);
	}
	
	/**  
     * 文件上传配置  
     * @return  
     */  
    @Bean  
    public MultipartConfigElement multipartConfigElement() {  
        MultipartConfigFactory factory = new MultipartConfigFactory();  
        //单个文件最大  
        factory.setMaxFileSize("102400KB"); //KB,MB  
        /// 设置总上传数据总大小  
        factory.setMaxRequestSize("1024000KB");  
        return factory.createMultipartConfig();
    }  

	public static void main(String[] args) {
		SpringApplication.run(LianzhiMedicalApplication.class, args);
		
		//String password ="/sb/zq/惹人爱.txt".substring("/sb/zq/惹人爱.txt".lastIndexOf("/")+1); 
		//String password = DigestUtils.md5Hex("111");
		//System.out.println("加密后密码："+password);
	}
}
