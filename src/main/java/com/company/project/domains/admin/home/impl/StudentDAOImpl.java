package com.company.project.domains.admin.home.impl;

import com.company.project.domains.admin.home.IStudentDAO;
import com.company.project.domains.admin.home.entity.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Viki.Feng on 10/03/2016.
 */
@Service
public class StudentDAOImpl implements IStudentDAO {
    @Resource
    public SessionFactory sessionFactory;

    public Session getSession() {
        return sessionFactory.openSession();
    }

    public Student selectStudentById(int studentId) {
        org.hibernate.Criteria criteria = getSession().createCriteria(Student.class);
        Student student = new Student();
        student.setId(1);
        criteria.add(Example.create(student));

        return (Student) criteria.list().get(0);
    }
}
