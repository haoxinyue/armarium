package com.jiabo.medical.util;

import java.math.BigDecimal;
import java.sql.Date;


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
    
    public static void main(String[] args) {
        System.out.println(isDate("2010-10-41"));
    }
}
