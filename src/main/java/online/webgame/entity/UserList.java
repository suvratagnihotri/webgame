package online.webgame.entity;

import java.util.HashMap;
import java.util.Map;

public class UserList {
    private Map<String,User> users = new HashMap<String,User>();

    public Map<String, User> getUsers() {
        return users;
    }

    public void setUsers(String key, User user) {
        this.users.put(key, user);
    }

}
