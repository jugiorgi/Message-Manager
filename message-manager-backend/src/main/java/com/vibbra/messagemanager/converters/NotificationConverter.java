package com.vibbra.messagemanager.converters;

import com.vibbra.messagemanager.entities.Notification;
import com.vibbra.messagemanager.entities.enums.Channel;
import com.vibbra.messagemanager.entities.enums.Origin;

public class NotificationConverter {

    public static Notification convertToEntity(Channel channel, Origin origin, String content) {
        Notification notification = new Notification();
        notification.setChannel(channel.name());
        notification.setContent(content);
        notification.setOrigin(origin.name());
        return notification;
    }
}
