package com.vibbra.messagemanager.services;

import com.vibbra.messagemanager.converters.NotificationConverter;
import com.vibbra.messagemanager.dto.EmailNotificationDTO;
import com.vibbra.messagemanager.dto.HistoricFilter;
import com.vibbra.messagemanager.entities.Notification;
import com.vibbra.messagemanager.entities.Template;
import com.vibbra.messagemanager.entities.enums.Channel;
import com.vibbra.messagemanager.entities.enums.Origin;
import com.vibbra.messagemanager.repositories.NotificationRepository;
import com.vibbra.messagemanager.repositories.TemplateRepository;
import com.vibbra.messagemanager.services.email.EmailService;
import com.vibbra.messagemanager.services.exceptions.ControllerNotFoundException;
import com.vibbra.messagemanager.specification.HistoricSpecifications;
import com.vibbra.messagemanager.utils.PropertyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public void createEmailNotification(EmailNotificationDTO notification) {
        Optional<Template> template = templateRepository.findById(notification.getTemplateId());
        if (!template.isPresent()) {
            throw new ControllerNotFoundException("Template Not Found");
        }

        if (Objects.isNull(template.get().getConfiguration())) {
            throw new ControllerNotFoundException("Configuration Not Found");
        }

        PropertyUtils.configurationToSendEmail(
                template.get().getConfiguration().getServerName(),
                template.get().getConfiguration().getLogin(),
                template.get().getConfiguration().getPassword(),
                template.get().getConfiguration().getPort());

        notification.getEmails().forEach(email -> {
            emailService.sendOrderConfirmationHtmlEmail(email, template.get().getText(), template.get().getConfiguration().getSenderEmail());
        });

        Notification entity = NotificationConverter.convertToEntity(
                Channel.EMAIL,
                Origin.valueOf(notification.getOrigin()),
                template.get().getText());

        notificationRepository.save(entity);
    }

    @Transactional
    public Page<Notification> findAllPaged(Pageable pageRequest, HistoricFilter historic) {
        return notificationRepository.findAll(HistoricSpecifications.createQuery(historic), pageRequest);
    }
}
