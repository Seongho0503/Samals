package com.project.samals.repository;

import com.project.samals.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByWalletAddress(String address);
}
