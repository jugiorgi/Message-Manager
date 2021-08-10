package com.vibbra.messagemanager.services;

import com.vibbra.messagemanager.converters.EmailConverter;
import com.vibbra.messagemanager.dto.EmailDTO;
import com.vibbra.messagemanager.entities.Email;
import com.vibbra.messagemanager.entities.Template;
import com.vibbra.messagemanager.repositories.EmailRepository;
import com.vibbra.messagemanager.repositories.TemplateRepository;
import com.vibbra.messagemanager.services.email.EmailService;
import com.vibbra.messagemanager.services.exceptions.ControllerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class EmailConfigurationService {

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TemplateService templateService;

    @Transactional
    public EmailDTO findById(Long id) {
        Optional<Email> entity = emailRepository.findById(id);
        return EmailConverter.convertToDto(entity.orElseThrow(() -> new ControllerNotFoundException("E-mail not found")));
    }

    @Transactional
    public EmailDTO createEmailConfiguration(EmailDTO dto) {
        List<Template> templateList = templateService.findAllTemplatesById(dto.getTemplates());
        if (templateList.isEmpty()) {
            throw new ControllerNotFoundException("Template Not Found");
        }
        Email email = EmailConverter.convertToEntity(dto, templateList);
        email = emailRepository.save(email);
        Email finalEmail = email;
        dto.getTemplates().forEach(template -> {
            Optional<Template> t = templateRepository.findById(template);
            if (t.isPresent()) {
                t.get().setConfiguration(finalEmail);
                templateRepository.save(t.get());
            }
        });
        return EmailConverter.convertToDto(email);
    }

}
