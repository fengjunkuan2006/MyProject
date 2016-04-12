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
            <p class="stat"><span class="number">5</span>users</p>

            <p class="stat"><span class="number">19</span>Events</p>
        </div>

        <h1 class="page-title">Calendar</h1>
    </div>

    <ul class="breadcrumb">
        <li><a href="/admin/demo/indexPage">Home</a> <span class="divider">/</span></li>
        <li class="active">Calendar</li>
    </ul>

    <div class="container-fluid">
        <div class="row-fluid">

            <link rel='stylesheet' type='text/css' href='/staticmedia/components/fullcalendar/css/fullcalendar.css'/>
            <link rel='stylesheet' type='text/css' href='/staticmedia/components/fullcalendar/css/fullcalendar.print.css'
                  media='print'/>
            <script type='text/javascript' src='/staticmedia/components/fullcalendar/js/fullcalendar.js'></script>

            <script type='text/javascript'>

                $(document).ready(function () {

                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth();
                    var y = date.getFullYear();

                    $('#calendar').fullCalendar({
                        header: false,
                    });
                    $('#calendar').fullCalendar('next');

                });

            </script>
            <style type='text/css'>

                #calendar {
                    width: 100%;
                    margin: 0 auto;
                }

            </style>

            <h2>Upcoming Events</h2>

            <div id='calendar'></div>

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
