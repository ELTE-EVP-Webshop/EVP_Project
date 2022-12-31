package com.webshop.responsemodels;

import java.util.List;

/**
 * Felhasználó fő adatait visszaadó modell (csak megjeleníthető adatokat tartalmaz, jelszó nélkül)
 * Long id, String username, String email, List<String> roles, String cookie
 * @author BalazsPC
 *
 */
public class UserInfoResponse {
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private String cookie;

	public UserInfoResponse(Long id, String username, String email, List<String> roles, String cookie) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.cookie = cookie;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
}