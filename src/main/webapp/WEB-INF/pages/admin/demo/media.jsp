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

<jsp:include flush="true" page="header.jsp"/>
<div class="content">

    <div class="header">
        <div class="stats">
            <p class="stat"><span class="number">48</span>images</p>

            <p class="stat"><span class="number">4</span>galleries</p>
        </div>

        <h1 class="page-title">Media</h1>
    </div>

    <ul class="breadcrumb">
        <li><a href="/admin/demo/indexPage">Home</a> <span class="divider">/</span></li>
        <li class="active">Gallery</li>
    </ul>

    <div class="container-fluid">
        <div class="row-fluid">


            <div class="block">
                <p class="block-heading">Gallery of Things</p>

                <div class="block-body gallery">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <div class="clearfix"></div>
                </div>
            </div>

            <div class="row-fluid">
                <div class="block span6">
                    <p class="block-heading">Gallery of Stuff</p>

                    <div class="block-body gallery">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="block span6">
                    <p class="block-heading">Gallery of Stuff</p>

                    <div class="block-body gallery">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <img src="/staticmedia/images/admin/170x170.gif" class="img-polaroid">

                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <div class="block">
                <p class="block-heading">Gallery of Stuff</p>

                <div class="block-body gallery">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <img src="/staticmedia/images/admin/140x140.gif" class="img-polaroid">

                    <div class="clearfix"></div>
                </div>
            </div>

            <jsp:include flush="true" page="footer.jsp"/>

        </div>
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
