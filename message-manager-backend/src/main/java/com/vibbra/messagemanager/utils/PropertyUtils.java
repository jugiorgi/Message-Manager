package com.vibbra.messagemanager.utils;

import java.io.*;
import java.util.Properties;

public class PropertyUtils {

    public static void configurationToSendEmail(String host, String username, String password, String port) {
        String PATH = "src/main/resources";
        File file = new File(PATH);
        String PROPERTIES = "\\application-dev.properties";
        String absolutePath = file.getAbsolutePath().concat(PROPERTIES);
        Properties properties = new Properties();
        try (OutputStream outputStream = new FileOutputStream(absolutePath)) {
            properties.setProperty("spring.mail.host", buildHost(host));
            properties.setProperty("spring.mail.username", username);
            properties.setProperty("spring.mail.password", password);
            properties.setProperty("spring.mail.properties.mail.smtp.auth", "true");
            properties.setProperty("spring.mail.properties.mail.smtp.socketFactory.port", port);
            properties.setProperty("spring.mail.properties.mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.setProperty("spring.mail.properties.mail.smtp.socketFactory.fallback", "false");
            properties.setProperty("spring.mail.properties.mail.smtp.starttls.enable", "true");
            properties.setProperty("spring.mail.properties.mail.smtp.ssl.enable", "true");
            properties.store(outputStream, null);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String buildHost(String host) {
        String PREFIX = "smtp.";
        String SUFFIX = ".com";
        return PREFIX.concat(host).concat(SUFFIX);
    }

}
