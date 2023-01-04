package com.webshop.services;

import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.webshop.Model.paymentMethods;
import com.webshop.dbModels.Basket;
import com.webshop.dbModels.Product;
import com.webshop.repos.ProductRepository;

/**
 * PDF létrehozó funkciók
 * @author BalazsPC
 *
 */
@Service
public class pdfService {
	@Autowired
	private ProductRepository productRepo;
	
	/**
	 * Rendeléshez tartozó számla kiállítása
	 * A kiállított számlát a főkönyvtáron belüli receipts mappában találjuk, neve rendeles_"azonosító"_szamla.pdf
	 * @param orderId A rendelés azonosítója (szerepel a számlán is)
	 * @param products List<Basket> a kosárban lévő termékek(Meghíváskor már a rendelésekhez áthelyezve, biztos van mindenből, nem léphet fel hiba, ami miatt nem teljesül a rendelés)
	 * @param userName String, a felhasználó neve (szerepel a számlán)
	 * @param paymentMethod short, Fizetési mód értéke (Szerepel a számlán)
	 * @return boolean, sikeres/sikertelen létrehozás, eltárolás
	 */
	public boolean createReceiptPdf(long orderId, List<Basket> products, String userName, short paymentMethod)
	{
		try {
			//Font típusok
			Font titleFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 24, BaseColor.BLACK);
			Font baseFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, BaseColor.BLACK);
			Font shopNameFont = FontFactory.getFont(FontFactory.TIMES_ITALIC, 12, BaseColor.GRAY);
			Font tableContentFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 12, BaseColor.BLACK);
			Font tableHeaderFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 14, BaseColor.BLACK);
			
			//Doc létrehozása, megnyitása
			Document document = new Document();
			PdfWriter.getInstance(document, new FileOutputStream("receipts/rendeles_"+orderId+"_szamla.pdf"));
			document.open();
			
			//Meta adatok
			document.addTitle("IK Webshop számla");
	        document.addSubject("Számla");
	        //document.addKeywords("");
	        document.addAuthor("IK Webshop Team");
	        document.addCreator("IK Webshop Team");
			
	        //Kezdőlap
			Paragraph p = new Paragraph();
			addEmptyLine(p, 1);
			Paragraph title = new Paragraph("Számla", titleFont);
			title.setAlignment(Element.ALIGN_CENTER);
			p.add(title);
			addEmptyLine(p, 2);
			p.add(new Paragraph("Tisztelt "+userName + "!", baseFont));
			p.add(new Paragraph("A dokumentumban megtalálja a(z) " + orderId + " számú rendeléséhez tartozó számlát.", baseFont));
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			p.add(new Paragraph("Számla kiállításának ideje: "+LocalDateTime.now().format(formatter)));
			p.add(new Paragraph("Kérdés esetén kérjük keressen minket bizalommal a +36 00 1234567 számon, vagy az evpwebshop@gmail.com címen!"));
			addEmptyLine(p, 2);
			p.add(new Paragraph("Köszönjünk megtisztelö rendelését, és szép napot kívánunk:", baseFont));
			p.add(new Paragraph("IK Webshop", shopNameFont));
			document.add(p);
			document.newPage();
			
			//Számla
			
			//Image img = Image.getInstance("ELTEIK.png");
			//document.add(img);
			
			//Számla táblázat
			//Név, Darab, Ár/db, Ár összesen
			PdfPTable table = new PdfPTable(4);
			Stream.of("Termék", "Mennyiség", "Darabár (Ft)", "Összesen(Ft)").forEach(columnTitle -> {
		        PdfPCell header = new PdfPCell();
		        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
		        header.setHorizontalAlignment(Element.ALIGN_CENTER);
		        header.setVerticalAlignment(Element.ALIGN_MIDDLE);
		        header.setBorderWidth(2);
		        Phrase ph = new Phrase(columnTitle, tableHeaderFont);
		        header.setPhrase(ph);
		        header.setMinimumHeight(30);
		        table.addCell(header);
		    });
			long sumPrice = 0;
			for (Basket b : products) {
				Product prod = productRepo.findById(b.getProduct_id()).get();
				Paragraph prodName = new Paragraph(prod.getName(), tableContentFont);
				Paragraph prodCount = new Paragraph(b.getCount()+" db", tableContentFont);
				Paragraph prodPrice = new Paragraph(prod.getPrice()+" Ft", tableContentFont);
				Paragraph prodSumPrice = new Paragraph(prod.getPrice() * b.getCount() + "Ft", tableContentFont);
				PdfPCell c1 = new PdfPCell(prodName);
				c1.setHorizontalAlignment(Element.ALIGN_CENTER);
				c1.setVerticalAlignment(Element.ALIGN_MIDDLE);
				PdfPCell c2 = new PdfPCell(prodCount);
				c2.setHorizontalAlignment(Element.ALIGN_CENTER);
				c2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				PdfPCell c3 = new PdfPCell(prodPrice);
				c3.setHorizontalAlignment(Element.ALIGN_CENTER);
				c3.setVerticalAlignment(Element.ALIGN_MIDDLE);
				PdfPCell c4 = new PdfPCell(prodSumPrice);
				c4.setHorizontalAlignment(Element.ALIGN_CENTER);
				c4.setVerticalAlignment(Element.ALIGN_MIDDLE);
				c1.setMinimumHeight(25);
				c2.setMinimumHeight(25);
				c3.setMinimumHeight(25);
				c4.setMinimumHeight(25);
				table.addCell(c1);
				table.addCell(c2);
				table.addCell(c3);
				table.addCell(c4);
				
				sumPrice+= prod.getPrice() * b.getCount();
			}
			document.add(table);
			
			//Számla összesítő
			document.add(new Paragraph(" "));
			document.add(new Paragraph("Rendelés végösszege: " + sumPrice + "Ft", baseFont));
			document.add(new Paragraph("Választott fizetési mód: " + paymentMethods.getPaymentString(paymentMethod), baseFont));

			document.close();
			return true;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	/**
	 * Üres sor(ok) hozzáadása paragrafushoz
	 * @param p Paragraph, ehhez adunk hozzá üres sort
	 * @param numOfRows int, üres sorok száma
	 */
	private void addEmptyLine(Paragraph p, int numOfRows) {
        for (int i = 0; i < numOfRows; i++) {
            p.add(new Paragraph(" "));
        }
    }
}
