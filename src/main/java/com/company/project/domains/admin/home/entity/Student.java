package com.company.project.domains.admin.home.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Viki.Feng on 2016/5/26.
 */
@Entity
@Table(name = "Student")
public class Student {
    @Id
    @GeneratedValue
    private int id;

    private String username;

    private int age;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
