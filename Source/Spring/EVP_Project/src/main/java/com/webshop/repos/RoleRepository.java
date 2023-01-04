package com.webshop.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webshop.Model.ERole;
import com.webshop.dbModels.Role;

/**
 * roles adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
