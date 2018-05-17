package com.jiabo.medical.controller.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.User;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.auth.UserAuthService;

@RestController
@RequestMapping("/auth")
public class UserController {
	
	@Autowired
	private UserAuthService userAuthService;
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseDTO login(@RequestParam("loginName") String loginName, @RequestParam("password") String password) {
		ResponseDTO result = userAuthService.getUserInfo(loginName, password);
		return result;
	}
	
	
	@RequestMapping(value="/logout",method=RequestMethod.POST)
	public ResponseDTO logout(@RequestParam("loginName") String loginName) {
		ResponseDTO result =  new ResponseDTO();
		return result;
	}
	
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	public ResponseDTO addUser(User user) {
		ResponseDTO result = userAuthService.addUser(user);
		return result;
	}

}
