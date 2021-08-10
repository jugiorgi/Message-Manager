package com.vibbra.messagemanager.converters;

import com.vibbra.messagemanager.dto.TemplateDTO;
import com.vibbra.messagemanager.entities.Template;

public class TemplateConverter {

    public static TemplateDTO convertToDto(Template template) {
        return TemplateDTO.builder()
                .id(template.getId())
                .template(template.getText())
                .build();
    }

    public static Template convertToEntity(TemplateDTO templateDTO) {
        Template template = new Template();
        template.setText(templateDTO.getTemplate());
        return template;
    }
}
