package com.vibbra.messagemanager.services.email;

import javax.mail.internet.MimeMessage;

public interface EmailService {

    void sendOrderConfirmationHtmlEmail(String email, String template, String sender);

    void sendHtmlEmail(MimeMessage msg);
}
