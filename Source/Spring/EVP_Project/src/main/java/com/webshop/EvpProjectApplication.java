package com.webshop;

import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring applikáció main függvény
 * @author BalazsPC
 *
 */
@SpringBootApplication
public class EvpProjectApplication{
	public static void main(String[] args) {
		SpringApplication.run(EvpProjectApplication.class, args);
	}
	
	/**
	 * CORS konfigurálás REACT-hoz
	 * @return
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/productsListing").allowedOrigins("http://localhost:3000");
			}
		};
	}

}
