package online.webgame.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import online.webgame.entity.GameData;
import online.webgame.entity.GameList;
import online.webgame.entity.User;
import online.webgame.entity.UserList;
import online.webgame.services.GameState;

@Controller
public class MainController {
    private UserList userData = new UserList();
    private GameList gameList = new GameList();
    private GameData gameData; 
    @GetMapping("/")
    public String entryPage(Model model){
        model.addAttribute("user", new User());
        return "main";
    }

    @PostMapping("/gamelist")
    public String newUser(Model model,@ModelAttribute(value = "user") User user) throws JsonProcessingException{
        if(user.getUsername()!=null){
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(gameList.getGames());
            System.out.println(json);
            if(json=="null"){
                json="{}";
            }
            model.addAttribute("gamelist",json);
            model.addAttribute("user",user.getUsername());
            userData.setUsers(user.getUsername(), user);
            return "gamelist";
        }
        else{
            return "main";
        }
    }


    @PostMapping("/joinGame")
    @ResponseBody
    public int addToGameList( @RequestBody String jsonpObject){
        System.out.println(jsonpObject);
        return 1;
    }


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private GameState gameState = new GameState();

    @MessageMapping("/resume.{username}")
    @SendTo("/start/initial.{username}")
    public void chat(String msg, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println(msg);
        JSONObject jsonObject = new JSONObject(msg);
        String chatData = jsonObject.getString("chat");
        System.out.println(chatData);
        JSONObject jsonObject2 = new JSONObject(chatData);
        String winner = gameState.checkWinner(jsonObject2);
        String player1 = jsonObject2.getString("player1");
        String player2 = jsonObject2.getString("player2");
        if(winner!="none"){
            JSONObject jsonObject3 = new JSONObject(msg);
            if(winner.toLowerCase().contains("x")){
                System.out.println("Player 2 is winner!");
                messagingTemplate.convertAndSend("/start/initial."+player1,jsonObject3.append("gameresult", "loser").toString());
                messagingTemplate.convertAndSend("/start/initial."+player2,jsonObject.append("gameresult", "winner").toString());

            }
            else if(winner.toLowerCase().contains("o")){
                messagingTemplate.convertAndSend("/start/initial."+player2,jsonObject3.append("gameresult", "loser").toString());
                messagingTemplate.convertAndSend("/start/initial."+player1,jsonObject.append("gameresult", "winner").toString());
            }
        }
        else{
            System.out.println("###############################");
            if(username.equals(player2)){
                messagingTemplate.convertAndSend("/start/initial."+player1,msg);
            }
            else if(username.equals(player1)){
                messagingTemplate.convertAndSend("/start/initial."+player2,msg);
            }
        }
        
    }

    @MessageMapping("/adduser.{username}") 
    @SendTo("/start/initial.{username}")
    public void addUser(String chatMessage, @DestinationVariable String username, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println(chatMessage);
        JSONObject jsonObject = new JSONObject(chatMessage);
        System.out.println(jsonObject.getString("gameId"));
        this.gameData = new GameData();
        this.gameData.setGameId(jsonObject.getString("gameId"));
        this.gameData.setPlayer1(jsonObject.getString("player1"));
        this.gameData.setPlayer2(jsonObject.getString("player2"));
        this.gameList.setGames(this.gameData.getGameId(),this.gameData);
        headerAccessor.getSessionAttributes().put("username",username);
        if(this.gameData.getPlayer2().length()>2){
            messagingTemplate.convertAndSend("/start/initial."+this.gameData.getPlayer1(),chatMessage);
        }
        else{
            messagingTemplate.convertAndSend("/start/initial."+username,chatMessage);
        }
    }
}
