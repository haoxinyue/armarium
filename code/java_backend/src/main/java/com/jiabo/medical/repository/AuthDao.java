package com.jiabo.medical.repository;


import org.springframework.stereotype.Repository;

@Repository
public class AuthDao {

	public boolean CheckUserPassword(String userId, String password) {
		return true;
	}
}
