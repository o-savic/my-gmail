package com.vegait.mygmail.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Email {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String subject ;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User sender ;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User recipient ;
	
	private String text ;
	
	private Boolean deleted = false ;
	private Boolean starred = false ;
	private Boolean snoozed = false ;
	private Boolean spam = false ;
	private Boolean archived = false;
	private LocalDate date;
	
	public Email(String subject, User sender, User recipient, String text) {
		super();
		this.subject = subject;
		this.sender = sender;
		this.recipient = recipient;
		this.text = text;
	}

	public Email(String subject, String text) {
		super();
		this.subject = subject;
		this.text = text;
	}

	public Email(LocalDate date) {
		super();
		this.date = date;
	}
	
	
	
	
	
	
	

}
