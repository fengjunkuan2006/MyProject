package com.company.project.common.model;import com.company.project.common.constant.ResultCodes;/** * Created by Viki.Feng on 21/01/2016. */public class CommonResultModel {    private int code;    private String message;    public CommonResultModel() {        this.code = ResultCodes.SUCCESS;        this.message = "SUCCESS";    }    public CommonResultModel(int code, String message) {        this.code = code;        this.message = message;    }    public int getCode() {        return code;    }    public void setCode(int code) {        this.code = code;    }    public String getMessage() {        return message;    }    public void setMessage(String message) {        this.message = message;    }}