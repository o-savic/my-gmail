package com.vegait.mygmail.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.mygmail.dto.EmailDTO;
import com.vegait.mygmail.model.Email;
import com.vegait.mygmail.service.EmailService;

@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 4800, allowCredentials = "false")
@RestController
@RequestMapping("/api/emails")
public class EmailController {
	
	@Autowired
	EmailService emailService ;
	
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping
	public ResponseEntity<EmailDTO> send(@RequestBody EmailDTO dto) {
		Email email = emailService.send(new Email(dto.getSubject(), dto.getText()), dto.getSenderEmail(), dto.getRecipientEmail());
		EmailDTO createdDTO = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(createdDTO, HttpStatus.CREATED); // code 201
	}
	
	@GetMapping("/inbox/{email}")
	public ResponseEntity<List<EmailDTO>> findInbox(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findInbox(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/starred/{email}")
	public ResponseEntity<List<EmailDTO>> findStarred(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findStarred(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/snoozed/{email}")
	public ResponseEntity<List<EmailDTO>> findSnoozed(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findSnoozed(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/sent/{email}")
	public ResponseEntity<List<EmailDTO>> findAllBySender(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findAllBySender(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/all/{email}")
	public ResponseEntity<List<EmailDTO>> findAllByRecipient(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findAllByRecipient(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/spam/{email}")
	public ResponseEntity<List<EmailDTO>> findSpam(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findSpam(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/trash/{email}")
	public ResponseEntity<List<EmailDTO>> findTrash(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findTrash(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteEmail(@PathVariable Long id) {
		emailService.deleteEmail(id);
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT); // code 204
		
	}

}
