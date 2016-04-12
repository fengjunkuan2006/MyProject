<%--
  Created by IntelliJ IDEA.
  User: Viki.Feng
  Date: 2016/4/12
  Time: 13:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <jsp:include flush="true" page="common.jsp"/>
</head>

<body>
<!-- header -->
<jsp:include flush="true" page="header.jsp"/>

<!-- content -->
<div class="error-page">
  <div class="container">
    <div class="error-page text-center">
      <h3>4<span>0</span>4</h3>
      <p>Sorry Page Not Found</p>
      <a class="button curl-bottom-right two" href="index.html">Back To Home</a>
    </div>
  </div>
</div>

<!-- footer -->
<jsp:include flush="true" page="footer.jsp"/>

</body>
</html>
