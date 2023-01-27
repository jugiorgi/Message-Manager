package com.vibbra.messagemanager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "tb_email_configuration")
@EqualsAndHashCode
@Data
public class Email implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String serverName;

    private String port;

    private String login;

    @Column(columnDefinition = "TEXT")
    private String password;

    private String senderName;

    private String senderEmail;

    @JsonIgnore
    @OneToMany(mappedBy="configuration")
    private List<Template> templates;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createdAt;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant updatedAt;

    @PrePersist
    public void preCreate() {
        createdAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

    public Email(){
    }
}
