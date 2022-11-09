package com.project.robot.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.robot.model.Billing;
import com.project.robot.model.Chart;
import com.project.robot.model.RobotSimulation;
import com.project.robot.model.UserRobot;
import com.project.robot.repository.BillingRepository;

@Service
public class BillingService {

	@Autowired
	BillingRepository repository;

	public List<Billing> getBilling(int userId){
		return repository.getBilling(userId);
	}
	
	public List<Chart> getChart(int userId){
		return repository.getChart(userId);
	}
	
	public boolean payBill(int billId){
		return repository.payBill(billId);
	}
	
	
	
	public List<UserRobot> getRobot(int userId) {
		return repository.getUserRobots(userId);
	}
	
	public List<RobotSimulation> getSimulation(int userId) {
		return repository.getRobotSimulation(userId);
	}
	
	public boolean generateBill(int userId) throws AddressException, MessagingException, IOException, ParseException {
	    boolean status = repository.generateBilling(userId);
	    if(status) {
	    	String userEmail = repository.getEmailFromId(userId);
			System.out.println(userEmail);
			sendMail(userEmail);
	    }
	    else {
	    	System.out.println("No new bill to generate");
	    }
		return status;
		
	}
	
	private void sendMail(String userEmail) throws AddressException, MessagingException, IOException {
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   System.out.println("Sending an email!");
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("billing.disinfectant.robot@gmail.com", "Test123@");
		      }
		   });
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("billing.disinfectant.robot@gmail.com", false));

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userEmail));
		   msg.setSubject("[Robot Cleaner] New Invoice Generated");
		   msg.setContent("A new invoice has been generated. Please check the details at http://3.139.91.146:3000/login", "text/html");
		   msg.setSentDate(new Date());

		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   messageBodyPart.setContent("A new bill has been generated. Please check the details at http://3.139.91.146:3000/login", "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);
		   
		   msg.setContent(multipart);
		   Transport.send(msg);   
		}
}
