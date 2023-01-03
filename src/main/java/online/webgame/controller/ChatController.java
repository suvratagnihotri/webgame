package online.webgame.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.messaging.handler.annotation.DestinationVariable;
// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.handler.annotation.SendTo;
// import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    // @Autowired
    // private SimpMessagingTemplate messagingTemplate;

    // @MessageMapping("/resume.{username}")
    // @SendTo("/start/initial.{username}")
    // public void chat(String msg, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
    //     System.out.println(msg);
    //     System.out.println("###############################");
    //     messagingTemplate.convertAndSend("/start/initial.Ashish",msg);
    // }

    // @MessageMapping("/adduser.{username}") 
    // @SendTo("/start/initial.{username}")
    // public void addUser(String chatMessage, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
    //     System.out.println(chatMessage);
    //     headerAccessor.getSessionAttributes().put("username",username);
    //     messagingTemplate.convertAndSend("/start/initial."+username,chatMessage);
    // }
}

