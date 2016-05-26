package com.company.project.service.admin.home;

import com.company.project.common.model.SingleResultModel;
import com.company.project.domains.admin.home.entity.Student;

/**
 * Created by Viki.Feng on 01/02/2016.
 */
public interface IStudentService {
    SingleResultModel<Student> getStudentById(int studentId);
}