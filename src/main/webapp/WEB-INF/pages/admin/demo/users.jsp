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

        <h1 class="page-title">Users</h1>
    </div>

    <ul class="breadcrumb">
        <li><a href="/admin/demo/indexPage">Home</a> <span class="divider">/</span></li>
        <li class="active">Users</li>
    </ul>

    <div class="container-fluid">
        <div class="row-fluid">

            <div class="btn-toolbar">
                <button class="btn btn-primary"><i class="icon-plus"></i> New User</button>
                <button class="btn">Import</button>
                <button class="btn">Export</button>
                <div class="btn-group">
                </div>
            </div>
            <div class="well">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th style="width: 26px;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Tompson</td>
                        <td>the_mark7</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ashley</td>
                        <td>Jacobs</td>
                        <td>ash11927</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Audrey</td>
                        <td>Ann</td>
                        <td>audann84</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>John</td>
                        <td>Robinson</td>
                        <td>jr5527</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Aaron</td>
                        <td>Butler</td>
                        <td>aaron_butler</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Chris</td>
                        <td>Albert</td>
                        <td>cab79</td>
                        <td>
                            <a href="/admin/demo/userPage"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <ul>
                    <li><a href="#">Prev</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">Next</a></li>
                </ul>
            </div>

            <div class="modal small hide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">Delete Confirmation</h3>
                </div>
                <div class="modal-body">
                    <p class="error-text"><i class="icon-warning-sign modal-icon"></i>Are you sure you want to delete
                        the user?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                    <button class="btn btn-danger" data-dismiss="modal">Delete</button>
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
