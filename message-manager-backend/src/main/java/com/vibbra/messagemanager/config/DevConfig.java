package com.vibbra.messagemanager.config;

import com.vibbra.messagemanager.services.email.EmailService;
import com.vibbra.messagemanager.services.email.SmtpEmailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DevConfig {

    @Bean
    public EmailService emailService() {
        return new SmtpEmailService();
    }

}
