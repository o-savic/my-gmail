package com.vegait.mygmail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegait.mygmail.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	Boolean existsByEmail(String email);
}
