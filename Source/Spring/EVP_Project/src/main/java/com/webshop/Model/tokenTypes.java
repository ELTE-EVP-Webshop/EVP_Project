package com.webshop.Model;

public enum tokenTypes {
	MAIL_CONFIRM(1),
	NEW_PASSWORD(2);
	
	private int type;
	
	private tokenTypes (int type) {
		this.type = type;
	}
}
