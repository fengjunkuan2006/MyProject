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

        <h1 class="page-title">Privacy Policy</h1>
        <ul class="breadcrumb">
            <li><a href="/admin/demo/indexPage">Home</a></li>
            <li class="active">Privacy Policy</li>
        </ul>

    </div>
    <div class="main-content">

        <h3>What we do with your data</h3>
        Veggies sunt bona vobis, proinde vos postulo esse magis pea sprouts rutabaga komatsuna salad collard greens.

        <h3>Use of Cookies</h3>
        Catsear corn gumbo leek chickpea summer purslane chicory. Taro azuki bean broccoli rabe soybean endive chicory.
        Pumpkin salsify horseradish avocado cabbage tomatillo ricebean caulie turnip greens eggplant.

        <h3>Use of Third Party Services</h3>
        Sweet pepper pea sprouts mung bean cabbage radicchio silver beet coriander lentil groundnut jícama wattle seed
        black-eyed pea chicory broccoli rabe bamboo shoot. Kombu garlic watercress garbanzo squash plantain amaranth
        wattle seed tomatillo tigernut. Wakame watercress swiss chard bamboo shoot garlic wakame azuki bean lentil
        lettuce chicory horseradish eggplant gumbo. Swiss chard turnip jícama courgette fennel salsify brussels sprout
        zucchini sea lettuce desert raisin fava bean artichoke kale bell pepper watercress wakame black-eyed pea garlic.
        Lentil spring onion caulie welsh onion sweet pepper quandong potato wakame carrot taro artichoke prairie turnip
        eggplant.


        <h3>Protection of Certain Personally-Identifying Information</h3>
        Scallion burdock silver beet water spinach turnip watercress aubergine. Komatsuna scallion bush tomato prairie
        turnip amaranth cress fennel parsnip plantain rutabaga lettuce chickweed radish. Yarrow bell pepper radish
        tomatillo avocado brussels sprout leek garlic salad pea sprouts sorrel courgette chickweed courgette carrot
        fennel cress lotus root.

        Brussels sprout water chestnut pea sprouts bell pepper bamboo shoot radicchio komatsuna celtuce chicory zucchini
        garlic groundnut epazote. Wakame kohlrabi radicchio artichoke shallot brussels sprout. Garlic garbanzo chicory
        welsh onion gram brussels sprout turnip endive.

        Tatsoi chickweed pea zucchini endive sierra leone bologi shallot artichoke. Gumbo tomatillo peanut onion lentil
        broccoli aubergine asparagus maize kakadu plum sweet pepper watercress artichoke brussels sprout shallot.
        Mustard sweet pepper welsh onion corn summer purslane potato green bean lettuce garbanzo jícama salsify amaranth
        lotus root sierra leone bologi radicchio mustard. Kombu cucumber sweet pepper winter purslane courgette silver
        beet zucchini dandelion arugula tatsoi welsh onion gumbo pea beet greens broccoli rabe kohlrabi. Spinach endive
        maize water spinach burdock bell pepper jícama bush tomato asparagus chickweed celery mustard kale tatsoi.

        Cress green bean potato bunya nuts water chestnut chicory rock melon jícama lotus root wattle seed eggplant
        coriander winter purslane spring onion. Leek coriander celery taro radicchio melon parsley tigernut water
        spinach maize brussels sprout cucumber arugula sweet pepper silver beet bell pepper kohlrabi. Cress gourd
        scallion salad jícama carrot water spinach garlic courgette black-eyed pea quandong tomatillo daikon epazote.

        <h3>About This Privacy Policy</h3>

        <p>This Privacy Policy is just a sample and are not legally binding. Real Privicy Policies do not (usually)
            contain vegetables...</p>


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