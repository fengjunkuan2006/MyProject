/**
 * Created by Viki.Feng on 21/01/2016.
 */
//Edit User
function editOrAddUser(userId) {
    var title = "";
    if (userId == 0) {
        title = USER.user_text_AddUser;

        $("#txtUsername").val("");
        $("#txtPassword").val("");
    } else {
        title = USER.user_text_EditUser;

        $.ajax({
            url: "/user/user/" + userId,
            async: false,
            success: function (responseText) {
                if (responseText.code == 0) {
                    $("#txtUsername").val(responseText.data.username);
                    $("#txtPassword").val(responseText.data.password)
                } else {
                    alert(responseText.message);
                }
            },
            error: function () {
                alert(COMMON.common_message_Error);
            }
        });
    }

    currentUserId = userId;
    $('#dlgUserEdit').dialog("option", "title", title).dialog("open");
}

//Delete User
function deleteUser(userId) {
    if(confirm(USER.user_message_ConfirmDeleteUser)) {
        $.ajax({
            url: "/user/user/" + userId + "?_method=DELETE",
            type: "POST",
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
}

//test
function test() {
    document.write("2");
}