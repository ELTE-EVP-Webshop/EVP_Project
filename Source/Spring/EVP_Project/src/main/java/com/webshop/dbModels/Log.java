package com.webshop.dbModels;

import java.time.LocalDateTime;

import javax.persistence.Embeddable;
//import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Log adatbázis táblához tartozó JPA modell
 * @author BalazsPC
 *
 */
@Embeddable
@Table(name="log")
public class Log {
	private int log_type;
	private String log_text;
	private LocalDateTime log_date;
	public int getLog_type() {
		return log_type;
	}
	public void setLog_type(int log_type) {
		this.log_type = log_type;
	}
	public String getLog_text() {
		return log_text;
	}
	public void setLog_text(String log_text) {
		this.log_text = log_text;
	}
	public LocalDateTime getLog_date() {
		return log_date;
	}
	public void setLog_date(LocalDateTime log_date) {
		this.log_date = log_date;
	}
	
}
