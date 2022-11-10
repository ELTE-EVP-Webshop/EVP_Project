package com.webshop;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class MainTest {
	
	@Autowired
	private UserRepository repo;
	@Autowired
	private ProductRepository productRepo;
	
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
	
	@Test
	public void testMethod() {
		/*List<ProductResponseModel> list = new ArrayList<>();
		for(Product p :productRepo.findAll()) {
			ProductResponseModel m = new ProductResponseModel(p);
			//m.setImages(productImagesRepo.findByproduct_id(p.getId()));
			list.add(m);
		}
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			
		}*/
	}
	
}
