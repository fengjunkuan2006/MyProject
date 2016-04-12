package com.company.project.service.admin.home.impl;

import com.company.project.common.model.CommonResultModel;
import com.company.project.domains.admin.home.IUserDAO;
import com.company.project.domains.admin.home.UserMapper;
import com.company.project.service.admin.home.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    /**
     * Verify Credential
     *
     * @return Verification Result
     */
    public CommonResultModel verifyCredential() {
        CommonResultModel result = new CommonResultModel();
        return result;
    }
}
