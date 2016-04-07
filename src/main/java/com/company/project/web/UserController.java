package com.company.project.web;

import com.company.project.common.model.*;
import com.company.project.common.model.user.UpdateUser;
import com.company.project.domains.home.entity.User;
import com.company.project.domains.home.entity.UserLog;
import com.company.project.service.home.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Viki.Feng on 15/02/2016.
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    IUserService userService;

    /**
     * Display User Page
     *
     * @return
     */
    @RequestMapping("/listPage")
    public String getUserPage() {
        return "user/list";
    }

    /**
     * Get User List
     *
     * @return
     */
    @RequestMapping(value = "/users")
    @ResponseBody
    public TableResultModel<User> getUserList(TableParamsModel params) {
        return userService.getUserByCondition(params);
    }

    /**
     * Get User By Id
     *
     * @param userId User ID
     * @return User Info
     */
    @RequestMapping(value = "/user/{userId}")
    @ResponseBody
    public SingleResultModel<User> getUserById(@PathVariable("userId") int userId) {
        return userService.getUserById(userId);
    }

    /**
     * Update User By ID
     *
     * @param userId User ID
     * @param updateUser User Info
     * @return Operation Result
     */
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.PUT)
    @ResponseBody
    public CommonResultModel updateUserById(@PathVariable("userId") int userId, @RequestBody UpdateUser updateUser) {
        return userService.updateUserById(userId, updateUser);
    }

    /**
     * Add New User
     *
     * @param updateUser User Info
     * @return Operation Result
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public CommonResultModel addUser(@RequestBody UpdateUser updateUser) {
        return userService.addUser(updateUser);
    }

    /**
     * Delete User By ID
     *
     * @param userId User ID
     * @return Operation Result
     */
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE)
    @ResponseBody
    public CommonResultModel deleteUserById(@PathVariable("userId") int userId) {
        return userService.deleteUserById(userId);
    }
}
