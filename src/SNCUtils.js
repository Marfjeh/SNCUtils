/* global navigator */
/* global Element */
/*
Global TODO: 
- Fix GetReq, always returns null.
- Sleep broken.
- Dpi Testen op mobile Device, of een device die een andere DPI heeft
*/
var SNCUtils = function() {
    var version = "2.0.1",
        relDate = new Date("12-5-2016");
    this.enabled = true;
    var videoplayer = [] // Amount of Videoplayers onscreen

    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      }
    };
      String.prototype.replaceAll = function(search, replacement) {
          var target = this;
          return target.replace(new RegExp(search, 'g'), replacement);
      };
      
      this.useragent = function() {
        var useragent = null;
        if (navigator.userAgent.indexOf("Chrome") != -1) {
          useragent = "Chrome/Edge";
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
          useragent = "Opera";
        } else if (navigator.userAgent.indexOf("Firefox") != -1) {
          useragent = "Firefox";
        } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
          useragent = "Internet Explorer";
        } else if (navigator.userAgent.indexOf("AppleWebKit") != -1) {
          useragent = "Safari";
        } else {
          useragent = "Unknown";
          console.log("[SNCUtils] Warning! Unkown Useragent: " + navigator.userAgent);
        }
        return (useragent);
      }

      this.detectMob = function() {
        if (navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/webOS/i) ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/iPod/i) ||
          navigator.userAgent.match(/BlackBerry/i) ||
          navigator.userAgent.match(/Windows Phone/i)
        ) {
          return true;
        } else {
          return false;
        }
      };
      
      this.getResolution = function() {
        if(window != null) { 
          return([window.innerWidth,window.innerHeight]);
        }
        else {
         return([window.screen.availHeight , window.screen.availWidth]);
        }
      }
      
      this.getDpi = function() //Not IE ready. but who cares.
      {
      	if(this.useragent() != "Internet Explorer") {
      		return(window.devicePixelRatio);
      	} else {
      		console.warn("Microsoft Internet Explorer does not support this feature"); // Unreachable code. How sad.
      		return null;
      	}
      }

      this.fullscreen = function(element) { // fullscreen(document.documentElement); Notice: this only works with user input such a button. or else it will be denied by the webbrouser.
        if (element == null)
        {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
        else
        {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
        }
      };


      this.makeIframe = function(id, url, height, width) {
        (id, "<iframe src='" + url + "' scrolling='no' frameborder='0' marginheight='0px' marginwidth='0px' height='" + height + "' width='" + width + "'></iframe>");
      };

      this.playvideo = function(file, div) { //voor video een hash generen zodat er bijvoorbeeld de video element kan beheren met een nieuwe functie?
        if (typeof(div) === "string") {
          div = document.querySelector(div);
        }
        this.videoplayer[this.videoplayer.length] = document.createElement("video");
        this.videoplayer[this.videoplayer.length - 1].src = file;
        div.appendChild(this.videoplayer[this.videoplayer.length - 1]);
        return true;
      };

      this.datenow = function(format) {
        if (format == null) {
          format = "-";
        }
        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        return (currentDate.getDate() + format + month + format + currentDate.getFullYear());
      };

      this.timenow = function(format) {
        if (format == null) {
          format = ":";
        }
        var currentDate = new Date();
        return (currentDate.getHours() + format + currentDate.getMinutes() + format + currentDate.getSeconds());
      };

      this.addtoelement = function(div, text) {
        if (typeof(div) === "object") {
          div.innerHTML = div.innerHTML + text;
        } else if (typeof(div) === "string") {
          var divvar = document.getElementById(div);
          divvar.innerHTML = divvar.innerHTML + text;
        }
      };

      this.addtoelementln = function(div, text) {
        if (typeof(div) === "object") {
          div.innerHTML = div.innerHTML + text + "<br>";
        } else if (typeof(div) === "string") {
          var divvar = document.getElementById(div);
          divvar.innerHTML = divvar.innerHTML + text + "<br>";
        }
      };

      this.settoelement = function(div, text) {
        if (typeof(div) === "object") {
          div.innerHTML = text;
        } else if (typeof(div) === "string") {
          var divvar = document.querySelector(div);
          divvar.innerHTML = text;
        }
      };

      this.clearelement = function(div) {
        var divvar = document.getElementById(div);
        divvar.innerHTML = "";
      };

      this.getReq = function() { 
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
          return decodeURIComponent(name[1]);
        } else {
          return null;
        }
      };

      this.sleep = function(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      };
    };
// newObject.enabled evaluates to true
// newObject.useragent evaluates to Chrome or whatever



/*
var mjversie = "1.4.2";
var mjdate = "15-4-2016";
var mjactive = 1;


// useragent Dectector
function useragent() {
    var useragent = null;
    if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        useragent = "Chrome/Edge";
    }
    else if(navigator.userAgent.indexOf("Opera") != -1 ) {
        useragent = "Opera";
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
        useragent = "Firefox";
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        useragent = "Internet Explorer";
    }
    else if(navigator.userAgent.indexOf("AppleWebKit") != -1 ) {
        useragent = "Safari";
    }
    else {
        useragent =  "?";
    }
    return (useragent);
}

function detectMob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
// end

function log( text_string ) {
    console.log("["+ datenow("-") + " " + timenow(":") +" | MarfFrameWork Log] "+ text_string);
}

function goUrl(URL) {
  window.location.href = URL;
}

function About() {
  return("This page uses MarfFrameWork Version: " + mjversie + " Versie date: " + mjdate);
}

function goBack() {
  window.history.back();
}

function GoHome() { // Ga naar default home pagina
    if (typeof window.home == 'function') {
        window.home();
    } else if (document.all) {
        window.location.href = "about:home";
    } else {
        window.location.replace('about:blank');
    }
}

function fullscreen(element) { // fullscreen(document.documentElement); Notice: this only works with user input such a button.
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// **** PUSH API START **** WIP

function PushPermission()
{
	if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
    log ("Push permissions granted");
        return true;
  } else {
    window.webkitNotifications.requestPermission();
  }
}

function pushsupport()
{
	if (window.webkitNotifications) {
 		log("Notifications are supported!");
        return true;
	}
	else {
  		log("Notifications are not supported for this Browser/OS version yet.");
        return false;
	}
}

// **** PUSH API END ****

// SmoothScrolling, this works with a element that has a ID like: <p id="one">. To scroll to that element you can use a hyperlink such as <a href="#one">Scroll to one</a> This needs jqeury!
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 75
        }, 1250, "easeInOutExpo");
        return false;
      }
    }
  });
});

function playmusic(file, type) {
    $("body").append("<audio autoplay id='audioplayer'> <source src='" + file + "' type='audio/"+ type + "'></audio>");
    var aud = document.getElementById("audioplayer");
    aud.onended = function() {
        delelement("audioplayer");
    };
    return true;
}

function playvideo(file, type, div) {
    $(div).append("<video autoplay id='audioplayer'> <source src='" + file + "' type='audio/"+ type + "'></video>");
    var aud = document.getElementById("audioplayer");
    aud.onended = function() {
        delelement("audioplayer");
    };
    return true;
}

function datenow(format) {
    if (format == null) {
        format = "-";
    }
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return (day + format + month + format + year);
}

function timenow(format) {
    if (format == null) {
        format = ":";
    }
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var mins = currentDate.getMinutes();
    var sec = currentDate.getSeconds();
    return (hour + format + mins + format + sec);
}

function addtoelement(div, text) {
    var divvar = document.getElementById(div);
    divvar.innerHTML = divvar.innerHTML + text;
}

function addtoelementln(div, text) {
    var divvar = document.getElementById(div);
    divvar.innerHTML = divvar.innerHTML + text + "<br>";
}

function settoelement(div, text) {
    var divvar = document.getElementById(div);
    divvar.innerHTML = text;
}

function clearelement(div) {
    var divvar = document.getElementById(div);
    divvar.innerHTML = "";
}

function delelement(div) {
    $(div).remove();
}

function makeIframe(id, url, height, width) {
    addtoelementln(id,"<iframe src='" + url + "' scrolling='no' frameborder='0' marginheight='0px' marginwidth='0px' height='" + height +"' width='" + width + "'></iframe>");
}

// Cookies it is old, but sometimes its useful.

function makeCookie(name, value, exp) {
	if (exp) {
		var date = new Date();
        date.setTime(exp2.getTime()+(date*24*60*60*1000));
		var expliredate = "; expires="+date.toGMTString();
	}
    else {
        var expliredate = "";
    }
    document.cookie = name + "=" + value + expliredate + ";path=/"
}

function readCookie(name) {
    var namecookie = name + "=";
    var cookieArray = document.cookie.split(";");

    for (var i=0; i < cookieArray.length; i++) {
        var thiscookie = cookieArray[i];
        while (thiscookie.charAt(0)==' ')
        {
            thiscookie = thiscookie.substring(1, thiscookie.length);
        }

        if (thiscookies.indexOf(namecookie) == 0)
        {
            return thiscookie.substring(namecookie.length, thiscookie.length);
        }
    }
    return null;
}

function delCookie(name) {
    makeCookie(name, "",-1);
}

function getReq() {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
    {
        return decodeURIComponent(name[1]);
    }
    else
    {
        return null;
    }
}

*/