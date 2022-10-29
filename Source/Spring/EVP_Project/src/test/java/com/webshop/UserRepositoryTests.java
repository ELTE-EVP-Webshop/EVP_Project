package com.webshop;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	public void testCreateUser() {
		User user = new User();
		user.setUsername("Admin");
		user.setEmail("tesz@teszt.teszt");
		user.setCity("Sopron");
		user.setCountry("Magyarország");
		user.setCountry_1("Győr-Moson-Sopron");
		user.setGender(1);
		user.setHouseNumber("1/A");
		user.setMailConfirmed(true);
		user.setPassword("tesz1234");
		user.setPhone("123456789");
		user.setPostCode(9400);
		user.setPostOther("Nincs");
		user.setStreet("Lehár Ferenc");
		
		User savedUser = repo.save(user);
		
		User existUser = entityManager.find(User.class, savedUser.getId());
		
		assertThat(existUser.getEmail()).isEqualTo(user.getEmail());
	}
	
}
