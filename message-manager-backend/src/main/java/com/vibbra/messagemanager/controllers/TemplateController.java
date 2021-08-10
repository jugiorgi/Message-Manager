package com.vibbra.messagemanager.controllers;

import com.vibbra.messagemanager.dto.TemplateDTO;
import com.vibbra.messagemanager.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/templates")
public class TemplateController {

    @Autowired
    private TemplateService service;

    @PostMapping()
    public ResponseEntity<TemplateDTO> createTemplate(@RequestParam(name = "template") MultipartFile file) throws Exception {
        TemplateDTO dto = service.createTemplate(file);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<List<TemplateDTO>> getAllTemplatesByConfigurationId(@PathVariable String id) {
        List<TemplateDTO> list = service.findAllTemplatesByConfigurationId(Long.parseLong(id));
        return ResponseEntity.ok().body(list);
    }

}
