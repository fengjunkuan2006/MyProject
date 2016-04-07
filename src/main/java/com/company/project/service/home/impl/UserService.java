package com.company.project.service.home.impl;

import com.company.project.common.constant.ResultCodes;
import com.company.project.common.constant.SystemConstants;
import com.company.project.common.constant.home.UserResultCode;
import com.company.project.common.model.*;
import com.company.project.common.model.home.LoginUser;
import com.company.project.common.model.user.UpdateUser;
import com.company.project.common.util.SerializeUtil;
import com.company.project.common.util.SessionUtil;
import com.company.project.domains.home.IUserDAO;
import com.company.project.domains.home.UserMapper;
import com.company.project.domains.home.entity.User;
import com.company.project.domains.home.entity.UserLog;
import com.company.project.service.home.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
@Service
public class UserService implements IUserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserMapper userMapper;
    @Autowired
    IUserDAO userDAO;
    @Autowired
    HttpServletRequest request;

    /**
     * Verify Credential
     *
     * @param loginUser User Credential
     * @return Verification Result
     */
    public CommonResultModel verifyCredential(LoginUser loginUser) {
        CommonResultModel result = new CommonResultModel();
        try {
            List<User> users = userMapper.selectUserByName(loginUser.getUsername());
            if (users != null && users.size() > 0) {
                User user = users.get(0);
                if (loginUser.getPassword().equals(user.getPassword())) {
                    result.setCode(UserResultCode.SUCCESS);

                    //Save user into into Session
                    request.getSession().setAttribute(SystemConstants.USER_SESSION, SerializeUtil.serialize(user));

                    //Add user log
                    addUserLog("User Login");
                } else {
                    result.setCode(UserResultCode.PASSWORD_INVALID);
                }
            } else {
                result.setCode(UserResultCode.ACCOUNT_NOT_EXISTS);
            }
        } catch (Exception e) {
            result.setCode(UserResultCode.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Get User By Condition
     *
     * @param params Table Params
     * @return User List
     */
    public TableResultModel<User> getUserByCondition(TableParamsModel params) {
        TableResultModel<User> result = new TableResultModel<User>();
        try {
            result.setAaData(userMapper.selectUserByConditionPaged(params));
            result.setiTotalRecords(userMapper.countUserByCondition(params));
            result.setiTotalDisplayRecords(result.getiTotalRecords());
            result.setsEcho(params.getsEcho());
            result.setCode(ResultCodes.SUCCESS);
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Get User By ID
     *
     * @param userId User ID
     * @return User Info
     */
    public SingleResultModel<User> getUserById(int userId) {
        SingleResultModel<User> result = new SingleResultModel<User>();
        try {
            result.setData(userMapper.selectUserById(userId));
            result.setCode(ResultCodes.SUCCESS);
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Update User By ID
     *
     * @param userId     User ID
     * @param updateUser User
     * @return
     */
    public CommonResultModel updateUserById(int userId, UpdateUser updateUser) {
        CommonResultModel result = new CommonResultModel();
        try {
            User user = new User();
            user.setUserId(userId);
            user.setUsername(updateUser.getUsername());
            user.setPassword(updateUser.getPassword());
            if (userMapper.updateUserById(user) > 0) {
                result.setCode(ResultCodes.SUCCESS);
            } else {
                result.setCode(ResultCodes.FAIL);
            }
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Add New User
     *
     * @param user User Info
     * @return Operation Result
     */
    public CommonResultModel addUser(UpdateUser user) {
        CommonResultModel result = new CommonResultModel();
        try {
            if (userMapper.addUser(user) > 0) {
                result.setCode(ResultCodes.SUCCESS);
            } else {
                result.setCode(ResultCodes.FAIL);
            }
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Delete User By ID
     *
     * @param userId User ID
     * @return Operation Result
     */
    public CommonResultModel deleteUserById(int userId) {
        CommonResultModel result = new CommonResultModel();
        try {
            if (userMapper.deleteUserById(userId) > 0) {
                result.setCode(ResultCodes.SUCCESS);
            } else {
                result.setCode(ResultCodes.FAIL);
            }
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Get User's Log
     *
     * @param userId User ID
     * @return List Result
     */
    public ListResultModel<UserLog> getUserLogByID(int userId) {
        ListResultModel<UserLog> result = new ListResultModel<UserLog>();
        try {
            result.setData(userDAO.selectLogByUserID(userId));
            result.setCode(ResultCodes.SUCCESS);
        } catch (Exception e) {
            result.setCode(ResultCodes.ERROR);

            logger.error(e.getMessage());
        }

        return result;
    }

    /**
     * Add user log
     *
     * @param content Log Content
     */
    public void addUserLog(String content) {
        try {
            UserLog userLog = new UserLog();
            userLog.setUser(SessionUtil.getSessionUser(request));
            userLog.setContent(content);
            userLog.setLogTime(new Date());
            userDAO.insertUserLog(userLog);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
}
