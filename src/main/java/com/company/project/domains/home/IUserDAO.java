package com.company.project.domains.home;

import com.company.project.domains.home.entity.UserLog;

import java.util.List;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
public interface IUserDAO {
    List<UserLog> selectLogByUserID(int userID);

    void insertUserLog(UserLog userLog);
}
