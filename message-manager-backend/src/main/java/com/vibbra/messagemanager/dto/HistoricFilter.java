package com.vibbra.messagemanager.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class HistoricFilter implements Serializable {
    private static final long serialVersionUID = 1L;

    private LocalDate initialDate;
    private LocalDate finalDate;
    private String channel;
    private String origin;

}
