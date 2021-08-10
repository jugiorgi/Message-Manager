package com.vibbra.messagemanager.controllers;

import com.vibbra.messagemanager.dto.EmailDTO;
import com.vibbra.messagemanager.services.EmailConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/configuration/emails")
public class EmailController {

    @Autowired
    private EmailConfigurationService service;

    @PostMapping()
    public ResponseEntity<EmailDTO> createEmailConfiguration(@RequestBody EmailDTO dto) {
        EmailDTO email = service.createEmailConfiguration(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(email.getId()).toUri();
        return ResponseEntity.created(uri).body(email);
    }

}
