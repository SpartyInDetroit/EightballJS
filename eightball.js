/*
 * EightBall-JS
 * Version: 1.1 (8/27/2015)
 *
 * Forked from:
 * Konami-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var EightBall = function (callback) {
    var eightBall = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                }
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        input: "",
        pattern: "7381666576",
        message: function () {
            var messages = [
                "It is certain",
                "It is decidedly so",
                "Without a doubt",
                "Yes definitely",
                "You may rely on it",
                "As I see it, yes",
                "Most likely",
                "Outlook good",
                "Yes",
                "Signs point to yes",
                "Reply hazy try again",
                "Ask again later",
                "Better not tell you now",
                "Cannot predict now",
                "Concentrate and ask again",
                "Don't count on it",
                "My reply is no",
                "My sources say no",
                "Outlook not so good",
                "Very doubtful"
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        },
        load: function (link) {
            this.addEvent(document, "keydown", function (e, ref_obj) {
                if (ref_obj) eightBall = ref_obj; // IE
                eightBall.input += e ? e.keyCode : event.keyCode;
                if (eightBall.input.length >eightBall.pattern.length)
                    eightBall.input = eightBall.input.substr((eightBall.input.length - eightBall.pattern.length));
                if (eightBall.input == eightBall.pattern) {
                    eightBall.code(link);
                    eightBall.input = "";
                    e.preventDefault();
                    return false;
                }
            }, this);
        },
        code: function (link) {
            window.location = link
        }
    }

    typeof callback === "string" && eightBall.load(callback);
    if (typeof callback === "function") {
        eightBall.code = callback;
        eightBall.load();
    }

    return eightBall;
};

var easter_egg = new EightBall();
easter_egg.code = function () {
    $(".info_title").css("position", "relative");
    var shakes = 6;
    var distance = 6;
    var duration = 3;
    for (var s = 1; s <= shakes; s++) {
        $(".info_title").animate({ left: (distance * -1) }, (((duration / shakes) / 4)))
                        .animate({ left: distance }, ((duration / shakes) / 2))
                        .animate({ left: 0 }, (((duration / shakes) / 4)));
        if (s == 6) {
            $(".info_title").delay(800).text(easter_egg.message);
        }
    }
}
easter_egg.load();

// https://www.youtube.com/watch?v=dQw4w9WgXcQ