package com.company.project.web.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Viki.Feng on 21/01/2016.
 */
@Controller
@RequestMapping("/admin/demo")
public class DemoController {
    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);

    /**
     * Display Index Page
     *
     * @return
     */
    @RequestMapping("/indexPage")
    public String getLoginPage() {
        return "/admin/demo/index";
    }

    /**
     * Display User Page
     *
     * @return
     */
    @RequestMapping("/userPage")
    public String getUserPage() {
        return "/admin/demo/user";
    }

    /**
     * Display Users Page
     *
     * @return
     */
    @RequestMapping("/usersPage")
    public String getUsersPage() {
        return "/admin/demo/users";
    }

    /**
     * Display Media Page
     *
     * @return
     */
    @RequestMapping("/mediaPage")
    public String getMediaPage() {
        return "/admin/demo/media";
    }

    /**
     * Display Calendar Page
     *
     * @return
     */
    @RequestMapping("/calendarPage")
    public String getCalendarPage() {
        return "/admin/demo/calendar";
    }

    /**
     * Display Sign-In Page
     *
     * @return
     */
    @RequestMapping("/signInPage")
    public String getSignInPage() {
        return "/admin/demo/signIn";
    }

    /**
     * Display Sign-Up Page
     *
     * @return
     */
    @RequestMapping("/signUpPage")
    public String getSignUpPage() {
        return "/admin/demo/signUp";
    }

    /**
     * Display Reset-Password Page
     *
     * @return
     */
    @RequestMapping("/resetPasswordPage")
    public String getResetPasswordPage() {
        return "/admin/demo/resetPassword";
    }

    /**
     * Display Privacy-Policy Page
     *
     * @return
     */
    @RequestMapping("/privacyPolicyPage")
    public String getPrivacyPolicyPage() {
        return "/admin/demo/privacyPolicy";
    }

    /**
     * Display Terms-And-Conditions Page
     *
     * @return
     */
    @RequestMapping("/termsAndConditionsPage")
    public String getTermsAndConditionsPage() {
        return "/admin/demo/termsAndConditions";
    }

    /**
     * Display Help Page
     *
     * @return
     */
    @RequestMapping("/helpPage")
    public String getHelpPage() {
        return "/admin/demo/help";
    }

    /**
     * Display Faq Page
     *
     * @return
     */
    @RequestMapping("/faqPage")
    public String getFaqPage() {
        return "/admin/demo/faq";
    }

    /**
     * Display 403 Page
     *
     * @return
     */
    @RequestMapping("/403Page")
    public String get403Page() {
        return "/admin/demo/403";
    }

    /**
     * Display 404 Page
     *
     * @return
     */
    @RequestMapping("/404Page")
    public String get404Page() {
        return "/admin/demo/404";
    }

    /**
     * Display 500 Page
     *
     * @return
     */
    @RequestMapping("/500Page")
    public String get500Page() {
        return "/admin/demo/500";
    }

    /**
     * Display 503 Page
     *
     * @return
     */
    @RequestMapping("/503Page")
    public String get503Page() {
        return "/admin/demo/503";
    }
}
