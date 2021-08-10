package com.vibbra.messagemanager.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class EmailNotificationDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<String> emails;
    private Long templateId;
    private String origin;
    
}
