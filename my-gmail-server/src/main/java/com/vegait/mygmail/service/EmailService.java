package com.vegait.mygmail.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegait.mygmail.exception.BadRequestException;
import com.vegait.mygmail.model.Email;
import com.vegait.mygmail.model.User;
import com.vegait.mygmail.repository.EmailRepository;
import com.vegait.mygmail.repository.UserRepository;

@Service
public class EmailService {

	@Autowired
	EmailRepository emailRepository;

	@Autowired
	UserRepository userRepository;

	public Email send(Email email, String senderEmail, String recipientEmail) {
		User sender = userRepository.findByEmail(senderEmail);
		User recipient = userRepository.findByEmail(recipientEmail);
		email.setSender(sender);
		email.setRecipient(recipient);
		email.setDate(LocalDate.now());
		save(email);
		return email;
	}

	public Email saveDraft(Email email, String senderEmail, String recipientEmail) {
		User sender = userRepository.findByEmail(senderEmail);
		User recipient = userRepository.findByEmail(recipientEmail);
		email.setSender(sender);
		email.setRecipient(recipient);
		email.setDate(LocalDate.now());
		email.setDraft(true);
		save(email);
		return email;
	}

	public void permanentlyDelete(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null) {
			throw new BadRequestException("Email is not found, so it cannot be deleted.");
		}
		emailRepository.permanentlyDelete(id);
	}

	public Email getEmail(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null) {
			throw new BadRequestException("Email is not found!");
		}
		return email;
	}

	// Inbox
	public List<Email> findInbox(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findInbox(user.getId());
	}

	// Starred
	public List<Email> findStarred(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findStarred(user.getId());
	}

	// Snoozed
	public List<Email> findSnoozed(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findSnoozed(user.getId());
	}

	// Sent
	public List<Email> findAllBySender(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findBySender(user.getId());
	}

	// All mail
	public List<Email> findAllByRecipient(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findByRecipient(user.getId());
	}

	// Spam
	public List<Email> findSpam(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findSpam(user.getId());
	}

	// Trash
	public List<Email> findTrash(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findTrash(user.getId());
	}

	// Draft
	public List<Email> findDraft(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findDraft(user.getId());
	}

	// Important
	public List<Email> findImportant(String email) {
		User user = userRepository.findByEmail(email);
		return emailRepository.findImportant(user.getId());
	}

	// helper method
	public void save(Email email) {
		emailRepository.save(email);
	}

	public Email changeDeleted(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null) {
			throw new BadRequestException("Email cannot be (un)deleted.");
		}
		email.setDeleted(!email.getDeleted());
		save(email);
		return email;
	}

	public Email changeStarred(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted() || email.getSpam()) {
			throw new BadRequestException("Email cannot be (un)starred.");
		}
		email.setStarred(!email.getStarred());
		save(email);
		return email;
	}

	public Email changeSpam(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted()) {
			throw new BadRequestException("Email cannot be (un)spam.");
		}
		email.setSpam(!email.getSpam());
		save(email);
		return email;
	}

	public Email changeArchived(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted() || email.getSpam()) {
			throw new BadRequestException("Email cannot be (un)archived.");
		}
		email.setArchived(!email.getArchived());
		save(email);
		return email;
	}

	public Email snoozeEmail(Long id, Email e) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted() || email.getSpam()) {
			throw new BadRequestException("Email cannot be snoozed.");
		}
		email.setDateSnoozed(e.getDateSnoozed());
		email.setSnoozed(true);
		save(email);
		return email;
	}

	public Email unSnoozeEmail(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted() || email.getSpam()) {
			throw new BadRequestException("Email cannot be unsnoozed.");
		}
		email.setDateSnoozed(null);
		email.setSnoozed(false);
		save(email);
		return email;
	}

	public Email changeRead(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null) {
			throw new BadRequestException("Email cannot be (un)read.");
		}
		email.setIsRead(!email.getIsRead());
		save(email);
		return email;
	}

	public Email changeImportant(Long id) {
		Email email = emailRepository.getOne(id);
		if (email == null || email.getDeleted() || email.getSpam()) {
			throw new BadRequestException("Email cannot be (un)important.");
		}
		email.setImportant(!email.getImportant());
		save(email);
		return email;
	}

}
