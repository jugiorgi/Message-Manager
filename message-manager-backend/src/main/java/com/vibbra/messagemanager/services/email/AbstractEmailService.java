package com.vibbra.messagemanager.services.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

public abstract class AbstractEmailService implements EmailService {

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendOrderConfirmationHtmlEmail(String email, String template, String sender) {
        try {
            MimeMessage mm = prepareMimeMessageFromPedido(email, template, sender);
            sendHtmlEmail(mm);
        } catch (MessagingException e) {
            System.out.println("Error");
        }
    }

    protected MimeMessage prepareMimeMessageFromPedido(String email, String template, String sender) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, true);
        mmh.setTo(email);
        mmh.setFrom(sender);
        mmh.setSentDate(new Date(System.currentTimeMillis()));
        mmh.setText(template, true);
        return mimeMessage;
    }

}
