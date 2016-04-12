package com.company.project.domains.admin.home.entity;

import java.util.Date;

/**
 * Created by Viki.Feng on 10/03/2016.
 */
public class UserLog {
    private String id;
    private User user;
    private String content;
    private Date logTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getLogTime() {
        return logTime;
    }

    public void setLogTime(Date logTime) {
        this.logTime = logTime;
    }
}
