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

        <h1 class="page-title">Terms and Conditions</h1>
        <ul class="breadcrumb">
            <li><a href="/admin/demo/indexPage">Home</a></li>
            <li class="active">Terms and Conditions</li>
        </ul>

    </div>
    <div class="main-content">

        <h3>Terms of Use</h3>
        These Terms and Conditions constitute an agreement (“Agreement”) between you (“you”, “your”, “user”, “Customer”)
        and the Company.Avocado gumbo artichoke ricebean groundnut tigernut. Daikon kakadu plum water spinach garbanzo
        eggplant fava bean chard rock melon carrot rutabaga water chestnut broccoli courgette onion.

        <h3>Eligibility and Identity.</h3>
        To be eligible to use our Services, you must be at least 13 years old. Sorrel jícama tomato silver beet wattle
        seed black-eyed pea garlic fennel tigernut okra beetroot shallot. Soko shallot melon dandelion bamboo shoot
        chickpea soybean pumpkin kakadu plum parsley ricebean grape courgette courgette jícama tatsoi. Black-eyed pea
        gourd tomatillo arugula cucumber celery mustard black-eyed pea cauliflower soybean rutabaga turnip groundnut.

        <h3>Termination</h3>
        You may terminate this Agreement at any time by ceasing all use of the Services and by notifying us. The Company
        may terminate this Agreement, at any time, without notice to you, if it believes, in its sole judgment, that you
        have breached or may breach any term or condition of this Agreement. Fennel garlic melon broccoli kohlrabi dulse
        black-eyed pea chicory watercress shallot bamboo shoot cucumber rutabaga ricebean gourd chickweed gumbo. Burdock
        fennel sorrel cress collard greens tomato tigernut salad chickweed yarrow water spinach catsear earthnut pea
        cabbage dulse potato. Onion courgette bitterleaf rutabaga tomatillo tigernut groundnut courgette water spinach
        tomato. Celery ricebean cabbage salsify caulie watercress cress collard greens potato chard gourd pea sprouts
        cucumber dulse gram. Leek summer purslane tatsoi catsear celtuce broccoli rabe onion zucchini.

        <h3>Use of Services & Account</h3>
        You represent and warrant that you possess the legal right and ability to enter into this Agreement. You agree
        not to use the Materials, Content, Services, and your Account for any unlawful or abusive purpose or in any way
        which interferes with our ability to provide Services to our customers, or which damages our property. Chickpea
        gourd coriander daikon zucchini lettuce tomatillo sierra leone bologi maize parsnip grape melon kohlrabi welsh
        onion. Celery wakame corn garlic courgette silver beet cabbage gram amaranth jícama bitterleaf. Ricebean bunya
        nuts prairie turnip water chestnut artichoke cauliflower watercress gourd cabbage okra broccoli rabe. Burdock
        leek sorrel radicchio azuki bean collard greens winter purslane broccoli rabe gourd water chestnut pumpkin
        gumbo. Azuki bean green bean kohlrabi kombu aubergine salsify lotus root turnip lentil radicchio nori eggplant
        sorrel.

        <h3>Modification to Service</h3>
        The Company may change, suspend, or discontinue all or any part of the Service at any time, with or without
        reason. You acknowledge that the operation of the Service may from time to time encounter technical or other
        problems and may not necessarily continue uninterrupted or without technical or other errors and The Company
        shall not be responsible to you or others for any such interruptions, errors or problems or an outright
        discontinuance of the Service.

        <h3>Intellectual Property Ownership</h3>
        All Materials, Services, Accounts, and content, including, but not limited to, policy information, text,
        software, music, sound, photographs, video, graphics, the arrangement of text and images, commercially produced
        information, and other material contained on the Site or through the Services (“Content”), are provided by The
        Company unless indicated otherwise. Welsh onion tigernut broccoli asparagus brussels sprout jícama eggplant
        earthnut pea cress chickpea gourd zucchini. Radicchio lentil cucumber groundnut endive kohlrabi winter purslane.
        Seakale plantain quandong celtuce shallot fennel seakale epazote groundnut dandelion.

        <h3>Privacy</h3>
        Please see our <a href="privacy-policy.html">Privacy Policy</a> as set forth on the site.

        <h3>About These Terms</h3>

        <p>These Terms and Conditions are just a sample and are not legally binding. Real Terms of Services do not
            (usually) contain vegetables...</p>


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
