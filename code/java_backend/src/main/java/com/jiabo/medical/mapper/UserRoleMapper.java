package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jiabo.medical.entity.User;
import com.jiabo.medical.entity.UserRole;

@Mapper
public interface UserRoleMapper {
	public int checkUserInfo(@Param("loginName") String loginName);
	
	public List<User> findUserInfo(User user);
	public List<User> getRoleList();
	public List<User> getEngineerList();
	public List<UserRole> getUsersWithRole(int roleId);
	public List<UserRole> getUsersWithoutRole(int roleId);
	public User getUserInfo(int userId);
	public int addUserToRole(UserRole user);
	public int deleteUserFromRole(UserRole user);
	public int bindUser(User user);
	public int unbindUser(User user);
	public User getUserWithOpenId(String openId);
    public int addUserInfo(User user);
    public int updUserInfo(User user);
    public int delUserInfo(@Param("userId") int userId);  
}
