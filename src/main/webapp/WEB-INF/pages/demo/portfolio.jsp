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

<div class="project">
    <div class="container">
        <h5>PORTFOLIO</h5>

        <div class="project-top">
            <h3>OUR AWESOME PROJECTS</h3>
        </div>
        <div class="project-bottom">
            <div class="portfolios entertain_box  wow fadeInUp" data-wow-delay="0.4s" id="portfolio">
                <div class="portfolio-top">
                    <ul id="filters" class="clearfix">
                        <li><span class="filter active" data-filter="app card icon logo web photo">ALL</span></li>
                        <li><span class="filter" data-filter="app">WEB</span></li>
                        <li><span class="filter" data-filter="photo">APP</span></li>
                        <li><span class="filter" data-filter="card photo">LOGO</span></li>
                        <li><span class="filter" data-filter="icon card">CODE</span></li>
                    </ul>
                    <div id="portfoliolist">
                        <div class="portfolio app mix_all" data-cat="app" style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-6.jpg" class="b-link-stripe b-animate-go   swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-6.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio card mix_all" data-cat="card" style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-2.jpg" class="b-link-stripe b-animate-go   swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-2.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio photo mix_all" data-cat="photo"
                             style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-3.jpg" class="b-link-stripe b-animate-go   swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-3.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio icon mix_all" data-cat="icon" style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-4.jpg" class="b-link-stripe b-animate-go   swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-4.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio photo mix_all" data-cat="photo"
                             style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-5.jpg" class="b-link-stripe b-animate-go   swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-5.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="portfolio app mix_all" data-cat="app" style="display: inline-block; opacity: 1;">
                            <div class="portfolio-wrapper">
                                <a href="/staticmedia/images/p-1.jpg" class="b-link-stripe b-animate-go  swipebox"
                                   title="Image Title">
                                    <img src="/staticmedia/images/port-1.jpg"/>

                                    <div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 ">Processing
                                        Steps Web<img src="/staticmedia/images/logo.png"/></h2>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--end-project-->

<link rel="stylesheet" href="/staticmedia/css/swipebox.css">
<script src="/staticmedia/components/jquery/jquery.swipebox.min.js"></script>
<script type="text/javascript">
    jQuery(function ($) {
        $(".swipebox").swipebox();
    });
</script>

<!-- Portfolio Ends Here -->
<script type="text/javascript" src="/staticmedia/components/jquery/jquery.mixitup.min.js"></script>
<script type="text/javascript">
    $(function () {
        var filterList = {
            init: function () {
                // MixItUp plugin
                // http://mixitup.io
                $('#portfoliolist').mixitup({
                    targetSelector: '.portfolio',
                    filterSelector: '.filter',
                    effects: ['fade'],
                    easing: 'snap',
                    // call the hover effect
                    onMixEnd: filterList.hoverEffect()
                });
            },

            hoverEffect: function () {
                // Simple parallax effect
                $('#portfoliolist .portfolio').hover(
                        function () {
                            $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                            $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');
                        },
                        function () {
                            $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                            $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
                        }
                );
            }
        };

        // Run the show!
        filterList.init();
    });
</script>

<!-- footer -->
<jsp:include flush="true" page="footer.jsp"/>

</body>
</html>
