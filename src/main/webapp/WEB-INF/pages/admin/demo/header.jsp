<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 2016/4/12
  Time: 9:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="" href="/admin/demo/indexPage"><span class="navbar-brand"><span class="fa fa-paper-plane"></span> Aircraft</span></a>
    </div>

    <div class="navbar-collapse collapse" style="height: 1px;">
        <ul id="main-menu" class="nav navbar-nav navbar-right">
            <li class="dropdown hidden-xs">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-user padding-right-small"
                          style="position:relative;top: 3px;"></span> Jack Smith
                    <i class="fa fa-caret-down"></i>
                </a>

                <ul class="dropdown-menu">
                    <li><a href="./">My Account</a></li>
                    <li class="divider"></li>
                    <li class="dropdown-header">Admin Panel</li>
                    <li><a href="./">Users</a></li>
                    <li><a href="./">Security</a></li>
                    <li><a tabindex="-1" href="./">Payments</a></li>
                    <li class="divider"></li>
                    <li><a tabindex="-1" href="sign-in.html">Logout</a></li>
                </ul>
            </li>
        </ul>

    </div>
</div>
</div>

<div class="sidebar-nav">
    <ul>
        <li><a href="#" data-target=".dashboard-menu" class="nav-header" data-toggle="collapse"><i
                class="fa fa-fw fa-dashboard"></i> Dashboard<i class="fa fa-collapse"></i></a></li>
        <li>
            <ul class="dashboard-menu nav nav-list collapse in">
                <li><a href="/admin/demo/indexPage"><span class="fa fa-caret-right"></span> Main</a></li>
                <li><a href="/admin/demo/usersPage"><span class="fa fa-caret-right"></span> User List</a></li>
                <li><a href="/admin/demo/userPage"><span class="fa fa-caret-right"></span> User Profile</a></li>
                <li><a href="/admin/demo/mediaPage"><span class="fa fa-caret-right"></span> Media</a></li>
                <li><a href="/admin/demo/calendarPage"><span class="fa fa-caret-right"></span> Calendar</a></li>
            </ul>
        </li>

        <li data-popover="true"
            data-content="Items in this group require a <strong><a href='http://portnine.com/bootstrap-themes/aircraft' target='blank'>premium license</a><strong>."
            rel="popover" data-placement="right"><a href="#" data-target=".premium-menu" class="nav-header collapsed"
                                                    data-toggle="collapse"><i class="fa fa-fw fa-fighter-jet"></i>
            Premium Features<i class="fa fa-collapse"></i></a></li>

        <li><a href="#" data-target=".accounts-menu" class="nav-header collapsed" data-toggle="collapse"><i
                class="fa fa-fw fa-briefcase"></i> Account <span class="label label-info">+3</span></a></li>
        <li>
            <ul class="accounts-menu nav nav-list collapse">
                <li><a href="/admin/demo/signInPage"><span class="fa fa-caret-right"></span> Sign In</a></li>
                <li><a href="/admin/demo/signUpPage"><span class="fa fa-caret-right"></span> Sign Up</a></li>
                <li><a href="/admin/demo/resetPasswordPage"><span class="fa fa-caret-right"></span> Reset Password</a></li>
            </ul>
        </li>

        <li><a href="#" data-target=".legal-menu" class="nav-header collapsed" data-toggle="collapse"><i
                class="fa fa-fw fa-legal"></i> Legal<i class="fa fa-collapse"></i></a></li>
        <li>
            <ul class="legal-menu nav nav-list collapse">
                <li><a href="/admin/demo/privacyPolicyPage"><span class="fa fa-caret-right"></span> Privacy Policy</a></li>
                <li><a href="/admin/demo/termsAndConditionsPage"><span class="fa fa-caret-right"></span> Terms and Conditions</a>
                </li>
            </ul>
        </li>

        <li><a href="/admin/demo/helpPage" class="nav-header"><i class="fa fa-fw fa-question-circle"></i> Help</a></li>
        <li><a href="/admin/demo/faqPage" class="nav-header"><i class="fa fa-fw fa-comment"></i> Faq</a></li>
        <li><a href="http://portnine.com/bootstrap-themes/aircraft" class="nav-header" target="blank"><i
                class="fa fa-fw fa-heart"></i> Get Premium</a></li>
    </ul>
</div>