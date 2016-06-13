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
            <p class="stat"><span class="label label-info">10</span> Users</p>

            <p class="stat"><span class="label label-success">19</span> Events</p>

            <p class="stat"><span class="label label-danger">12</span> Calendars</p>
        </div>

        <h1 class="page-title">Calendar</h1>
        <ul class="breadcrumb">
            <li><a href="/admin/demo/indexPage">Home</a></li>
            <li class="active">Calendar</li>
        </ul>

    </div>
    <div class="main-content">


        <link rel='stylesheet' type='text/css' href='lib/fullcalendar-1.6.4/fullcalendar/fullcalendar.css'/>
        <link rel='stylesheet' type='text/css' href='lib/fullcalendar-1.6.4/fullcalendar/fullcalendar.print.css'
              media='print'/>
        <script type='text/javascript' src='lib/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js'></script>

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


        <div style="float:right; margin-bottom: 1em;">
            <a href="#" class="btn btn-primary"><span class="fa fa-plus-square-o"></span> New Event</a>
        </div>
        <h3>Upcoming Events</h3>

        <div id='calendar'></div>


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