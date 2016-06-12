package com.company.project.service.admin.home.impl;

import com.company.project.common.model.SingleResultModel;
import com.company.project.domains.admin.home.IStudentDAO;
import com.company.project.domains.admin.home.IUserDAO;
import com.company.project.domains.admin.home.entity.Student;
import com.company.project.service.admin.home.IStudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
@Service
public class StudentServiceImpl implements IStudentService {
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    @Autowired
    IStudentDAO studentDAOImpl;

    public SingleResultModel<Student> getStudentById(int studentId) {
        SingleResultModel<Student> result = new SingleResultModel();
        result.setData(studentDAOImpl.selectStudentById(studentId));

        return result;
    }
}
