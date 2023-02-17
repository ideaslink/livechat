/*
        chat.js
        client side

*/

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
    var avagroup = document.getElementById('avagroup');
    var chat_target = document.getElementsByName('chat_target');

    socket.on('message', (data) => {
        if(data.message) {
            verb = (data.username == undefined)? undefined : (data.username == user.value? 'post' : 'get');

            // call function to get message
            msgline = messagedisplay(verb, data.message, data.username, data.group);
            // msgline = msghub.messagedisplay(verb, data.message, data.username, data.group);

            // // call class to get message
            // let msghub = MessageBase();
            // if (data.group != undefined) msghub = new GroupMMessage(verb, data.message, data.username, data.group);
            // else msghub = new UserMMessage(verb, data.message, data.username);
            // msgline = msghub.displaymessage();

            content.innerHTML += msgline;
            content.scrollTop = content.scrollHeight;

            if (data.groups != null){
                var html="";
                // for (let i = 0; i< Array.from(data.groups).length; i++ ){
                //     avagroup.innerHTML = '<input type="radio", class="ml-3" name="chat_target" value="history"> ${data.groups[i]}</input>';
                // }
                Array.from(data.groups).forEach(element => {
                    html += '<input type="radio", class="ml-3" name="group_target" value="' + element + '"> ' + element + '</input><br/>';
                });
                avagroup.innerHTML = html; 
            }
        } else {
            console.log("There is a problem:", data);
        }
    });

    // function createRadioElement(elem, value, ischecked){
    //     var ctl = document.createElement('input');
    //     ctl.type = 'radio';
    //     ctl.value = value;
    //     if (ischecked) ctl.checked = 'checked';
    //     elem.parentNode.insertBefore(ctl, elem.nextSibling);
    // }

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

    // function displaymessage(user, group, msg, color, bgcolor, align, lefticon, righticon) {
    //     // var msgline = '<div style="text-align: {{align}}; margin-bottom: 10px;">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px 5px 20px; font-size: 9px;">' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + msg + '</span> {{righticon}} </div>';
    //     // msgline = msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon);
    //     // content.innerHTML += msgline;
    //     // content.scrollTop = content.scrollHeight;
    // };

    function messagedisplay(verb, msg, user, group) {
        lefticon = righticon = align = bgcolor= color= msgline= icon='';
        width = '30px';
        height = '30px';

        // change bgcolor etc
        if (group != undefined && verb != 'post') {
            bgcolor = "#f5a614";  // color of the group (orange)
        }

        align = (verb == undefined? 'center' : (verb == 'post'? 'right' : 'left'));
        // bgcolor = (verb == undefined? 'white' : (verb == 'post'? '#00b300' : '#09bbd6'));
        bgcolor = (verb == undefined? 'white' : (verb == 'post'? '#00b300' /* green */ : (group != undefined? '#d96200' : '#09bbd6' /* blue */)));
        color = (verb == undefined? 'black' : 'white');

        if (verb != undefined) {
            icon = (verb == 'post'? '/resources/user-bot.png"' : '/resources/Pin.png"');
            s = '<img src="{{icon}}" style="border-radius:50%" alt="{{user}}" width={{width}} height={{height}} />';
            if (verb == 'post') righticon = ''; // no self icon. righticon = s;
            else lefticon = s;
        }

        msgline = '<div style="text-align: {{align}}; margin-bottom: 10px; height: {{height}}}}">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px; height: {{height}}; font-size: 12px;">' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + '<b> ' + msg + '</b> </span>  {{righticon}} </div>';
        // msgline = '<div style="text-align: {{align}}; margin-bottom: 10px; height: {{height}}}}">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px; height: {{height}}">' + '<b>' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + '</b> ' + msg + '</span> {{righticon}} </div>';
        msgline = msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon).replace('{{width}}', width).replace('{{height}}', height).replace('{{icon}}', icon);
        return msgline;
    };

    function printrooms(){     
        // var html;
        // var rooms = io.sockets.adapter.rooms;
        // if(!rooms) return 'Room not found';  
        // const arr = Array.from(rooms).filter(room => !room[1].has(room[0]));
        // // arrrooms = arr.map(i => i[0]);

        // for (var i = 0; i < arrrooms.length; i++) {
        //     html += '<input type="radio", class="ml-3" name="chat_target", value="history">' + arrrooms[i] + '</input>';
        // }
        // // return html;    
        // // avagroup.innerHTML = html;
        // return arr.map(i=> i[0]);
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

    chat_target.onclick = (e) => {
        var grp = e.value;
    };
})();
// window.onload = () => {// }