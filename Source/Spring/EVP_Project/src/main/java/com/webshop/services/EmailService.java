package com.webshop.services;

import com.webshop.Model.EmailDetails;

/**
 * Email service interface
 * Tartalmazza az EmailService osztály implementálni kívánt fejléceit
 * @author BalazsPC
 *
 */
public interface EmailService {
	String sendSimpleMail(EmailDetails details);
	String sendMailWithAttachment(EmailDetails details);
	boolean sendMailInHtmlFormat(EmailDetails details);
	public String sendMailInHtmlFormatWithAttachment(EmailDetails details);
}