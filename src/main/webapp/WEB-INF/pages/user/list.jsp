<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 21/01/2016
  Time: 14:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<head>
    <jsp:include flush="true" page="/WEB-INF/pages/common.jsp"/>

    <title><spring:message code="user.text.UserList"/></title>
</head>
<body>
<div>
    <input type="button" value="<spring:message code="user.text.AddUser"/>" onclick="editOrAddUser(0)" />
</div>
<table border="0" id="tableUserList" style="width: 100%;"></table>
<div id="dlgUserEdit" title="<spring:message code="user.text.AddUser"/>" style="display:none;">
    <table>
        <tr>
            <td>
                <spring:message code="login.label.Username"/>:
            </td>
            <td>
                <input type="text" id="txtUsername" />
            </td>
        </tr>
        <tr>
            <td>
                <spring:message code="login.label.Password"/>:
            </td>
            <td>
                <input type="text" id="txtPassword" />
            </td>
        </tr>
    </table>
</div>
</body>
<script type="text/javascript">
    var table;
    var currentUserId = 0;
    $(document).ready(function () {
        table = $('#tableUserList').dataTable({
            "oLanguage": {
                "sUrl": "/staticmedia/components/dataTables/language/jquery.dataTable_" + languageSetup + ".txt"
            },

            "sDom": '<"H"lfrC>t<"F"ip>',

            "iDisplayLength": 25,
            "aLengthMenu": [[15, 25, 50], [15, 25, 50]],

            "bSort": true,
            "bJQueryUI": true,

            "sPaginationType": "full_numbers",

            "bProcessing": true,
            "sAjaxSource": "/user/users",
            //"aaData": usersData,

            "bStateSave": false,
            "bServerSide": true,

            //"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            //    $('td', nRow).attr('nowrap','nowrap');
            //    return nRow;
            //},
            "aoColumns": [
                {"sTitle": "<spring:message code="user.label.UserId"/>", "mDataProp": "userId"},
                {"sTitle": "<spring:message code="user.label.Username"/>", "mDataProp": "username"},
                {"sTitle": "<spring:message code="user.label.Password"/>", "mDataProp": "password"},
                {
                    "sTitle": "<spring:message code="user.label.Operation"/>", "mDataProp": function (obj) {
                        return "<a href='javascript:void(0);' onclick='editOrAddUser(" + obj.userId + ")'><spring:message code="user.label.Edit"/></a>" +
                                "&nbsp;&nbsp;<a href='javascript:void(0);' onclick='deleteUser(" + obj.userId + ")'><spring:message code="user.label.Delete"/></a>"
                    }
                }
            ],
            "oColVis": {
                "buttonText": "<spring:message code="common.label.Search"/>",
                "bRestore": false,
                "sAlign": "left"
            }
        });

        //User Edit Dialog
        $('#dlgUserEdit').dialog({
            autoOpen: false,
            height: 250,
            width: 470,
            resizable: false,
            modal: true,
            buttons: {
                "<spring:message code="common.label.Ok"/>": function() {
                    if(currentUserId != 0) {
                        $.ajax({
                            url: "/user/user/" + currentUserId + "?_method=PUT",
                            data: JSON.stringify({"username": $("#txtUsername").val(), "password": $("#txtPassword").val()}),
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json",
                            async: true,
                            success: function (responseText) {
                                if (responseText.code == 0) {
                                    window.location.href = window.location.href;
                                } else {
                                    alert(responseText.message);
                                }
                            },
                            error: function () {
                                alert(COMMON.common_message_Error);
                            }
                        });
                    } else {
                        $.ajax({
                            url: "/user/user",
                            data: JSON.stringify({"username": $("#txtUsername").val(), "password": $("#txtPassword").val()}),
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json",
                            async: true,
                            success: function (responseText) {
                                if (responseText.code == 0) {
                                    window.location.href = window.location.href;
                                } else {
                                    alert(responseText.message);
                                }
                            },
                            error: function () {
                                alert(COMMON.common_message_Error);
                            }
                        });
                    }
                },
                "<spring:message code="common.label.Close"/>": function() {
                    $(this).dialog( "close" );
                }
            },
            close: function () {
            }
        });
    });
</script>