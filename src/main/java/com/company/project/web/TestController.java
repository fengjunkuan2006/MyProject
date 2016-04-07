package com.company.project.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Viki.Feng on 21/01/2016.
 */
@Controller
public class TestController {
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    /**
     * Display Test Page
     *
     * @return
     */
    @RequestMapping("/test")
    public String getTestPage() {
        return "test/index";
    }
}
