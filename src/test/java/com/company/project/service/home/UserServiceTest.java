package com.company.project.service.home;

import com.company.project.common.constant.ResultCodes;
import com.company.project.common.model.CommonResultModel;
import com.company.project.common.model.home.LoginUser;
import com.company.project.domains.home.UserMapper;
import com.company.project.domains.home.entity.User;
import com.company.project.service.AbstractTestContext;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletContext;
import java.util.List;

/**
 * Created by Viki.Feng on 02/02/2016.
 */
public class UserServiceTest extends AbstractTestContext {
    @Autowired
    IUserService userService;
    @Autowired
    ServletContext context;

    @Test
    public void getUserByName() {
        CommonResultModel result = userService.verifyCredential(new LoginUser("admin", "123456"));

        Assert.assertTrue(result.getCode() == ResultCodes.SUCCESS);
    }

}