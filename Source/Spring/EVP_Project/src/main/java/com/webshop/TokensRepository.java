package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * tokens adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface TokensRepository extends JpaRepository<Tokens, String> {

}
