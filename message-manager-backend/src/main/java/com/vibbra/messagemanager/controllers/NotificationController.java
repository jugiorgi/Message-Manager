package com.vibbra.messagemanager.controllers;

import com.vibbra.messagemanager.dto.EmailNotificationDTO;
import com.vibbra.messagemanager.dto.HistoricFilter;
import com.vibbra.messagemanager.entities.Notification;
import com.vibbra.messagemanager.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/notifications")
public class NotificationController {


    @Autowired
    private NotificationService service;

    @PostMapping(value = "/email")
    public ResponseEntity<EmailNotificationDTO> createEmailNotification(@RequestBody EmailNotificationDTO dto) {
        service.createEmailNotification(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/historic")
    public ResponseEntity<Page<Notification>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "10") Integer linesPerPage,
            @RequestParam(value = "direction", defaultValue = "DESC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "createdAt") String orderBy,
            @RequestBody HistoricFilter dto) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        Page<Notification> list = service.findAllPaged(pageRequest, dto);
        return ResponseEntity.ok().body(list);
    }

}
