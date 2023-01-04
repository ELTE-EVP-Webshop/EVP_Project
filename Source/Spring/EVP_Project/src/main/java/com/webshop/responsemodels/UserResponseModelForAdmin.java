package com.webshop.responsemodels;

import java.util.List;
import java.util.Set;

import com.webshop.dbModels.Orders;
import com.webshop.dbModels.Role;

/**
 * Adminisztrátorok számára a felhasználók lekérésére készült modell
 * long userId, String username, String email, boolean mailConfirmed, List<Orders> userOrders, Set<Role>userRoles
 * @author BalazsPC
 *
 */
public class UserResponseModelForAdmin {
	 long userId;
	String username;
	String email;
	boolean mailConfirmed;
	List<Orders> userOrders;
	Set<Role> userRoles;
	
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isMailConfirmed() {
		return mailConfirmed;
	}
	public void setMailConfirmed(boolean mailConfirmed) {
		this.mailConfirmed = mailConfirmed;
	}
	public List<Orders> getUserOrders() {
		return userOrders;
	}
	public void setUserOrders(List<Orders> userOrders) {
		this.userOrders = userOrders;
	}
	public Set<Role> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(Set<Role> userRoles) {
		this.userRoles = userRoles;
	}
	
	
}
