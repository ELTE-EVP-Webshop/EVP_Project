package com.webshop;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * roles adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
