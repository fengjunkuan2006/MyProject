<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 2016/4/12
  Time: 9:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="navbar">
    <div class="navbar-inner">
        <ul class="nav pull-right">

            <li><a href="#" class="hidden-phone visible-tablet visible-desktop" role="button">Settings</a></li>
            <li id="fat-menu" class="dropdown">
                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-user"></i> Jack Smith
                    <i class="icon-caret-down"></i>
                </a>

                <ul class="dropdown-menu">
                    <li><a tabindex="-1" href="#">My Account</a></li>
                    <li class="divider"></li>
                    <li><a tabindex="-1" class="visible-phone" href="#">Settings</a></li>
                    <li class="divider visible-phone"></li>
                    <li><a tabindex="-1" href="/admin/demo/signInPage">Logout</a></li>
                </ul>
            </li>

        </ul>
        <a class="brand" href="/admin/demo/indexPage"><span class="first">Your</span> <span class="second">Company</span></a>
    </div>
</div>


<div class="copyrights">Collect from <a href="http://www.cssmoban.com/" title="网站模板">网站模板</a></div>
<div class="sidebar-nav">
    <form class="search form-inline">
        <input type="text" placeholder="Search...">
    </form>

    <a href="#dashboard-menu" class="nav-header" data-toggle="collapse"><i class="icon-dashboard"></i>Dashboard</a>
    <ul id="dashboard-menu" class="nav nav-list collapse in">
        <li><a href="/admin/demo/indexPage">Home</a></li>
        <li><a href="/admin/demo/userPage">Sample List</a></li>
        <li><a href="/admin/demo/usersPage">Sample Item</a></li>
        <li><a href="/admin/demo/mediaPage">Media</a></li>
        <li><a href="/admin/demo/calendarPage">Calendar</a></li>

    </ul>

    <a href="#accounts-menu" class="nav-header" data-toggle="collapse"><i class="icon-briefcase"></i>Account<span
            class="label label-info">+3</span></a>
    <ul id="accounts-menu" class="nav nav-list collapse">
        <li><a href="/admin/demo/signInPage">Sign In</a></li>
        <li><a href="/admin/demo/signUpPage">Sign Up</a></li>
        <li><a href="/admin/demo/resetPasswordPage">Reset Password</a></li>
    </ul>

    <a href="#error-menu" class="nav-header collapsed" data-toggle="collapse"><i class="icon-exclamation-sign"></i>Error
        Pages <i class="icon-chevron-up"></i></a>
    <ul id="error-menu" class="nav nav-list collapse">
        <li><a href="/admin/demo/403Page">403 page</a></li>
        <li><a href="/admin/demo/404Page">404 page</a></li>
        <li><a href="/admin/demo/500Page">500 page</a></li>
        <li><a href="/admin/demo/503Page">503 page</a></li>
    </ul>

    <a href="#legal-menu" class="nav-header" data-toggle="collapse"><i class="icon-legal"></i>Legal</a>
    <ul id="legal-menu" class="nav nav-list collapse">
        <li><a href="/admin/demo/privacyPolicyPage">Privacy Policy</a></li>
        <li><a href="/admin/demo/termsAndConditionsPage">Terms and Conditions</a></li>
    </ul>

    <a href="/admin/demo/helpPage" class="nav-header"><i class="icon-question-sign"></i>Help</a>
    <a href="/admin/demo/faqPage" class="nav-header"><i class="icon-comment"></i>Faq</a>
</div>
