package com.vibbra.messagemanager.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class EmailDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String serverName;
    private String port;
    private String login;
    private String password;
    private String senderName;
    private String senderEmail;
    private List<Long> templates;

}
