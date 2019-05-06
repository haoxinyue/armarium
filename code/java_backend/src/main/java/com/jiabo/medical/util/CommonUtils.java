package com.jiabo.medical.util;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Random;

import com.alibaba.druid.util.StringUtils;


public class CommonUtils {
	
    
    public static Integer toZero(Integer val) {
        return val == null ? 0:val;
        
    }
    
    public static BigDecimal toZero(BigDecimal val) {
        return val == null ? new BigDecimal(0):val;
        
    }
    
    public static String nullToString(Object o){
        return o == null ? "":o.toString();
    }
    
    public static boolean isDate(String val) {
        
        try {
        Date date = Date.valueOf(val);
        } catch (IllegalArgumentException e) {
            return false;
        }
        
        return true;
        
    }
    
    public static String substring(String val, int length) {
		if (StringUtils.isEmpty(val)) {
			return null;
		} else if (val.length() >= length) {
			return val.substring(0, length-1);
		} else {
			return val;
		}
	}
    
   public static String createRandomFolder() {
	   String luckNumber = "";
       while (luckNumber.length() < 6) {
           int number = new Random().nextInt(10);// 生成随机数
           System.out.println("10以内随机数："+number);
           luckNumber = luckNumber + number;// 
       }
       
       return luckNumber;
   }
}
