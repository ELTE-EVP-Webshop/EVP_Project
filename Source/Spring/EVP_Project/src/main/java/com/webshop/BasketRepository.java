package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<Basket, BasketId> {
	List<Basket> findAllByUserid(long userid);
}
