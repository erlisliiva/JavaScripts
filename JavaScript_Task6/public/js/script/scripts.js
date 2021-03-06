$(function () {
    let socket = io();
    let users = [];
    let clientUsername;

    $("#chat-screen").hide();

    $("#user-login").click(function (e) {
        $("#username-empty").hide();
        $("#username-taken").hide();

        e.preventDefault(); // prevents page reloading
        let username = $("#username").val().trim();
        if (username.length < 1) {
            $("#username-empty").show();
            return false;
        }

        users = getUsers();
        if (users.includes(username)) {
            $("#username-taken").show();
            return false;
        }
        socket.emit("user joined", username);
        $("#login-screen").hide();
        $("#chat-screen").show();
        clientUsername = username;
        return false;
    });

    $("#username").keyup(function (event) {
        if (event.which === 13) {
            $('#user-login').click(); // enter functionality
        }
    });

    // remove 'typing...' after message sent
    $("#message-send").click(function (e) {
        e.preventDefault();// prevents page reloading
        let $message = $('#message');
        let messageText = $message.val().trim();
        if (messageText.length < 1) return;
        $message.val("");
        socket.emit("message", messageText);
        socket.emit('user typing', false);
    });

    socket.on('user joined', function (username) {
        renderUserTable();
    });

    socket.on('user left', function (username) {
        renderUserTable();
    });

    socket.on('message', function (messageData) {
        let user = messageData.user;
        let text = messageData.parsedText;
        let currentDate = new Date().toLocaleTimeString();

        createMessageBubble(user, text, currentDate);

        let tableRow = $('<tr>')
            .append($('<td>').append(`${user}`))
            .append($('<td>').append(`${text}`))
            .append($('<td>').append(`${currentDate}`));
        $('#message-table').append(tableRow);

    });

    // send on enter, new line with shift + enter
    $('#message').keyup(function (event) {
        socket.emit('user typing', true);

        if (event.which === 13 && !event.shiftKey) {
            $('#message-send').click();
        }
    });


    socket.on('user typing', function (data) {
        if (data.typing) {
            $(`#${data.username}`).show()
        } else {
            $(`#${data.username}`).hide()
        }
    });

    function createMessageBubble(user, text, time) {
        let $messageContainer = $('.message-container');

        let messageDiv = $('<div>');
        let userLabel = $('<span>').append(`<strong>${user}</strong> <i style="font-size: 12px">${time}</i>`);
        let textContainer = $('<div>').append(`<p>${text}</p>`);

        messageDiv.addClass('message-bubble');
        userLabel.addClass('message-sender');
        textContainer.addClass('message-text');
        if (user === clientUsername) messageDiv.addClass('client-message');

        messageDiv.append(userLabel);
        messageDiv.append(textContainer);

        $messageContainer.append(messageDiv);
        $messageContainer.scrollTop($messageContainer.prop("scrollHeight"));
    }

    function getUsers() {
        let res = [];
        $.ajax({
            url: '/users',
            success: function (response) {
                if (response.length === 0) return res;
                for (let i = 0; i < response.length; i++) {
                    res.push(response[i]);
                }
            },
            async: false
        });
        return res;
    }

    function renderUserTable() {
        let userTable = $("#user-table");
        userTable.empty();
        users = getUsers();
        users.forEach(function (value, index) {
            let userRow = $('<div>')
                .append($('<i>').addClass("far fa-user"))
                .append($('<span>').append(value).addClass('user-table-text'))
                .append($('<span>').append('<i>kirjutab...</i>').attr('id', value).addClass('is-typing-label'));
            userTable.append(userRow);
        })
    }


});