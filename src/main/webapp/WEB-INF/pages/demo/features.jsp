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
<div class="features">
    <div class="container">
        <div class="feature-text">
            <h2>Features</h2>

            <p>Morbi tempor mauris a augue egestas sollicitudin. Nullam ultricies efficitur lectus, quis porta metus
                mattis eu. Duis auctor vehicula enim, sed cursus mi maximus id. Donec molestie quam in libero pulvinar,
                at congue metus fringilla. Sed ullamcorper, risus quis scelerisque laoreet, purus metus mollis orci, non
                aliquam quam nunc sollicitudin lacus. Nulla lectus justo, ultricies efficitur rutrum et, rutrum
                vulputate purus. Aliquam erat volutpat. Quisque ac quam nec quam dignissim fringilla ut nec orci. Ut
                malesuada sed lectus non molestie. In scelerisque vestibulum mauris at viverra. </p>
        </div>
        <div class="feature-section">
            <div class="feature-grid">
                <div class="feature-grid-pic">
                    <img src="/staticmedia/images/f1.jpg" alt=""/>
                </div>
                <div class="feature-grid-info">
                    <h3>App Designing</h3>

                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable.
                        Etiam quis dolor quis nibh facilisis vestibulum.humour, or randomised words which don't look
                        even slightly believable. Etiam quis dolor quis nibh facilisis vestibulum. Phasellus porta
                        euismod felis, sit amet porttitor nulla laoreet non. Phasellus sollicitudin, tellus id venenatis
                        accumsan, nisi dolor venenatis risus, sit amet lacinia neque nisl quis neque. Donec dignissim
                        bibendum ultrices.Ornare ipsum ipsum aliquam lacus. Nam quis odio magna. Phasellus porta euismod
                        felis, sit amet porttitor nulla laoreet non. Phasellus sollicitudin, tellus id venenatis
                        accumsan, nisi dolor venenatis risus, sit amet lacinia neque nisl quis neque. Donec dignissim
                        bibendum ultrices.Ornare ipsum ipsum aliquam lacus. Nam quis odio magna. </p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="feature-grid">
                <div class="feature-grid-pic">
                    <img src="/staticmedia/images/f2.jpg" alt=""/>
                </div>
                <div class="feature-grid-info">
                    <h3>Performance App</h3>

                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable.
                        Etiam quis dolor quis nibh facilisis vestibulum. Phasellus porta ehumour, or randomised words
                        which don't look even slightly believable. Etiam quis dolor quis nibh facilisis vestibulum.
                        Phasellus porta euismod felis, sit amet porttitor nulla laoreet non. Phasellus sollicitudin,
                        tellus id venenatis accumsan, nisi dolor venenatis risus, sit amet lacinia neque nisl quis
                        neque. Donec dignissim bibendum ultrices.Ornare ipsum ipsum aliquam lacus. Nam quis odio
                        magna.uismod felis, sit amet porttitor nulla laoreet non. Phasellus sollicitudin, tellus id
                        venenatis accumsan, nisi dolor venenatis risus, sit amet lacinia neque nisl quis neque. Donec
                        dignissim bibendum ultrices.Ornare ipsum ipsum aliquam lacus. Nam quis odio magna. </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="main feature-main">
            <h5>additional features</h5>

            <div class="col-md-6 service-top">
                <div class="service-pic">
                    <img src="/staticmedia/images/1.png" alt=""/>
                </div>
                <div class="service-info">
                    <h3>Realiable Service</h3>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="col-md-6 service-top">
                <div class="service-pic">
                    <img src="/staticmedia/images/2.png" alt=""/>
                </div>
                <div class="service-info">
                    <h3>Advanced Search Options</h3>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>

            <div class="col-md-6 service-bottom">
                <div class="service-pic">
                    <img src="/staticmedia/images/3.png" alt=""/>
                </div>
                <div class="service-info">
                    <h3>Highly Flexible</h3>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="col-md-6 service-bottom">
                <div class="service-pic">
                    <img src="/staticmedia/images/4.png" alt=""/>
                </div>
                <div class="service-info">
                    <h3>Excellent Customer Support</h3>

                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
        <label> </label>
    </div>
</div>

<!-- footer -->
<jsp:include flush="true" page="footer.jsp"/>

</body>
</html>
