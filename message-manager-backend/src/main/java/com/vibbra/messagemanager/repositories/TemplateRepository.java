package com.vibbra.messagemanager.repositories;

import com.vibbra.messagemanager.entities.Email;
import com.vibbra.messagemanager.entities.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    List<Template> findAllByConfiguration(Email configuration);

}
