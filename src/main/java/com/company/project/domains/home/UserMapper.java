package com.company.project.domains.home;

import com.company.project.common.model.TableParamsModel;
import com.company.project.common.model.user.UpdateUser;
import com.company.project.domains.home.entity.User;

import java.util.List;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
public interface UserMapper {
    List<User> selectUserByName(String name);

    List<User> selectUserByConditionPaged(TableParamsModel params);

    int countUserByCondition(TableParamsModel params);

    User selectUserById(int userId);

    int updateUserById(User user);

    int addUser(UpdateUser user);

    int deleteUserById(int userId);
}
