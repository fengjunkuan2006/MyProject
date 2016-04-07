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
    <title><spring:message code="login.label.Login"/></title>
</head>
<body>
<table>
  <tr>
    <td>
      <spring:message code="login.label.Username"/>:
    </td>
    <td>
      <input type="text" id="txtUsername" onkeydown="checkEnterKey()" />
    </td>
  </tr>
  <tr>
    <td>
      <spring:message code="login.label.Password"/>:
    </td>
    <td>
      <input type="password" id="txtPassword" onkeydown="checkEnterKey()" />
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <input type="button" value="<spring:message code="login.label.Login"/>" onclick="login()" />
    </td>
  </tr>
</table>
<div>
  <a href="/home/language/en?originalUrl=/home/loginPage"><spring:message code="login.label.English"/></a>&nbsp;<a href="/home/language/zh?originalUrl=/home/loginPage"><spring:message code="login.label.Chinese"/></a>
</div>
</body>