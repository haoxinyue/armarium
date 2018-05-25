package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jiabo.medical.entity.User;

@Mapper
public interface UserMapper {
	public int checkUserInfo(@Param("loginName") String loginName);
	
	public List<User> findUserInfo(User user);
	
    public int addUserInfo(User user);
    public int updUserInfo(User user);
    public int delUserInfo(@Param("userId") int userId);  
}
