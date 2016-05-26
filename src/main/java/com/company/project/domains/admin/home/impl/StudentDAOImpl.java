package com.company.project.domains.admin.home.impl;

import com.company.project.domains.admin.home.IStudentDAO;
import com.company.project.domains.admin.home.entity.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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
        criteria.add(Restrictions.eq("age", 12));

        List students = criteria.list();
        if (students.size() > 0) {
            return (Student)students.get(0);
        }

        return null;
    }
}
