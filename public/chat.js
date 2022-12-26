// window.onload = () => {
(() => {
    var messages = [];
    
    var socket =  io.connect(socketurl);
    var field = document.getElementById("field");
    var group = document.getElementById("group");
    var sendButton = document.getElementById("send");
    var sendgroupbutton = document.getElementById('sendgroup');
    var content = document.getElementById("content");
    var user = document.getElementById('user');
    var typinglabel = document.getElementById('istyping');

    socket.on('message', (data) => {
        if(data.message) {
            verb = (data.username == undefined)? undefined : (data.username == user.value? 'post' : 'get');

            // call function to get message
            msgline = msghub.messagedisplay(verb, data.message, data.username, data.group);

            // // call class to get message
            // let msghub = MessageBase();
            // if (data.group != undefined) msghub = new GroupMMessage(verb, data.message, data.username, data.group);
            // else msghub = new UserMMessage(verb, data.message, data.username);
            // msgline = msghub.displaymessage();

            content.innerHTML += msgline;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    // socket.on('message', (data) => {
    //     if(data.message) {
    //         var lefticon = '';
    //         var righticon = '';
    //         var align =(data.username == undefined? 'center' : (data.username == user.value? 'right' : 'left'));
    //         var bgcolor =(data.username == undefined? 'white' : (data.username == user.value? '#00b300' : '#09bbd6'));
    //         var color = (data.username == undefined? 'black' : 'white');
    //         if (data.username != undefined) {
    //             if (data.username == user.value) righticon = '<img src="/resources/jlin.png" style="padding-bottom: 0px; border-radius:50%" alt="' + user.value + '" width="30px" height="30px" />';
    //             else lefticon = '<img src="/resources/Pin.png" style="padding-bottom: 0px; border-radius: 50%;" alt="' + user.value + '" width="30px" height="30px" />';

    //         }
    //         displaymessage(data.username, data.group, data.message, color, bgcolor, align, lefticon, righticon);
    //     } else {
    //         console.log("There is a problem:", data);
    //     }
    // });

    function displaymessage(user, group, msg, color, bgcolor, align, lefticon, righticon) {
        var msgline = '<div style="text-align: {{align}}; margin-bottom: 10px;">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px 5px 20px">' + '<b>' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + '</b> ' + msg + '</span> {{righticon}} </div>';
        msgline = msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon);
        content.innerHTML += msgline;
        content.scrollTop = content.scrollHeight;
    };

    socket.on('is-typing', (data) => {
        typinglabel.innerHTML = data.message;
    });

    sendButton.onclick = sendMessage = () => {
        var text = field.value;
        socket.emit('send', { message: text, username: user.value });
        field.value = '';
        socket.emit('typing', { message: ''});
    };

    sendgroupbutton.onclick = () => {
        if (group.value == "") {
            alert("No group specified");
            return;
        }
        socket.emit('send-group', { message: field.value, username: user.value, group: group.value});
    };

    field.onkeyup = (e) =>  {
        if (e.keyCode == 13) {
            sendMessage();
        }
    };

    field.onkeydown = (e) => {
        socket.emit("typing", { message: user.value + " is typing..."});
    };

    field.onblur = (e) => {
        socket.emit('typing', { message: ''});
    };
})();
// }