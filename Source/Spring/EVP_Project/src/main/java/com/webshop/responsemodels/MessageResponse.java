package com.webshop.responsemodels;

/**
 * Válasz modell a kérésekre, 1 üzenetet tartalmaz (bővíthető)
 * @author BalazsPC
 *
 */
public class MessageResponse {
	private String message;

	public MessageResponse(String message) {
	    this.message = message;
	  }
	
	
	public MessageResponse() {
	  }
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}