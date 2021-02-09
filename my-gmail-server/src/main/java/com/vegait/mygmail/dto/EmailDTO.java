package com.vegait.mygmail.dto;

import com.vegait.mygmail.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailDTO {
	
	private Long id;
	
	private String subject ;
	private String senderEmail ;
	private String recipientEmail ;
	
	/*
	private List<User> recipients;
	*/
	
	private String text ;
	
	private Boolean deleted = false ;
	private Boolean starred = false ;
	private Boolean snoozed = false ;
	private Boolean spam = false ;
	private Boolean archived = false;
	

}
