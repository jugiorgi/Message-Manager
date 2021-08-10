package com.vibbra.messagemanager.specification;

import com.querydsl.core.BooleanBuilder;
import com.vibbra.messagemanager.dto.HistoricFilter;
import com.vibbra.messagemanager.entities.QNotification;

import java.time.ZoneId;
import java.util.Objects;

public class HistoricSpecifications {

    public static BooleanBuilder createQuery(HistoricFilter historicFilter) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (Objects.nonNull(historicFilter.getChannel()) && !historicFilter.getChannel().isEmpty()) {
            booleanBuilder.and(QNotification.notification.channel.equalsIgnoreCase(historicFilter.getChannel()));
        }

        if (Objects.nonNull(historicFilter.getOrigin()) && !historicFilter.getOrigin().isEmpty()) {
            booleanBuilder.and(QNotification.notification.origin.equalsIgnoreCase(historicFilter.getOrigin()));
        }

        if (Objects.nonNull(historicFilter.getInitialDate()) && historicFilter.getInitialDate() != null) {
            booleanBuilder.and(QNotification.notification.createdAt.after(historicFilter.getInitialDate().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        }

        if (Objects.nonNull(historicFilter.getFinalDate()) && historicFilter.getFinalDate() != null) {
            booleanBuilder.and(QNotification.notification.createdAt.before(historicFilter.getFinalDate().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        }

        return booleanBuilder;
    }
}
