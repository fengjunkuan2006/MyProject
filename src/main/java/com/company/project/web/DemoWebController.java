package com.company.project.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Viki.Feng on 21/01/2016.
 */
@Controller
@RequestMapping("/demo")
public class DemoWebController {
    private static final Logger logger = LoggerFactory.getLogger(DemoWebController.class);

    /**
     * Display Index Page
     *
     * @return
     */
    @RequestMapping("/indexPage")
    public String getIndexPage() {
        return "/demo/index";
    }

    /**
     * Display About Page
     *
     * @return
     */
    @RequestMapping("/aboutPage")
    public String getAboutPage() {
        return "/demo/about";
    }

    /**
     * Display 404 Page
     *
     * @return
     */
    @RequestMapping("/404Page")
    public String get404Page() {
        return "/demo/404";
    }

    /**
     * Display Features Page
     *
     * @return
     */
    @RequestMapping("/featuresPage")
    public String getFeaturesPage() {
        return "/demo/features";
    }

    /**
     * Display Portfolio Page
     *
     * @return
     */
    @RequestMapping("/portfolioPage")
    public String getPortfolioPage() {
        return "/demo/portfolio";
    }

    /**
     * Display Contact Page
     *
     * @return
     */
    @RequestMapping("/contactPage")
    public String getContactPage() {
        return "/demo/contact";
    }
}
