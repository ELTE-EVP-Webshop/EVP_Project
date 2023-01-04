package com.webshop.idModels;

import java.io.Serializable;
import java.util.Objects;

/**
 * Keywords osztályhoz tartozó id osztály
 * @author BalazsPC
 *
 */
@SuppressWarnings("serial")
public class KeywordsId implements Serializable {
	private long product_id;
	private String keyword;
	
	public KeywordsId() {
		
	}
	
	public KeywordsId(long product_id, String keyword) {
        this.product_id = product_id;
        this.keyword = keyword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KeywordsId keywordId = (KeywordsId) o;
        return (this.product_id == keywordId.product_id && this.keyword.equals(keywordId.keyword));
    }

    @Override
    public int hashCode() {
        return Objects.hash(product_id, keyword);
    }
}