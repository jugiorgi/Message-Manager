package com.vibbra.messagemanager.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class TemplateDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String template;
}
