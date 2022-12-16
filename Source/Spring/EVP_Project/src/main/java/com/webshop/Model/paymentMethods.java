package com.webshop.Model;

import java.util.Optional;

import io.jsonwebtoken.lang.Arrays;

public enum paymentMethods {
	BANKI_UTALAS((short)1),
	KP_UTANVET((short)2),
	KARTYAS_UTANVET((short)3);
	
	private short type;

	paymentMethods (short type) {
        this.type = type;
    }
	
	public static boolean isValidPaymentMethod(short value) {
		if(value >= 1 && value <= 3) {
			return true;
		}
		return false;
	}
}
