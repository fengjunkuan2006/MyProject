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
<div class="contact">
    <div class="container">
        <div class="contact-main">
            <h3>Contact Us</h3>

            <div class="contact-top">
                <div class="col-md-4 contact-top-left">
                    <div class="contact-top-one">
                        <h4>ADDRESS:</h4>
                        <h6>The Company Name agi.
                            <span>756 gt globel Place,</span>
                            CD-Road,M 07 435.
                        </h6>
                    </div>
                    <div class="contact-top-one">
                        <h4>PHONES:</h4>

                        <p>Telephone: +1 234 567 9871
                            <span>FAX: +1 234 567 9871</span>
                        </p>
                    </div>
                    <div class="contact-top-one">
                        <h4>E-MAIL:</h4>

                        <p><a href="mailto:info@example.com">mail@user.com</a></p>
                    </div>
                </div>
                <div class="col-md-8 contact-top-right">
                    <form>
                        <input type="text" placeholder="Name" required="">
                        <input type="text" placeholder="Email" required="">
                        <input type="text" placeholder="Subject" required="">
                        <textarea placeholder="Message" required=""> </textarea>

                        <div class="sub-button">
                            <input type="submit" value="SEND">
                        </div>
                    </form>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="contact-bottom">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48823.46166263757!2d-111.65905442395612!3d40.10960948006863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874db9d7dc27d89d%3A0x8b6bd315d9f959d0!2sSpanish+Fork%2C+UT%2C+USA!5e0!3m2!1sen!2sin!4v1430817838072"
                    width="800" height="600" frameborder="0" style="border:0"></iframe>
        </div>
    </div>
</div>


<!-- footer -->
<jsp:include flush="true" page="footer.jsp"/>

</body>
</html>
