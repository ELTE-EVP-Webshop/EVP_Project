package com.webshop.Model;

/**
 * Szállítási mód enum
 * @author BalazsPC
 *
 */
public enum deliveryMethods {
	ATVET_UZLETBEN((short)0),
	ATVETEL_POSTA((short)1),
	FUTAR_GLS((short)2),
	FUTAR_DPD((short)3),
	FUTAR_POSTA((short)4),
	FOXPOST((short)5),
	PICKPACK_PONT((short)6);
	
	private short type;

	deliveryMethods (short type) {
        this.type = type;
    }
	
	public static boolean isValidDeliveryMethod(short value) {
		if(value >= 1 && value <= 6) {
			return true;
		}
		return false;
	}
}
