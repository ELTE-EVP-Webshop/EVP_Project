package com.webshop.services;

import com.webshop.Model.EmailDetails;

public interface EmailService {
	String sendSimpleMail(EmailDetails details);
	String sendMailWithAttachment(EmailDetails details);
	boolean sendMailInHtmlFormat(EmailDetails details);
}