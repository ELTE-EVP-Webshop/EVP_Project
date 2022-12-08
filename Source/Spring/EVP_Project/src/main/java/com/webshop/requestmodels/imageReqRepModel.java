package com.webshop.requestmodels;

/**
 * ProductReqRep modellhez készült képleíró modell
 * @author BalazsPC
 *
 */
public class imageReqRepModel {
	private String url;
	private byte priority;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public byte getPriority() {
		return priority;
	}
	public void setPriority(byte priority) {
		this.priority = priority;
	}
	
	
}
