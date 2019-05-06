package com.jiabo.medical.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;

public class QRCodeUtil {

	
	public static void createQRCode(String info, HttpServletResponse response) {
		ByteArrayOutputStream out = QRCode.from(info)  
                .to(ImageType.PNG).stream(); 
		
		
		response.setContentType("image/jpeg");  // 设置返回的文件类型  
		   
		   try {
			OutputStream toClient = response.getOutputStream(); // 得到向客户端输出二进制数据的对象  
			toClient.write(out.toByteArray());
			// 输出数据  
			toClient.close();
		} catch (IOException e) {
		}   
		
		
		
	}
}
