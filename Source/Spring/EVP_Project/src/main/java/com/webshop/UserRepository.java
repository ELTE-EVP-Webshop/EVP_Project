package com.webshop;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * user adatbázis táblához tartozó modell
 * @author BalazsPC
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
}
