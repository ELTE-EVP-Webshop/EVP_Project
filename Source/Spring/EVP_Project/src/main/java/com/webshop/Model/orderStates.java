package com.webshop.Model;

/**
 * Rendelés státusza enum
 * @author BalazsPC
 *
 */
public enum orderStates {
	MEGRENDELVE((byte)0),
	FELDOLGOZVA((byte)1),
	CSOMAGOLVA((byte)2),
	ATADVA_FUTARNAK((byte)3),
	KEZBESITVE((byte)4);
	
	byte state;
	
	orderStates(byte state) {
		this.state = state;
	}

	public static boolean isValidOrderState(short value) {
		if(value >= 0 && value <= 4) {
			return true;
		}
		return false;
	}
}
