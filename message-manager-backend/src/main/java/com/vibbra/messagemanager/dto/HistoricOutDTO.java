package com.vibbra.messagemanager.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
public class HistoricOutDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private LocalDate date;
    private String channel;
    private String content;

}
