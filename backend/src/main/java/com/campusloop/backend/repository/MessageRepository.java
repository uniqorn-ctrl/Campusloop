package com.campusloop.backend.repository;

import com.campusloop.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository
        extends JpaRepository<Message, Long> {

    List<Message> findBySenderEmailOrReceiverEmailOrderBySentAtAsc(
            String senderEmail,
            String receiverEmail
    );
}
