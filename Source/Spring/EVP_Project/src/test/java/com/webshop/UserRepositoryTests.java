package com.webshop;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
public class UserRepositoryTests {
	
	@Autowired
	private UserRepository repo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private ProductVariationsRepository productVariationsRepo;
	@Autowired
	private ProductImagesRepository productImagesRepo;
	@Autowired
	private ProductCategoryRepository productCategoryRepo;
	@Test
	public void testMerfoldTeszt() {
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
		Optional<Product> p = productRepo.findById((long)2);
		assertThat(p).isNotEqualTo(null);
		if(p != null) {
			Product pd = p.get();
			assertEquals(pd.getName(), "Kakaós tekercs");
			assertEquals(pd.getDescription(), "Ezt eszi a yeti.");
			assertEquals(pd.getPrice(), 350);
			assertEquals(pd.getSale_price(), 350);
			assertEquals(pd.getStock(), 50);
			assertEquals(pd.isVisible(), true);
		}
		p = null;
		p = productRepo.findById((long)7);
		if(p != null) {
			Product pd = p.get();
			assertEquals(pd.getName(), "Nagyi tortája");
			assertEquals(pd.getDescription(), "Fincsi!");
			assertEquals(pd.getPrice(), 5000);
			assertEquals(pd.getSale_price(), 5000);
			assertEquals(pd.getStock(), 0);
			assertEquals(pd.isVisible(), true);
			ProductResponseModel m = new ProductResponseModel(pd);
			m.setImages(productImagesRepo.findAllByProductid(pd.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(pd.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(pd.getId()));
			assertEquals(m.getImages().get(0).getImage_url(), "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqb-bKxiVQFE9_R6Z3_JLGMc3W-IuIjfeQNwbJMpKUfJyjLuWlZZJmSY-_50ok8i-5B4&usqp=CAU");
			assertEquals(m.getImages().get(0).getPriority(), 2);
			assertEquals(m.getImages().get(1).getImage_url(), "https://www.tortasziget.hu/pages/tortasziget/contents/gallery/17/5687/525908_pic_600x500.jpg");
			assertEquals(m.getImages().get(1).getPriority(), 1);
			assertEquals(m.getP(), pd);
		}
		List<Product> pd = productRepo.findAll();
		assertEquals(pd.size(), 7);
	}
}
