package com.webshop;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * tokens adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface TokensRepository extends JpaRepository<Tokens, String> {
	@Query(value = "SELECT EXISTS(SELECT * FROM tokens WHERE type = ?2 AND value = ?1)", nativeQuery = true)
	public int hasStaticTypeToken(long userId, short tokenType);
	
	@Query(value = "SELECT * FROM tokens WHERE type = ?2 AND value = ?1", nativeQuery = true)
	public Optional<Tokens> findStaticTypeTokenById(long userId, short tokenType);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM tokens WHERE type = ?2 AND value = ?1", nativeQuery = true) 
	public int deleteStaticTypeTokenById(long userid, short tokenType);
}
