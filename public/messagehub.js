/*  
 *  handles message formatting and styling
*/

const msghub = (() => {

function messagedisplay(verb, msg, user, group) {
        lefticon = '';
        righticon = '';
        align=''; 
        bgcolor=''; 
        color='';
        msgline='';
        icon='';
        width = '30px';
        height = '30px';

        // change bgcolor etc
        if (group != undefined && verb != 'post') {
            bgcolor = "#f5a614";  // color of the group (orange)
            height = "40px";
            width = "40px";
        }

        align =(verb == undefined? 'center' : (verb == 'post'? 'right' : 'left'));
        bgcolor =(verb == undefined? 'white' : (verb == 'post'? '#00b300' /* green */ : '#09bbd6' /* blue */));
        color = (verb == undefined? 'black' : 'white');

        if (verb != undefined) {
            icon = (verb == 'post'? '/resources/user-bot.png"' : '/resources/Pin.png"');
            s = '<img src="{{icon}}" style="border-radius:50%" alt="{{user}}" width={{width}} height={{height}} />';
            if (verb == 'post') righticon = ''; // no self icon. righticon = s;
            else lefticon = s;
        }

        msgline = '<div style="text-align: {{align}}; margin-bottom: 10px; height: {{height}}}}">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px; height: {{height}}">' + '<b>' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + '</b> ' + msg + '</span> {{righticon}} </div>';
        msgline = msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon).replace('{{width}}', width).replace('{{height}}', height).replace('{{icon}}', icon);
        return msgline;
    };

// // parent - Messagebase
// class Messagebase {
//     constructor();
//     constructor(verb, msg) {
//         this.verb = verb;
//         this.msg = msg;

//         align =(verb == undefined? 'center' : (verb == 'post'? 'right' : 'left'));
//         bgcolor =(verb == undefined? 'white' : (verb == 'post'? '#00b300' : '#09bbd6'));
//         color = (verb == undefined? 'black' : 'white');
//         if (verb != undefined) {
//             icon = (verb == 'post'? '/resources/jlin.png"' : '/resources/Pin.png"');
//             s = '<img src="{{icon}}" style="border-radius:50%" alt="{{user}}" width={{width}} height={{height}} />';
//             if (verb == 'post') righticon = s;
//             else lefticon = s;
//         }

//         msgline = '<div style="text-align: {{align}}; margin-bottom: 10px; height: {{height}}}}">{{lefticon}}<span style="background: {{background}}; color: {{color}}; border-radius: 10px; padding: 3px 20px; height: {{height}}">' + '<b>' + (user? '[' + user + ' said' + (group? ' to group (' + group + ')' : '') + ']' : '') + '</b> ' + msg + '</span> {{righticon}} </div>';
      
//         // msgline = '<div style="text-align: {{align}}; margin-bottom: 10px;">{{lefticon}}<span style="background: {{background}}; ' +
//         // 'color: {{color}}; border-radius: 10px; padding: 3px 20px; height: {{height}}">' + '<b>' + (user? '[' + user + ' said' + 
//         // (group? ' to group (' + group + ')' : '') + ']' : '') + '</b> ' + msg + '</span> {{righticon}} </div>';
//     }
    
//     verb = undefined;
//     lefticon = '';
//     righticon = '';
//     align = ''; 
//     bgcolor = ''; 
//     color ='';
//     user = undefined;
//     group = undefined;
//     msgline = '';
//     msg = undefined;
//     icon = undefined;
//     width = '30px';
//     height = '30px';

//     displayMessage() {
//         msgline = msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon).replace('{{width}}', width).replace('{{height}}', height).replace('{{icon}}', icon);
//         // this.msgline = this.msgline.replace('{{align}}', align).replace('{{background}}', bgcolor).replace('{{color}}', color).replace('{{lefticon}}', lefticon).replace('{{righticon}}', righticon);
//         return this.msgline;
//     }
// }


// class UserMessage extends Messagebase {
//     constructor(verb, msg, user) {
//         this.verb = verb;
//         this.msg = msg;
//         this.user = user;

//         super(verb, msg);
//     }
// }

// class GroupMessage extends Messagebase {
//     constructor(verb, msg, group, user) {
//         this.verb = verb;
//         this.msg = msg;
//         this.user = user;
//         this.group = group;

//         super(verb, msg);

//         // change bgcolor
//         if (verb != 'post') {
//             this.bgcolor = "#f5a614";  // color of the group
//             this.height = "40px";
//             this.width = "40px";
//         }
//     }
// }

    // outside access
    return {
        messagedisplay: messagedisplay
    }

})();