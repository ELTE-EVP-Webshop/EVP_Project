package com.webshop.services;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.webshop.Model.EmailDetails;

/**
 * EmailService implementációja
 * Service, tartalmazza a JavaMailSender-t
 * Email feladója alapvetően a felhasználónév
 * @author BalazsPC
 *
 */
@Service
public class EmailServiceImpl implements EmailService {

 @Autowired 
 private JavaMailSender javaMailSender;

 @Value("${spring.mail.username}")
 private String sender;

 /**
  * Hagyományos email küldése
  * @param details EmailDetails, az email tartalma
  */
 public String sendSimpleMail(EmailDetails details)
 {
     try {

         SimpleMailMessage mailMessage = new SimpleMailMessage();

         mailMessage.setFrom(sender);
         mailMessage.setTo(details.getRecipient());
         mailMessage.setText(details.getMsgBody());
         mailMessage.setSubject(details.getSubject());
         javaMailSender.send(mailMessage);
         return "Mail Sent Successfully...";
     }

     catch (Exception e) {
         return "Error while Sending Mail";
     }
 }

 /**
  * Email küldése, tartalmazhat csatolmányt 
  * @param details EmailDetails, az email tartalma
  */
 public String sendMailWithAttachment(EmailDetails details)
 {
     MimeMessage mimeMessage = javaMailSender.createMimeMessage();
     MimeMessageHelper mimeMessageHelper;

     try {
         mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
         mimeMessageHelper.setFrom(sender);
         mimeMessageHelper.setTo(details.getRecipient());
         mimeMessageHelper.setText(details.getMsgBody());
         mimeMessageHelper.setSubject(details.getSubject());

         FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

         mimeMessageHelper.addAttachment(file.getFilename(), file);

         javaMailSender.send(mimeMessage);
         return "Mail sent Successfully";
     } catch (MessagingException e) {
         return "Error while sending mail!!!";
     }
 }
 
 /**
  * HTML formátumú email
  * @param details EmailDetails, az email tartalma
  */
 public boolean sendMailInHtmlFormat(EmailDetails details)
 {
	 MimeMessage mimeMessage = javaMailSender.createMimeMessage();
     MimeMessageHelper mimeMessageHelper;

     try {
         mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
         mimeMessageHelper.setFrom(sender);
         mimeMessageHelper.setTo(details.getRecipient());
         mimeMessageHelper.setText(details.getMsgBody(), true);
         mimeMessageHelper.setSubject(details.getSubject());

         javaMailSender.send(mimeMessage);
         return true;
     } catch (MessagingException e) {
    	 System.out.println(e.getMessage());
         return false;
     }
 }
 
 /**
  * HTML formátumú email, tartalmazhat csatolmányt
  * @param details EmailDetails, az email tartalma
  */
 public String sendMailInHtmlFormatWithAttachment(EmailDetails details)
 {
     MimeMessage mimeMessage = javaMailSender.createMimeMessage();
     MimeMessageHelper mimeMessageHelper;

     try {
         mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
         mimeMessageHelper.setFrom(sender);
         mimeMessageHelper.setTo(details.getRecipient());
         mimeMessageHelper.setText(details.getMsgBody(), true);
         mimeMessageHelper.setSubject(details.getSubject());

         FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

         mimeMessageHelper.addAttachment(file.getFilename(), file);

         javaMailSender.send(mimeMessage);
         return "Mail sent Successfully";
     } catch (MessagingException e) {
         return "Error while sending mail!!!";
     }
 }
}