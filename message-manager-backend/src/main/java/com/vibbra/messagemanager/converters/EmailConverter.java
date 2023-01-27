package com.vibbra.messagemanager.converters;

import com.vibbra.messagemanager.dto.EmailDTO;
import com.vibbra.messagemanager.entities.Email;
import com.vibbra.messagemanager.entities.Template;

import java.util.List;
import java.util.stream.Collectors;

public class EmailConverter {

    public static EmailDTO convertToDto(Email email) {
        List<Long> templates = email.getTemplates().stream().map(Template::getId).collect(Collectors.toList());
        return EmailDTO.builder()
                .id(email.getId())
                .serverName(email.getServerName())
                .port(email.getPort())
                .login(email.getLogin())
                .senderEmail(email.getSenderEmail())
                .senderName(email.getSenderName())
                .templates(templates)
                .build();
    }

    public static Email convertToEntity(EmailDTO dto, List<Template> templates) {
        Email email = new Email();
        email.setServerName(dto.getServerName());
        email.setPort(dto.getPort());
        email.setLogin(dto.getLogin());
        email.setPassword(dto.getPassword());
        email.setSenderEmail(dto.getSenderEmail());
        email.setSenderName(dto.getSenderName());
        email.setTemplates(templates);
        return email;
    }
}
