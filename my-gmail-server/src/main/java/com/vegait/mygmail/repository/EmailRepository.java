package com.vegait.mygmail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.vegait.mygmail.model.Email;

public interface EmailRepository extends JpaRepository<Email, Long> {

	@Query(value = "SELECT * FROM email AS e WHERE e.sender_id = :userId AND e.draft = FALSE AND e.deleted = FALSE", nativeQuery = true)
	public List<Email> findBySender(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = FALSE AND e.draft = FALSE AND e.spam = FALSE", nativeQuery = true)
	public List<Email> findByRecipient(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE e.recipient_id = :userId AND e.deleted = FALSE AND e.archived = FALSE AND e.spam = FALSE AND e.snoozed = FALSE AND e.draft = FALSE", nativeQuery = true)
	public List<Email> findInbox(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = FALSE AND e.spam = FALSE AND e.starred = TRUE", nativeQuery = true)
	public List<Email> findStarred(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = FALSE AND e.spam = FALSE AND e.snoozed = TRUE", nativeQuery = true)
	public List<Email> findSnoozed(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = FALSE AND e.spam = TRUE", nativeQuery = true)
	public List<Email> findSpam(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = TRUE", nativeQuery = true)
	public List<Email> findTrash(Long userId);

	@Query(value = "SELECT * FROM email AS e WHERE e.sender_id = :userId AND e.deleted = FALSE AND e.draft = TRUE", nativeQuery = true)
	public List<Email> findDraft(Long userId);
	
	@Query(value = "SELECT * FROM email AS e WHERE (e.recipient_id = :userId OR e.sender_id = :userId) AND e.deleted = FALSE AND e.spam = FALSE AND e.important = TRUE", nativeQuery = true)
	public List<Email> findImportant(Long userId);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM email AS e WHERE e.id = :emailId", nativeQuery = true)
	public void permanentlyDelete(Long emailId); // only sender should be able to delete an email

}
