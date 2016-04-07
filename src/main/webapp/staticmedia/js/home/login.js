/**
 * Created by Viki.Feng on 21/01/2016.
 */
//Login
function login() {
    var username = $("#txtUsername");
    var password = $("#txtPassword");
    if (username.length == 0 || username.val().length == 0) {
        alert(COMMON.login_message_UsernameNull);
        return false;
    }
    else {
    }
    if (password.length == 0 || password.val().length == 0) {
        alert(COMMON.login_message_PasswordNull);
        return false;
    }
    else {
    }

    $.ajax({
        url: "/home/login",
        data: JSON.stringify({"username" : username.val(), "password" : password.val()}),
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        async: true,
        success: function (responseText) {
            if (responseText.code == 0) {
                window.location.href = "/user/listPage";
            } else {
                alert(responseText.message);
            }
        },
        error: function () {
            alert(COMMON.common_message_Error);
        }
    });
}

//Check if user presses enter key
function checkEnterKey() {
    if (event.keyCode == 13) {
        login();
    }
}

//test
function test() {
    document.write("1");
}