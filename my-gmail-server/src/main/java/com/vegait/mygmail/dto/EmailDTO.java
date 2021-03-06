package com.vegait.mygmail.dto;

import java.time.LocalDate;

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

	private String subject;
	private String senderEmail;
	private String recipientEmail;
	private String text;
	private LocalDate date;
	private LocalDate dateSnoozed;

	private Boolean deleted = false;
	private Boolean starred = false;
	private Boolean snoozed = false;
	private Boolean spam = false;
	private Boolean archived = false;
	private Boolean isRead = false;
	private Boolean draft = false;
	private Boolean important = false;

}
