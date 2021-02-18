INSERT INTO my_gmail.user(id, first_name, last_name, email, username, password)
	VALUES (1, 'Olga', 'Savic', 'o.savic@vegait.rs', 'o.savic', '$2y$12$vyfIS6FPZ2kVoBOiwRUK1esxkiqD540VL/g25Qjog.SeI/Mx4drrO');
INSERT INTO my_gmail.user(id, first_name, last_name, email, username, password)
	VALUES (2, 'Nemanja', 'Vujovic', 'n.vujovic@vegait.rs', 'n.vujovic', '$2y$12$vyfIS6FPZ2kVoBOiwRUK1esxkiqD540VL/g25Qjog.SeI/Mx4drrO');
INSERT INTO my_gmail.user(id, first_name, last_name, email, username, password)
	VALUES (3, 'Dragan', 'Borkovac', 'd.borkovac@vegait.rs', 'd.borkovac', '$2y$12$vyfIS6FPZ2kVoBOiwRUK1esxkiqD540VL/g25Qjog.SeI/Mx4drrO');
INSERT INTO my_gmail.user(id, first_name, last_name, email, username, password)
	VALUES (4, 'Petar', 'Savic', 'psavic021@gmail.com', 'psavic021', '$2y$12$vyfIS6FPZ2kVoBOiwRUK1esxkiqD540VL/g25Qjog.SeI/Mx4drrO');	
	
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(1, 'First email', 'This is the content of the first email.', 1, 2, false, false, false, false, false, false, false, '2021-02-14');
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(2, 'Deleted email', 'This is the content of the deleted email.', 1, 2, true, false, false, false, false, true, false, '2021-02-14');	
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(3, 'Starred email', 'This is the content of the starred email.', 1, 2, false, true, false, false, false, true, false, '2021-02-14');	
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date, date_snoozed)	
	VALUES(4, 'Snoozed email', 'This is the content of the snoozed email.', 1, 2, false, false, true, false, false, true, false, '2021-02-14', '2020-03-01');
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(5, 'Spam email', 'This is the content of the spam email.', 1, 2, false, false, false, true, false, true, false, '2021-02-14');	
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(6, 'Archived email', 'This is the content of the archived email.', 1, 2, false, false, false, false, true, true, false, '2021-02-14');
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(7, 'Email Petar - Olga', 'This is the content of the email sent from Petar to Olga.', 4, 1, false, false, false, false, false, false, false, '2021-02-14');
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(8, 'Email Petar - Nemanja', 'This is the content of the email sent from Petar to Nemanja.', 4, 2, false, false, false, false, false, false, false, '2021-02-14');
INSERT INTO my_gmail.email(id, subject, text, sender_id, recipient_id, deleted, starred, snoozed, spam, archived, is_read, draft, date)	
	VALUES(9, 'Email Petar - Dragan', 'This is the content of the email sent from Petar to Dragan.', 4, 3, false, false, false, false, false, false, false, '2021-02-14');