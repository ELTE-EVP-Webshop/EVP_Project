package com.webshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring applikáció main class
 * @author BalazsPC
 *
 */
@SpringBootApplication
public class EvpProjectApplication{
	/**
	 * Spring app main függvény, belépési pont
	 * @param args indisítási paraméterek (nincs)
	 */
	public static void main(String[] args) {
		SpringApplication.run(EvpProjectApplication.class, args);
	}
	
	/**
	 * CORS konfigurálás REACT-hoz
	 * @return WebMvcConfigurer, a konfigurált példány. 
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*");
			}
		};
	}
}
