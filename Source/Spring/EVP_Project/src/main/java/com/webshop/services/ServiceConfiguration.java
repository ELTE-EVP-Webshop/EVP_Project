package com.webshop.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * Config osztály
 * @author BalazsPC
 *
 */
@Configuration
public class ServiceConfiguration {

	/**
	 * Ez a fos alapból nem tudott dátumot alakítani, szóval játszani kellett vele kicsit :)
	 * @return A javított (működő) ObjectMapper, ami tud dátumot is alakítani
	 */
    @Bean
    public ObjectMapper getJacksonObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(
            com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
            false
        );
        return objectMapper;
    }
}