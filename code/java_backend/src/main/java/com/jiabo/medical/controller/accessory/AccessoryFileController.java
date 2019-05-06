package com.jiabo.medical.controller.accessory;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Accessory;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.accessory.DeviceAccessoryService;
import com.jiabo.medical.util.CommonUtils;

@RestController
@RequestMapping("/accessory")
public class AccessoryFileController {
	
	@Value("${accessory.file.path}") 
	private String filePath;
	
	@Value("${server.ip.address}")
	private String serverAdd;
	
	@Autowired
	private DeviceAccessoryService deviceAccessoryService;
	
	private final Logger logger = Logger.getLogger(this.getClass());

	@RequestMapping(value="/fileUpload",method=RequestMethod.POST)
    public ResponseDTO fileUpload(@RequestParam("fileUpload") MultipartFile file){
		
		ResponseDTO res = new ResponseDTO();
		
		if (file.isEmpty()) {
			res.code = ConstantInfo.INVALID;
			res.message = "文件为空";
			return res;
        }
        // 获取文件名
        String fileName = file.getOriginalFilename();

        // 获取文件的后缀名
        String suffixName = fileName.lastIndexOf(".") > 0 ?fileName.substring(fileName.lastIndexOf(".")):null;
        logger.info("上传的后缀名为：" + suffixName);
        //String folder = CommonUtils.createRandomFolder()+"/";
        String fileNameWithoutSuffix;
        if (fileName.lastIndexOf(".") > 0) {
        	fileNameWithoutSuffix = fileName.substring(0, fileName.lastIndexOf("."));
        } else {
        	fileNameWithoutSuffix = fileName;
        }
        // 文件上传后的路径
        // 解决中文问题，liunx下中文路径，图片显示问题
        
        fileName = fileNameWithoutSuffix + "_" +UUID.randomUUID().toString().replace("-", "")+ suffixName;
        int endIndx = fileName.length() < 99 ? fileName.length() : 99;
        File dest = new File(filePath  + fileName.substring(0, endIndx));
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
		
        try {
			file.transferTo(dest);
			
			res.code = ConstantInfo.NORMAL;
			res.data = serverAdd + "/accessory/queryPic?file="+ fileName;
			res.message = "上传成功";
		} catch (IllegalStateException e) {
			res.code = ConstantInfo.INVALID;
			res.message = "上传失败";
		} catch (IOException e) {
			res.code = ConstantInfo.INVALID;
			res.message = "上传失败";
		}

		return res;
		
	}

@RequestMapping(value = "queryPic")
public void queryPic(@RequestParam("file") String file,HttpServletRequest request, HttpServletResponse response) throws IOException  {  
		
		if (file != null){  
		    FileInputStream is =this.query_getPhotoImageBlob(file);  
		    
		    if (is != null){   
		       int i = is.available(); // 得到文件大小  
			   byte data[] = new byte[i];  
			   is.read(data); // 读数据  
			   is.close();  
			   response.setContentType("image/jpeg");  // 设置返回的文件类型  
			   OutputStream toClient = response.getOutputStream(); // 得到向客户端输出二进制数据的对象  
			   toClient.write(data); // 输出数据  
			   toClient.close();  
		    }  
		   }  
		}

private FileInputStream query_getPhotoImageBlob(String fileName) {   
	  FileInputStream is = null;  
	 File filePic = new File(filePath+fileName);
	 try {
		is = new FileInputStream(filePic);
	} catch (FileNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}


	 return is;
	
	}  
	
	@RequestMapping("/download")
	public ResponseDTO downLoad(HttpServletResponse response, 
			@RequestParam("fileName") String fileName){
		
		ResponseDTO res = new ResponseDTO();
		
		
		File file = new File(filePath+fileName);
        if (file.exists()) {
        	response.setContentType("application/force-download");// 设置强制下载不打开
            response.addHeader("Content-Disposition",
                    "attachment;fileName=" +  fileName);// 设置文件名
            
            byte[] buffer = new byte[1024];
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            
            try {
	            fis = new FileInputStream(file);
	            bis = new BufferedInputStream(fis);
	            OutputStream os = response.getOutputStream();
	            int i = bis.read(buffer);
	            while (i != -1) {
	                os.write(buffer, 0, i);
	                i = bis.read(buffer);
	            }
	            logger.info("download success!");
	            
	            res.code = ConstantInfo.NORMAL;
	            res.message = "下载成功";
            } catch (Exception e) {
            	res.code = ConstantInfo.INVALID;
            	res.message = e.getMessage();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            
        } else {
        	res.code = ConstantInfo.INVALID;
        	res.message = "该文件不存在!";
        }
		
        
        return res;
	}
	
	@RequestMapping(value="/getAccessory",method=RequestMethod.POST)
	public ResponseDTO getAccessory(@RequestBody Accessory accessory) {
		
		return deviceAccessoryService.getAccessory(accessory.getAccessoryId());
	}
	
	@RequestMapping(value="/addAccessory",method=RequestMethod.POST)
	public ResponseDTO addAccessory(@RequestBody Accessory accessory) {
		
		return deviceAccessoryService.addAccessory(accessory);
	}
	
	@RequestMapping(value="/delAccessory",method=RequestMethod.POST)
	public ResponseDTO delAccessory(@RequestParam("accessoryId") int accessoryId) {
		return deviceAccessoryService.delAccessory(accessoryId);
	}
}
