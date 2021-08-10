package com.vibbra.messagemanager.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vibbra.messagemanager.dto.EmailDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.IOException;
import java.util.Collections;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles({"test"})
@Ignore
public class EmailControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    private final String contentType = "application/json";

    @Test
    public void test_create_email_should_be_success() throws Exception {
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = MockMvcRequestBuilders.post("/configuration/emails").content(getEmailRequest()).contentType(contentType);
        MvcResult mvcResult = mockMvc.perform(mockHttpServletRequestBuilder).andExpect(MockMvcResultMatchers.status().is2xxSuccessful()).andReturn();
        EmailDTO response = getObject(mvcResult.getResponse().getContentAsString(), EmailDTO.class);
        Assert.assertNotNull(response);
    }

    private String getEmailRequest() {
        return getJson(EmailDTO.builder()
                .serverName("gmail")
                .port("465")
                .login("jugiorgi14@gmail.com")
                .password("32acMCfr")
                .senderName("Julia Martin")
                .senderEmail("juliagiorgimartin@hotmail.com")
                .templates(Collections.singletonList(1L))
                .build());
    }

    public <T> T getObject(String json, Class<T> clazz) {
        try {
            return objectMapper.readValue(json, clazz);
        } catch (IOException e) {
            return null;
        }
    }

    public String getJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
