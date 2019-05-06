package com.jiabo.medical.service.auth;


import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.User;
import com.jiabo.medical.entity.UserRole;
import com.jiabo.medical.mapper.UserRoleMapper;
import com.jiabo.medical.pojo.ResponseDTO;

@Service
public class UserAuthService {
	
	@Autowired
	private UserRoleMapper userMapper;
	
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

    public ResponseDTO getEngineerList() {
    	ResponseDTO res = new ResponseDTO();
		
		try {
			List<User> engineerInfos = userMapper.getEngineerList();
			
			if (engineerInfos.size() > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "获取成功";
				res.data = engineerInfos;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "没有符合条件的工程师信息";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
	   return res;
    }

    // 取得所有角色
	public ResponseDTO getRoleList() {
		
		ResponseDTO res = new ResponseDTO();
		
		try {
			List<User> roleInfos = userMapper.getRoleList();
			
			if (roleInfos.size() > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "获取成功";
				res.data = roleInfos;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "没有符合条件的角色信息";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
	   return res;
	}
	
	// 取得角色
	public ResponseDTO getUsersWithRole(Integer roleId) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (roleId == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定角色ID!";
			return res;
		}
		
		try {
			List<UserRole> roleInfos = userMapper.getUsersWithRole(roleId);
			
			if (roleInfos.size() > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "获取成功";
				res.data = roleInfos;
			} else {
				res.code = ConstantInfo.INVALID;
				res.message = "没有符合条件的角色信息";
			}
		} catch (DataAccessException e) {
			res.code = ConstantInfo.INVALID;
			res.message = e.getMessage();
		}
	   return res;
	}
	
	// 取得角色
		public ResponseDTO getUsersWithoutRole(Integer roleId) {
			
			ResponseDTO res = new ResponseDTO();
			
			if (roleId == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定角色ID!";
				return res;
			}
			
			try {
				List<UserRole> roleInfos = userMapper.getUsersWithoutRole(roleId);
				
				if (roleInfos.size() > 0) {
					res.code = ConstantInfo.NORMAL;
					res.message = "获取成功";
					res.data = roleInfos;
				} else {
					res.code = ConstantInfo.INVALID;
					res.message = "没有符合条件的角色信息";
				}
			} catch (DataAccessException e) {
				res.code = ConstantInfo.INVALID;
				res.message = e.getMessage();
			}
		   return res;
		}

		public ResponseDTO addUserToRole(User user) {
			ResponseDTO<User> res = new ResponseDTO<User>();
			
			if (user.getRoleId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定角色ID!";
				return res;
			}
			
			if (user.getUserId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定用户ID!";
				return res;
			}
			
			
			Timestamp now = new Timestamp(System.currentTimeMillis());
			
			user.setCreateTime(now);

			
			try {
				int count = 0;
				//userMapper.addUserToRole(user);
				
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
		
		public ResponseDTO deleteUserFromRole(User user) {
			
			ResponseDTO res = new ResponseDTO();
			
			if (user.getRoleId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定角色ID!";
				return res;
			}
			
			if (user.getUserId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定用户ID!";
				return res;
			}
			try {
				int count = 0;
				//userMapper.deleteUserFromRole(user);
				
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

		@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
		public ResponseDTO confirmUserToRole(User userInfo) {
			
			
			ResponseDTO res = new ResponseDTO();
			
			Integer roleId = userInfo.getRoleId();
			
			List<UserRole> oldURInfos = userMapper.getUsersWithRole(roleId);
			
			List<UserRole> users = userInfo.getUsers();
			
			for (UserRole user : users) {
				if (!oldURInfos.contains(user)){
					Timestamp now = new Timestamp(System.currentTimeMillis());
					
					user.setRoleId(userInfo.getRoleId());
					user.setCreater(userInfo.getCreater());
					user.setCreateTime(now);
					// 添加新用户到此角色 
					userMapper.addUserToRole(user);
				}
			}
			
			for (UserRole oldUser : oldURInfos) {
				if (!users.contains(oldUser)){
					// 添加新用户到此角色 
					userMapper.deleteUserFromRole(oldUser);
				}
			
			}
			res.code = ConstantInfo.NORMAL;
			res.message = "更新成功";
			return res;
		}

		public ResponseDTO bindUser(User user) {
			ResponseDTO res = new ResponseDTO();
			
			if (StringUtils.isEmpty(user.getLoginName())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定用户名";
				return res;
			}
			
			if (StringUtils.isEmpty(user.getLoginPassword())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定密码";
				return res;
			}
			
			if (StringUtils.isEmpty(user.getOpenId())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定openId";
				return res;
			}
			
			String encryPass = DigestUtils.md5Hex(user.getLoginPassword());
			
			User usrCondition = new User();
			usrCondition.setLoginName(user.getLoginName());
			usrCondition.setLoginPassword(encryPass);
			
			
			List<User> usrInfos = userMapper.findUserInfo(usrCondition);
			// 检查用户名和密码
			if (usrInfos.size() == 0) {
				res.code = ConstantInfo.USER_PASSWORD_WRONG;
				res.message = "用户或密码不正确，无法绑定!";
				return res;
			} 
			
			User usrInfo = userMapper.getUserWithOpenId(user.getOpenId());
			
			if (usrInfo != null) {
				res.code = ConstantInfo.USER_HAS_BINDED;
				res.message = "用户已绑定";
				return res;
			}
			
			Timestamp now = new Timestamp(System.currentTimeMillis());
			user.setModifyTime(now);
			
			int count = userMapper.bindUser(user);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "该用户绑定成功";
	
			}
			
			return res;
		}
		
		public ResponseDTO unbindUser(User user) {
			ResponseDTO res = new ResponseDTO();
			
			if (StringUtils.isEmpty(user.getLoginName())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定用户名";
				return res;
			}
			
			if (StringUtils.isEmpty(user.getLoginPassword())) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定密码";
				return res;
			}
			
			String encryPass = DigestUtils.md5Hex(user.getLoginPassword());
			
			User usrCondition = new User();
			usrCondition.setLoginName(user.getLoginName());
			usrCondition.setLoginPassword(encryPass);
			
			
			List<User> usrInfos = userMapper.findUserInfo(usrCondition);
			// 检查用户名和密码
			if (usrInfos.size() == 0) {
				res.code = ConstantInfo.USER_PASSWORD_WRONG;
				res.message = "用户或密码不正确，无法解绑!";
				return res;
			} 
			
			Timestamp now = new Timestamp(System.currentTimeMillis());
			user.setModifyTime(now);
			
			int count = userMapper.bindUser(user);
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "该用户解绑成功";
	
			}
			
			return res;
		}
		
		public ResponseDTO<User> getUserWithOpenId(String openId) {
			
			ResponseDTO<User> res = new ResponseDTO<User>();
			
			if (StringUtils.isEmpty(openId)) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定openId";
				return res;
			}
			
			User usrInfo = userMapper.getUserWithOpenId(openId);
			
			if (usrInfo == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "没有符合的用户信息";
				return res;
			}
			
			res.code = ConstantInfo.NORMAL;
			res.data = usrInfo;
			
			return res;
		
		}
		
		
		public ResponseDTO getWechatSession(String jsCode) {
			
			ResponseDTO res = new ResponseDTO();
			HttpURLConnection connection = null;
			
			InputStream is = null;
	        BufferedReader br = null;
	        String result = null;// 返回结果字符串
			
			String appId = "wxdb642bfe2f90bab5";
			String secret = "3ceb8819b21f56186f40d914be0fa0f7";
			String httpurl = "https://api.weixin.qq.com/sns/jscode2session?appid="+appId
					+"&secret="+secret+"&js_code="+jsCode
					+"&grant_type=authorization_code";
		
			URL url;
			try {
				url = new URL(httpurl);
				
				// 通过远程url连接对象打开一个连接，强转成httpURLConnection类
	            connection = (HttpURLConnection) url.openConnection();
	            // 设置连接方式：get
	            connection.setRequestMethod("GET");
	            // 设置连接主机服务器的超时时间：15000毫秒
	            connection.setConnectTimeout(15000);
	            // 设置读取远程返回的数据时间：60000毫秒
	            connection.setReadTimeout(20000);
	            // 发送请求
	            connection.connect();
	            
	            // 通过connection连接，获取输入流
	            if (connection.getResponseCode() == 200) {
	                is = connection.getInputStream();
	                // 封装输入流is，并指定字符集
	                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	                // 存放数据
	                StringBuffer sbf = new StringBuffer();
	                String temp = null;
	                while ((temp = br.readLine()) != null) {
	                    sbf.append(temp);
	                    sbf.append("\r\n");
	                }
	                result = sbf.toString();
	            }
			} catch (Exception e) {
				res.code = ConstantInfo.INVALID;
				res.message = e.getMessage();
				
				return res;
			}
            
			res.code = ConstantInfo.NORMAL;
			res.data = result;
			
			return res;
		}
	
}
