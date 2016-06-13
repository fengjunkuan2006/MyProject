<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 2016/4/12
  Time: 13:27
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
<body class=" theme-blue">
<!--<![endif]-->
<!-- header -->
<jsp:include flush="true" page="header.jsp"/>

<!-- content -->

<div class="content">
    <div class="header">
        <div class="stats">
            <p class="stat"><span class="label label-info">48</span> Images</p>

            <p class="stat"><span class="label label-success">4</span> Galleries</p>
        </div>

        <h1 class="page-title">Media</h1>
        <ul class="breadcrumb">
            <li><a href="/admin/demo/indexPage">Home</a></li>
            <li class="active">Gallery</li>
        </ul>

    </div>
    <div class="main-content">


        <div class="panel panel-default">
            <p class="panel-heading">Gallery of Things</p>

            <div class="panel-body gallery">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">

                <div class="clearfix"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 col-md-6">
                <div class="panel panel-default">
                    <p class="panel-heading">Gallery of Stuff</p>

                    <div class="panel-body gallery">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">

                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-6">
                <div class="panel panel-default">
                    <p class="panel-heading">Gallery of Stuff</p>

                    <div class="panel-body gallery">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">
                        <img src="images/170x170.gif" class="img-polaroid">

                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <p class="panel-heading">Gallery of Stuff</p>

            <div class="panel-body gallery">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">
                <img src="images/140x140.gif" class="img-polaroid">

                <div class="clearfix"></div>
            </div>
        </div>

        <!-- footer -->
        <jsp:include flush="true" page="footer.jsp"/>

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