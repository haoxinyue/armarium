package com.jiabo.medical.service.area;

import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.Area;
import com.jiabo.medical.entity.User;
import com.jiabo.medical.mapper.AreaMapper;
import com.jiabo.medical.pojo.ResponseDTO;

@Service
public class AreaService {
	
	@Autowired
	private AreaMapper areaMapper;
	
	public ResponseDTO<List<Area>> getAreaInfo() {
		
		ResponseDTO<List<Area>> res = new ResponseDTO<List<Area>>();
		
		List<Area> areaInfo = areaMapper.getAreaInfo();
		// 检查用户名和密码
		if (areaInfo.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "无符合条件的区域信息!";
			return res;
		}
		
		res.data = areaInfo;
		
		res.code = ConstantInfo.NORMAL;
		
		return res;
		
	}
	
}
