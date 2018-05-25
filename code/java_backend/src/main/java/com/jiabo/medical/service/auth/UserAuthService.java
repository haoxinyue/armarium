package com.jiabo.medical.service.auth;

import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.User;
import com.jiabo.medical.mapper.UserMapper;
import com.jiabo.medical.pojo.ResponseDTO;

@Service
public class UserAuthService {
	
	@Autowired
	private UserMapper userMapper;
	
	public ResponseDTO<User> getUserInfo(String loginName, String password) {
		
		ResponseDTO<User> res = new ResponseDTO<User>();
		
		if (StringUtils.isEmpty(loginName)) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入用户名!";
			return res;
		}
		
		if (StringUtils.isEmpty(password)) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入密码!";
			return res;
		}
		// 检查用户
		if (userMapper.checkUserInfo(loginName) == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "该用户不存在!";
			return res;
		}
		
		String encryPass = DigestUtils.md5Hex(password);
		
		User usrCondition = new User();
		usrCondition.setLoginName(loginName);
		usrCondition.setLoginPassword(encryPass);
		
		
		List<User> usrInfos = userMapper.findUserInfo(usrCondition);
		// 检查用户名和密码
		if (usrInfos.size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "用户或密码不正确!";
			return res;
		}
		
		res.data = usrInfos.get(0);
		
		res.code = ConstantInfo.NORMAL;
		
		return res;
		
	}
	
	public ResponseDTO<User> addUser(User user) {
		
		ResponseDTO<User> res = new ResponseDTO<User>();
		
		if (StringUtils.isEmpty(user.getLoginName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入用户名!";
			return res;
		}
		
		if (StringUtils.isEmpty(user.getLoginPassword())) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入密码!";
			return res;
		}
		
		// 加密
		user.setLoginPassword(DigestUtils.md5Hex(user.getLoginPassword()));
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		user.setCreateTime(now);
		user.setModifyTime(now);
		
		try {
			int count = userMapper.addUserInfo(user);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "添加成功";
	
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "插入失败，可能存在重复主键";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}
	
	public ResponseDTO<User> updUser(User user) {
		
		ResponseDTO<User> res = new ResponseDTO<User>();
		
		if (StringUtils.isEmpty(user.getLoginName())) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入用户名!";
			return res;
		}
		
		if (StringUtils.isEmpty(user.getLoginPassword())) {
			res.code = ConstantInfo.INVALID;
			res.message = "请输入密码!";
			return res;
		}
		
		// 加密
		user.setLoginPassword(DigestUtils.md5Hex(user.getLoginPassword()));
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		user.setModifyTime(now);
		
		try {
			int count = userMapper.updUserInfo(user);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "更新成功";
	
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "更新失败,请确认该纪录是否存在";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}
	
public ResponseDTO delUser(int userId) {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			int count = userMapper.delUserInfo(userId);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "删除成功";
	
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "删除失败,请确认该纪录是否存在";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
		
		return res;
		
	}
	
}
