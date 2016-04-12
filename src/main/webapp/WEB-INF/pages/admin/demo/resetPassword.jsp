<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 2016/4/11
  Time: 14:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Admin</title>
    <jsp:include flush="true" page="common.jsp"/>
</head>

<!--[if lt IE 7 ]>
<body class="ie ie6"> <![endif]-->
<!--[if IE 7 ]>
<body class="ie ie7 "> <![endif]-->
<!--[if IE 8 ]>
<body class="ie ie8 "> <![endif]-->
<!--[if IE 9 ]>
<body class="ie ie9 "> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<body class="">
<!--<![endif]-->


<div class="navbar">
    <div class="navbar-inner">
        <ul class="nav pull-right">

        </ul>
        <a class="brand" href="/admin/demo/indexPage"><span class="first">Your</span> <span class="second">Company</span></a>
    </div>
</div>


<div class="row-fluid">
    <div class="dialog">
        <div class="block">
            <p class="block-heading">Reset your password</p>

            <div class="block-body">
                <form>
                    <label>Email Address</label>
                    <input type="text" class="span12"></input>
                    <a href="/admin/demo/indexPage" class="btn btn-primary pull-right">Send</a>

                    <div class="clearfix"></div>
                </form>
            </div>
        </div>
        <a href="/admin/demo/signInPage">Sign in to your account</a>
    </div>
</div>

<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
    $(function () {
        $('.demo-cancel-click').click(function () {
            return false;
        });
    });
</script>

</body>
</html>
