package com.jiabo.medical.controller.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.entity.User;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.auth.UserAuthService;

@RestController
@RequestMapping("/auth")
public class UserRoleController {
	
	@Autowired
	private UserAuthService userAuthService;
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseDTO login(@RequestBody User user) {
		ResponseDTO result = userAuthService.getUserInfo(user.getLoginName(), user.getLoginPassword());
		return result;
	}
	
	
	@RequestMapping(value="/logout",method=RequestMethod.POST)
	public ResponseDTO logout(@RequestBody User user) {
		ResponseDTO result =  new ResponseDTO();
		return result;
	}
	
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	public ResponseDTO addUser(@RequestBody User user) {
		ResponseDTO result = userAuthService.addUser(user);
		return result;
	}
	
	@RequestMapping(value="/updUser",method=RequestMethod.POST)
	public ResponseDTO updUser(@RequestBody User user) {
		ResponseDTO result = userAuthService.updUser(user);
		return result;
	}
	
	@RequestMapping(value="/getEngineerList",method=RequestMethod.POST)
	public ResponseDTO getEngineerList() {
		return userAuthService.getEngineerList();
	}
	
	@RequestMapping(value="/getRoleList",method=RequestMethod.POST)
	public ResponseDTO getRoleList() {
		return userAuthService.getRoleList();
	}
	
	@RequestMapping(value="/getUsersWithRole",method=RequestMethod.POST)
	public ResponseDTO getUsersWithRole(@RequestBody User user) {
		return userAuthService.getUsersWithRole(user.getRoleId());
	}
	
	@RequestMapping(value="/getUsersWithoutRole",method=RequestMethod.POST)
	public ResponseDTO getUsersWithoutRole(@RequestBody User user) {
		return userAuthService.getUsersWithoutRole(user.getRoleId());
	}
	
	@RequestMapping(value="/addUserToRole",method=RequestMethod.POST)
	public ResponseDTO addUserToRole(@RequestBody User user) {
		ResponseDTO result = userAuthService.addUserToRole(user);
		return result;
	}
	
	@RequestMapping(value="/deleteUserFromRole",method=RequestMethod.POST)
	public ResponseDTO deleteUserFromRole(@RequestBody User user) {
		ResponseDTO result = userAuthService.deleteUserFromRole(user);
		return result;
	}
	
	@RequestMapping(value="/confirmUserToRole",method=RequestMethod.POST)
	public ResponseDTO confirmUserToRole(@RequestBody User userRole) {
		ResponseDTO result = userAuthService.confirmUserToRole(userRole);
		return result;
	}
	
	@RequestMapping(value="/bindUser",method=RequestMethod.POST)
	public ResponseDTO bindUser(@RequestBody User user) {
		ResponseDTO result = userAuthService.bindUser(user);
		return result;
	}
	
	@RequestMapping(value="/unbindUser",method=RequestMethod.POST)
	public ResponseDTO unbindUser(@RequestBody User user) {
		ResponseDTO result = userAuthService.unbindUser(user);
		return result;
	}
	
	@RequestMapping(value="/getUserWithOpenId",method=RequestMethod.POST)
	public ResponseDTO getUserWithOpenId(@RequestBody User user) {
		ResponseDTO result = userAuthService.getUserWithOpenId(user.getOpenId());
		return result;
	}
	
	@RequestMapping(value="/getWechatSession",method=RequestMethod.POST)
	public ResponseDTO getWechatSession(@RequestBody User user) {
		ResponseDTO result = userAuthService.getWechatSession(user.getJsCode());
		return result;
	}

}
