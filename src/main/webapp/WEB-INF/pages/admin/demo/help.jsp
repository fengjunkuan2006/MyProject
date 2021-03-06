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

        <h1 class="page-title">Help</h1>
        <ul class="breadcrumb">
            <li><a href="/admin/demo/indexPage">Home</a></li>
            <li class="active">Help</li>
        </ul>

    </div>
    <div class="main-content">

        <div class="faq-content">
            <div class="row">
                <div class="col-sm-9 col-md-9">
                    <div class="search-well">
                        <form class="form-inline" style="margin-top:0px;">
                            <input class="input-xlarge form-control" placeholder="Search Help..."
                                   id="appendedInputButton" type="text">
                            <button class="btn btn-default" type="button"><i class="fa fa-search"></i> Go</button>
                        </form>
                    </div>

                    <div class="panel panel-default">
                        <p class="panel-heading">Popular Topics</p>

                        <div class="panel-body">
                            <ol>
                                <li><a href="#">What if I have a question?</a></li>
                                <li><a href="#">Where can I get support?</a></li>
                                <li><a href="#">How long does it take to fix a problem?</a></li>
                                <li><a href="#">Who can help me out?</a></li>
                                <li><a href="#">Where are you located?</a></li>
                            </ol>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <p class="panel-heading">Premium Support Available</p>

                        <div class="panel-body">
                            <p>Cress green bean potato bunya nuts water chestnut chicory rock melon jícama lotus root
                                wattle seed eggplant coriander winter purslane spring onion.</p>
                            <a href="#" class="btn btn-primary">Start Now</a>

                            <div class="clearfix"></div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <p class="panel-heading">Popular Topics</p>

                        <div class="panel-body">
                            <div class="row" style="text-align: center;">
                                <div class="pull-left unstyled col-sm-4 col-md-4">
                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Account</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Past Orders</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Profile</a></p>
                                </div>
                                <div class="pull-left unstyled col-sm-4 col-md-4">
                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Account</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Past Orders</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Profile</a></p>
                                </div>
                                <div>
                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Account</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Past Orders</a></p>

                                    <p><a href="#" class="btn btn-default" style="width: 115px;">Your Profile</a></p>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <p class="panel-heading">Some Helpful Information</p>

                        <div class="panel-body">
                            <h2>Aubergine Asparagus Maize</h2>

                            <p>Catsear corn gumbo leek chickpea summer purslane chicory. Taro azuki bean broccoli rabe
                                soybean endive chicory. Pumpkin salsify horseradish avocado cabbage tomatillo ricebean
                                caulie turnip greens eggplant.</p>

                            <p>Sweet pepper pea sprouts mung bean cabbage radicchio silver beet coriander lentil
                                groundnut jícama wattle seed black-eyed pea chicory broccoli rabe bamboo shoot. Kombu
                                garlic watercress garbanzo squash plantain amaranth wattle seed tomatillo tigernut.
                                Wakame watercress swiss chard bamboo shoot garlic wakame azuki bean lentil lettuce
                                chicory horseradish eggplant gumbo. Swiss chard turnip jícama courgette fennel salsify
                                brussels sprout zucchini sea lettuce desert raisin fava bean artichoke kale bell pepper
                                watercress wakame black-eyed pea garlic. Lentil spring onion caulie welsh onion sweet
                                pepper quandong potato wakame carrot taro artichoke prairie turnip eggplant.</p>

                            <p>Scallion burdock silver beet water spinach turnip watercress aubergine. Komatsuna
                                scallion bush tomato prairie turnip amaranth cress fennel parsnip plantain rutabaga
                                lettuce chickweed radish. Yarrow bell pepper radish tomatillo avocado brussels sprout
                                leek garlic salad pea sprouts sorrel courgette chickweed courgette carrot fennel cress
                                lotus root.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3">
                    <div class="toc">
                        <h3>Table of Contents</h3>
                        <ol>
                            <li><a href="#">Orders</a></li>
                            <li><a href="#">Billing</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Your Account</a></li>
                        </ol>
                    </div>
                    <div class="toc">
                        <h3>Contact Us</h3>
                        <h4>By Phone</h4>

                        <p>+1-123-333-4321</p>
                        <h4>By Email</h4>

                        <p><a href="#">hello@yourcompany.com</a></p>
                        <h4>Address</h4>
                        <address>
                            2817 S 49th<br>
                            Apt 314<br>
                            San Jose, CA 95101
                        </address>
                        <div>
                            <button class="btn btn-default"><i class="fa fa-facebook"></i></button>
                            <button class="btn btn-default"><i class="fa fa-twitter"></i></button>
                            <button class="btn btn-default"><i class="fa fa-linkedin"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
