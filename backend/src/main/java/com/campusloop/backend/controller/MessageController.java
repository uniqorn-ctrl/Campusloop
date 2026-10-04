package com.campusloop.backend.controller;

import com.campusloop.backend.entity.Message;
import com.campusloop.backend.repository.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(
            MessageRepository messageRepository) {

        this.messageRepository = messageRepository;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestBody Message message) {

        Message savedMessage =
                messageRepository.save(message);

        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping
    public ResponseEntity<List<Message>> getMessages(
            @RequestParam String email) {

        List<Message> messages =
                messageRepository
                        .findBySenderEmailOrReceiverEmailOrderBySentAtAsc(
                                email,
                                email
                        );

        return ResponseEntity.ok(messages);
    }
}
