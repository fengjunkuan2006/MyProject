package com.company.project.service.home;

import com.company.project.common.model.*;
import com.company.project.common.model.home.LoginUser;
import com.company.project.common.model.user.UpdateUser;
import com.company.project.domains.home.entity.UserLog;
import com.company.project.domains.home.entity.User;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
public interface IUserService {
    CommonResultModel verifyCredential(LoginUser loginUser);

    TableResultModel<User> getUserByCondition(TableParamsModel params);

    SingleResultModel<User> getUserById(int userId);

    CommonResultModel updateUserById(int userId, UpdateUser user);

    CommonResultModel addUser(UpdateUser user);

    CommonResultModel deleteUserById(int userId);

    ListResultModel<UserLog> getUserLogByID(int userId);

    void addUserLog(String content);
}