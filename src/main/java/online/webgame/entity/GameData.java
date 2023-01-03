package online.webgame.entity;


public class GameData {
    public GameData(){}
    public GameData(String gameId, String player1, String player2){
        this.gameId = gameId;
        this.player1 = player1;
        this.player2 = player2;
    }
    private String gameId;
    public String getGameId() {
        return gameId;
    }
    public void setGameId(String gameId) {
        this.gameId = gameId;
    }
    private String player1;
    private String player2;
    private boolean completed;
    public String getPlayer1() {
        return player1;
    }
    public void setPlayer1(String player1) {
        this.player1 = player1;
    }
    public String getPlayer2() {
        return player2;
    }
    public void setPlayer2(String player2) {
        this.player2 = player2;
    }
    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

}
