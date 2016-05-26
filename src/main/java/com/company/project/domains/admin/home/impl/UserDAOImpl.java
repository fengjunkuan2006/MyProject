package com.company.project.domains.admin.home.impl;

import com.company.project.common.util.Exception.DBException;
import com.company.project.domains.admin.home.IUserDAO;
import com.company.project.domains.admin.home.entity.UserLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Viki.Feng on 10/03/2016.
 */
@Service
public class UserDAOImpl implements IUserDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Select user log by user ID
     *
     * @param userID User ID
     * @return User Log List
     */
    public List<UserLog> selectLogByUserID(int userID) {
        try {
            Query query = new Query(new Criteria("user.userId").is(userID));
            return mongoTemplate.find(query, UserLog.class, "UserLog");
        } catch (Exception ex) {
            throw new DBException(ex);
        }
    }

    /**
     * Insert user log
     *
     * @param userLog User Log
     */
    public void insertUserLog(UserLog userLog) {
        try {
            mongoTemplate.insert(userLog, "UserLog");
        } catch (Exception ex) {
            throw new DBException(ex);
        }
    }
}
