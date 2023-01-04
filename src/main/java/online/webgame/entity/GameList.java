package online.webgame.entity;

import java.util.HashMap;
import java.util.Map;

public class GameList {
    private Map<String,GameData> games = new HashMap<String,GameData>();
    // GameData gameData = new GameData("123456", "suvrat", "ashish");
    // public GameList(){
    //     this.games.put(gameData.getGameId(), gameData);
    //     this.games.put(gameData.getGameId()+"1", gameData);

    // }
    public Map<String, GameData> getGames() {
        try{
            if(games==null){
                return null;
            }
            // games.forEach((k, v) -> {if(v.getPlayer2().length()>2){games.remove(k);}});
            for(Map.Entry<String,GameData> entry:games.entrySet()){
                if(entry.getValue().getPlayer2().length()>2){
                    games.remove(entry.getKey());
                }
            }
        }
        catch(Exception exception){
            System.out.println(exception.getLocalizedMessage());
            return null;
        }
        
        return games;
    }

    public void setGames(String gameId, GameData gameData) {
        this.games.put(gameId, gameData);
    }
}
