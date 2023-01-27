package com.vibbra.messagemanager.services;

import com.vibbra.messagemanager.converters.TemplateConverter;
import com.vibbra.messagemanager.dto.TemplateDTO;
import com.vibbra.messagemanager.entities.Email;
import com.vibbra.messagemanager.entities.Template;
import com.vibbra.messagemanager.repositories.EmailRepository;
import com.vibbra.messagemanager.repositories.TemplateRepository;
import com.vibbra.messagemanager.services.exceptions.ControllerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TemplateService {

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private EmailConfigurationService emailConfigurationService;

    @Transactional
    public TemplateDTO findById(Long id) {
        Optional<Template> template = templateRepository.findById(id);
        return TemplateConverter.convertToDto(template.orElseThrow(() -> new ControllerNotFoundException("Template not found")));
    }

    @Transactional
    public TemplateDTO createTemplate(MultipartFile file) throws Exception {
        InputStream inputStream = new ByteArrayInputStream(file.getBytes());
        String templateMessage = readTemplateFile(inputStream);
        Template template = templateRepository.save(templateFromDTO(templateMessage));
        return TemplateDTO.builder().id(template.getId()).template(template.getText()).build();
    }

    @Transactional
    public List<TemplateDTO> findAllTemplatesByConfigurationId(Long configurationId) {
        List<TemplateDTO> list = new ArrayList<>();

        Optional<Email> email = emailRepository.findById(configurationId);

        if (!email.isPresent()) {
            throw new ControllerNotFoundException("E-mail Not Found");
        }

        List<Template> templates = templateRepository.findAllByConfiguration(email.get());

        if (templates.isEmpty()) {
            throw new ControllerNotFoundException("Template not found");
        }

        templates.forEach(template -> {
            list.add(TemplateConverter.convertToDto(template));
        });

        return list;
    }

    @Transactional
    public List<Template> findAllTemplatesById(List<Long> ids) {
        List<Template> templates = new ArrayList<>();
        ids.forEach(id -> {
                    Optional<Template> template = templateRepository.findById(id);
                    template.ifPresent(templates::add);
                }
        );

        return templates;
    }

    private String readTemplateFile(InputStream template) {
        return new BufferedReader(new InputStreamReader(template,
                StandardCharsets.UTF_8)).lines().collect(Collectors.joining());
    }

    public Template templateFromDTO(String message) {
        Template template = new Template();
        template.setText(message);
        return template;
    }
}
