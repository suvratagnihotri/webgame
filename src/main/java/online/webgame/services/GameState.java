package online.webgame.services;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class GameState {
    private String vo1;
    private String vo2;
    private String vo3;
    private String vo4;
    private String vo5;
    private String vo6;
    private String vo7;
    private String vo8;
    private String vo9;

    public String checkWinner(JSONObject data){
        this.vo1=data.getString("1");
        this.vo2=data.getString("2");
        this.vo3=data.getString("3");
        this.vo4=data.getString("4");
        this.vo5=data.getString("5");
        this.vo6=data.getString("6");
        this.vo7=data.getString("7");
        this.vo8=data.getString("8");
        this.vo9=data.getString("9");
        System.out.println(vo1.trim().length());
        if(vo1.equals(vo2) && vo2.equals(vo3) && vo3.equals(vo1) && vo1.trim().length()>0){
            return vo1;
        }
        else if(vo4.equals(vo5) && vo5.equals(vo6) && vo6.equals(vo4) && vo4.trim().length()>0){
            return vo4;
        }
        else if(vo7.equals(vo8) && vo8.equals(vo9) && vo9.equals(vo7) && vo7.trim().length()>0){
            return vo7;
        }
        else if(vo1.equals(vo5) && vo5.equals(vo9) && vo9.equals(vo1) && vo1.trim().length()>0){
            return vo1;
        }
        else if(vo3.equals(vo5) && vo5.equals(vo7) && vo7.equals(vo3) && vo3.trim().length()>0){
            return vo3;
        }
        else if(vo1.equals(vo4) && vo4.equals(vo7) && vo7.equals(vo1) && vo1.trim().length()>0){
            return vo1;
        }
        else if (vo2.equals(vo5) && vo5.equals(vo8) && vo8.equals(vo2) && vo2.trim().length()>0){
            return vo2;
        }
        else if(vo3.equals(vo6) && vo6.equals(vo9) && vo9.equals(vo3) && vo3.trim().length()>0){
            return vo3;
        }
        return "none";
    }
}
