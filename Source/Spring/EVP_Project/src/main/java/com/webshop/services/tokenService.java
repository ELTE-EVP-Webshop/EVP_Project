package com.webshop.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webshop.Tokens;
import com.webshop.TokensRepository;

import net.bytebuddy.utility.RandomString;

@Service
public class tokenService {
	
	@Autowired
	private TokensRepository tokensRepo;
	
	//value = userId, Type: 1 email megerősítés, 2 új jelszó
	public String createStaticTypeTokenToken(int userId, byte tokenType) {
		//Már létezik a token?!
		if(tokensRepo.hasStaticTypeToken(userId, tokenType) == 1) {
			Optional<Tokens> t = tokensRepo.findStaticTypeTokenById(userId, tokenType);
			if(!t.isEmpty()) {
				return t.get().getToken();
			}else {
				System.out.println("ERROR: static type token exists but not found: "+userId);
				return null;
			}
		}
		
		//Token gyártás
		String tokenKey = String.format("%s%d%s", RandomString.make(6), userId, UUID.randomUUID().toString().replace("-", ""));
		Tokens t = new Tokens();
		t.setType(tokenType);
		t.setValue(userId);
		t.setToken(tokenKey);
		tokensRepo.save(t);
		return tokenKey;
	}
}
