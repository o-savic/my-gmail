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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	EmailService emailService;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping
	public ResponseEntity<EmailDTO> send(@RequestBody EmailDTO dto) {
		Email email = emailService.send(new Email(dto.getSubject(), dto.getText()), dto.getSenderEmail(),
				dto.getRecipientEmail());
		EmailDTO createdDTO = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(createdDTO, HttpStatus.CREATED); // code 201
	}
	
	@PostMapping("/draft")
	public ResponseEntity<EmailDTO> saveDraft(@RequestBody EmailDTO dto) {
		Email email = emailService.saveDraft(new Email(dto.getSubject(), dto.getText()), dto.getSenderEmail(),
				dto.getRecipientEmail());
		EmailDTO createdDTO = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(createdDTO, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> permanentlyDelete(@PathVariable Long id) {
		emailService.permanentlyDelete(id);
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT); // code 204
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<EmailDTO> getEmail(@PathVariable Long id) {
		Email email = emailService.getEmail(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
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
	
	@GetMapping("/draft/{email}")
	public ResponseEntity<List<EmailDTO>> findDraft(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findDraft(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
			return dto;
		}).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}
	
	@GetMapping("/important/{email}")
	public ResponseEntity<List<EmailDTO>> findImportant(@PathVariable("email") String email) {
		List<Email> emailList = emailService.findImportant(email);
		List<EmailDTO> emailDTOs = emailList.stream().map(cred -> {
			EmailDTO dto = modelMapper.map(cred, EmailDTO.class);
			return dto;
		}).collect(Collectors.toList());

		return new ResponseEntity<List<EmailDTO>>(emailDTOs, HttpStatus.OK);
	}

	@PatchMapping("/delete/{id}")
	public ResponseEntity<EmailDTO> changeDeleted(@PathVariable Long id) {
		Email email = emailService.changeDeleted(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);

	}

	@PatchMapping("/star/{id}")
	public ResponseEntity<EmailDTO> changeStarred(@PathVariable Long id) {
		Email email = emailService.changeStarred(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
	}

	@PatchMapping("/spam/{id}")
	public ResponseEntity<EmailDTO> changeSpam(@PathVariable Long id) {
		Email email = emailService.changeSpam(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
	}

	@PatchMapping("/archive/{id}")
	public ResponseEntity<EmailDTO> changeArchived(@PathVariable Long id) {
		Email email = emailService.changeArchived(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
	}

	@PutMapping("/snooze/{id}")
	public ResponseEntity<EmailDTO> snoozeEmail(@PathVariable Long id, @RequestBody EmailDTO dto) {
		Email email = new Email(dto.getDateSnoozed()); // in dto we only have date for snoozing 
		Email updated = emailService.snoozeEmail(id, email);
		EmailDTO updatedDTO = modelMapper.map(updated, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(updatedDTO, HttpStatus.OK);
	}
	
	@PutMapping("/unsnooze/{id}")
	public ResponseEntity<EmailDTO> unsnoozeEmail(@PathVariable Long id) {
		Email updated = emailService.unSnoozeEmail(id);
		EmailDTO updatedDTO = modelMapper.map(updated, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(updatedDTO, HttpStatus.OK);
	}
	
	@PatchMapping("/read/{id}")
	public ResponseEntity<EmailDTO> changeRead(@PathVariable Long id) {
		Email email = emailService.changeRead(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
	}
	
	@PatchMapping("/important/{id}")
	public ResponseEntity<EmailDTO> changeImportant(@PathVariable Long id) {
		Email email = emailService.changeImportant(id);
		EmailDTO dto = modelMapper.map(email, EmailDTO.class);
		return new ResponseEntity<EmailDTO>(dto, HttpStatus.OK);
	}
	

}
