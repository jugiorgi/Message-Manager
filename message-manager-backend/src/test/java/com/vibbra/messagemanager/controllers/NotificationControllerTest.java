package com.vibbra.messagemanager.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vibbra.messagemanager.dto.EmailDTO;
import com.vibbra.messagemanager.dto.EmailNotificationDTO;
import com.vibbra.messagemanager.dto.HistoricFilter;
import com.vibbra.messagemanager.entities.Notification;
import com.vibbra.messagemanager.entities.enums.Channel;
import com.vibbra.messagemanager.entities.enums.Origin;
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
public class NotificationControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    private final String contentType = "application/json";

    @Test
    public void test_send_email_should_be_success() throws Exception {
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = MockMvcRequestBuilders.post("/notifications/email").content(getNotificationRequest()).contentType(contentType);
        MvcResult mvcResult = mockMvc.perform(mockHttpServletRequestBuilder).andExpect(MockMvcResultMatchers.status().is2xxSuccessful()).andReturn();
        EmailNotificationDTO response = getObject(mvcResult.getResponse().getContentAsString(), EmailNotificationDTO.class);
        Assert.assertNotNull(response);
    }

    @Test
    public void test_list_notification_should_be_success() throws Exception {
        MockHttpServletRequestBuilder mockHttpServletRequestBuilder = MockMvcRequestBuilders.post("/notifications/historic").content(getHistoricRequest()).contentType(contentType);
        MvcResult mvcResult = mockMvc.perform(mockHttpServletRequestBuilder).andExpect(MockMvcResultMatchers.status().is2xxSuccessful()).andReturn();
        Notification response = getObject(mvcResult.getResponse().getContentAsString(), Notification.class);
        Assert.assertNotNull(response);
    }

    private String getNotificationRequest() {
        return getJson(EmailNotificationDTO.builder()
                .emails(Collections.singletonList("juliagiorgimartin@hotmail.com"))
                .origin(Origin.API.name())
                .templateId(1L)
                .build());
    }

    private String getHistoricRequest() {
        return getJson(HistoricFilter.builder()
                .channel(Channel.EMAIL.name())
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
