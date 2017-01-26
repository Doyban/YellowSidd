var quintusInput=function(e){"use strict";e.Input=function(e){var t=e.KEY_NAMES={LEFT:37,RIGHT:39,UP:38,DOWN:40,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,ENTER:13,ESC:27,BACKSPACE:8,TAB:9,SHIFT:16,CTRL:17,ALT:18,SPACE:32,HOME:36,END:35,PGGUP:33,PGDOWN:34},n={LEFT:"left",RIGHT:"right",UP:"up",DOWN:"down",SPACE:"fire",Z:"fire",X:"action",ENTER:"confirm",ESC:"esc",P:"P",S:"S"},i=[["left","<"],["right",">"],[],["action","b"],["fire","a"]],o=["up","right","down","left"];e.inputs={},e.joypad={};var s=!!("ontouchstart"in window);e.canvasToStageX=function(t,n){return t=t/e.cssWidth*e.width,n.viewport&&(t/=n.viewport.scale,t+=n.viewport.x),t},e.canvasToStageY=function(t,n){return t=t/e.cssWidth*e.width,n.viewport&&(t/=n.viewport.scale,t+=n.viewport.y),t},e.InputSystem=e.Evented.extend({keys:{},keypad:{},keyboardEnabled:!1,touchEnabled:!1,joypadEnabled:!1,bindKey:function(n,i){e.input.keys[t[n]||n]=i},enableKeyboard:function(){return this.keyboardEnabled?!1:(e.el.tabIndex=0,e.el.style.outline=0,e.el.addEventListener("keydown",function(t){if(e.input.keys[t.keyCode]){var n=e.input.keys[t.keyCode];e.inputs[n]=!0,e.input.trigger(n),e.input.trigger("keydown",t.keyCode)}t.ctrlKey||t.metaKey||t.preventDefault()},!1),e.el.addEventListener("keyup",function(t){if(e.input.keys[t.keyCode]){var n=e.input.keys[t.keyCode];e.inputs[n]=!1,e.input.trigger(n+"Up"),e.input.trigger("keyup",t.keyCode)}t.preventDefault()},!1),e.options.autoFocus&&e.el.focus(),void(this.keyboardEnabled=!0))},keyboardControls:function(t){t=t||n,e._each(t,function(e,t){this.bindKey(t,e)},e.input),this.enableKeyboard()},_containerOffset:function(){e.input.offsetX=0,e.input.offsetY=0;var t=e.el;do e.input.offsetX+=t.offsetLeft,e.input.offsetY+=t.offsetTop;while(t=t.offsetParent)},touchLocation:function(t){var n,i,o=(e.el,t.offsetX),s=t.offsetY;return(e._isUndefined(o)||e._isUndefined(s))&&(o=t.layerX,s=t.layerY),(e._isUndefined(o)||e._isUndefined(s))&&(void 0===e.input.offsetX&&e.input._containerOffset(),o=t.pageX-e.input.offsetX,s=t.pageY-e.input.offsetY),n=e.width*o/e.cssWidth,i=e.height*s/e.cssHeight,{x:n,y:i}},touchControls:function(t){function n(n){for(var i=e.input.touchLocation(n),o=t.bottom-t.unit,s=0,r=t.controls.length;r>s;s++){var u=s*t.unit+t.gutter;if(i.x>=u&&i.x<=u+t.size&&(t.fullHeight||i.y>=o+t.gutter&&i.y<=o+t.unit-t.gutter))return t.controls[s][0]}}function o(i){var o,s,r,u,a,l={};for(o=0,s=t.controls.length;s>o;o++)a=t.controls[o][0],e.inputs[a]&&(l[a]=!0),e.inputs[a]=!1;var d=i.touches?i.touches:[i];for(o=0,s=d.length;s>o;o++)r=d[o],u=n(r),u&&(e.inputs[u]=!0,l[u]?delete l[u]:e.input.trigger(u));for(a in l)e.input.trigger(a+"Up");return null}return this.touchEnabled?!1:s?(e.input.keypad=t=e._extend({left:0,gutter:10,controls:i,width:e.width,bottom:e.height,fullHeight:!1},t),t.unit=t.width/t.controls.length,t.size=t.unit-2*t.gutter,this.touchDispatchHandler=function(e){o(e),e.preventDefault()},e._each(["touchstart","touchend","touchmove","touchcancel"],function(t){e.el.addEventListener(t,this.touchDispatchHandler)},this),void(this.touchEnabled=!0)):!1},disableTouchControls:function(){e._each(["touchstart","touchend","touchmove","touchcancel"],function(t){e.el.removeEventListener(t,this.touchDispatchHandler)},this),e.el.removeEventListener("touchstart",this.joypadStart),e.el.removeEventListener("touchmove",this.joypadMove),e.el.removeEventListener("touchend",this.joypadEnd),e.el.removeEventListener("touchcancel",this.joypadEnd),this.touchEnabled=!1;for(var t in e.inputs)e.inputs[t]=!1},joypadControls:function(t){if(this.joypadEnabled)return!1;if(!s)return!1;var n=e.joypad=e._defaults(t||{},{size:50,trigger:20,center:25,color:"#CCC",background:"#000",alpha:.5,zone:e.width/2,joypadTouch:null,inputs:o,triggers:[]});this.joypadStart=function(t){if(null===n.joypadTouch){var i=t.changedTouches[0],o=e.input.touchLocation(i);o.x<n.zone&&(n.joypadTouch=i.identifier,n.centerX=o.x,n.centerY=o.y,n.x=null,n.y=null)}},this.joypadMove=function(t){if(null!==n.joypadTouch)for(var i=t,o=0,s=i.changedTouches.length;s>o;o++){var r=i.changedTouches[o];if(r.identifier===n.joypadTouch){var u=e.input.touchLocation(r),a=u.x-n.centerX,l=u.y-n.centerY,d=Math.sqrt(a*a+l*l),p=Math.max(1,d/n.size),c=Math.atan2(a,l);p>1&&(a/=p,l/=p,d/=p);for(var f=[l<-n.trigger,a>n.trigger,l>n.trigger,a<-n.trigger],h=0;h<f.length;h++){var v=n.inputs[h];f[h]?(e.inputs[v]=!0,n.triggers[h]||e.input.trigger(v)):(e.inputs[v]=!1,n.triggers[h]&&e.input.trigger(v+"Up"))}e._extend(n,{dx:a,dy:l,x:n.centerX+a,y:n.centerY+l,dist:d,ang:c,triggers:f});break}}t.preventDefault()},this.joypadEnd=function(t){var i=t;if(null!==n.joypadTouch)for(var o=0,s=i.changedTouches.length;s>o;o++){var r=i.changedTouches[o];if(r.identifier===n.joypadTouch){for(var u=0;u<n.triggers.length;u++){var a=n.inputs[u];e.inputs[a]=!1,n.triggers[u]&&e.input.trigger(a+"Up")}n.joypadTouch=null;break}}t.preventDefault()},e.el.addEventListener("touchstart",this.joypadStart),e.el.addEventListener("touchmove",this.joypadMove),e.el.addEventListener("touchend",this.joypadEnd),e.el.addEventListener("touchcancel",this.joypadEnd),this.joypadEnabled=!0},mouseControls:function(t){t=t||{};var n=t.stageNum||0,i=t.mouseX||"mouseX",o=t.mouseY||"mouseY",s=t.cursor||"off",r={};"on"!==s&&("off"===s?e.el.style.cursor="none":e.el.style.cursor=s),e.inputs[i]=0,e.inputs[o]=0,e._mouseMove=function(t){t.preventDefault();var s=t.touches?t.touches[0]:t,u=e.el,a=u.getBoundingClientRect(),l=window.getComputedStyle(u),d=s.clientX-a.left-parseInt(l.paddingLeft,10),p=s.clientY-a.top-parseInt(l.paddingTop,10),c=e.stage(n);(e._isUndefined(d)||e._isUndefined(p))&&(d=s.offsetX,p=s.offsetY),(e._isUndefined(d)||e._isUndefined(p))&&(d=s.layerX,p=s.layerY),(e._isUndefined(d)||e._isUndefined(p))&&(void 0===e.input.offsetX&&e.input._containerOffset(),d=s.pageX-e.input.offsetX,p=s.pageY-e.input.offsetY),c&&(r.x=e.canvasToStageX(d,c),r.y=e.canvasToStageY(p,c),e.inputs[i]=r.x,e.inputs[o]=r.y,e.input.trigger("mouseMove",r))},e._mouseWheel=function(t){t=window.event||t;var n=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));e.input.trigger("mouseWheel",n)},e.el.addEventListener("mousemove",e._mouseMove,!0),e.el.addEventListener("touchstart",e._mouseMove,!0),e.el.addEventListener("touchmove",e._mouseMove,!0),e.el.addEventListener("mousewheel",e._mouseWheel,!0),e.el.addEventListener("DOMMouseScroll",e._mouseWheel,!0)},disableMouseControls:function(){e._mouseMove&&(e.el.removeEventListener("mousemove",e._mouseMove,!0),e.el.removeEventListener("mousewheel",e._mouseWheel,!0),e.el.removeEventListener("DOMMouseScroll",e._mouseWheel,!0),e.el.style.cursor="inherit",e._mouseMove=null)},drawButtons:function(){var t=e.input.keypad,n=e.ctx;n.save(),n.textAlign="center",n.textBaseline="middle";for(var i=0;i<t.controls.length;i++){var o=t.controls[i];if(o[0]){n.font="bold "+t.size/2+"px arial";var s=t.left+i*t.unit+t.gutter,r=t.bottom-t.unit,u=e.inputs[o[0]];n.fillStyle=t.color||"#FFFFFF",n.globalAlpha=u?1:.5,n.fillRect(s,r,t.size,t.size),n.fillStyle=t.text||"#000000",n.fillText(o[1],s+t.size/2,r+t.size/2)}}n.restore()},drawCircle:function(t,n,i,o){var s=e.ctx,r=e.joypad;s.save(),s.beginPath(),s.globalAlpha=r.alpha,s.fillStyle=i,s.arc(t,n,o,0,2*Math.PI,!0),s.closePath(),s.fill(),s.restore()},drawJoypad:function(){var t=e.joypad;null!==t.joypadTouch&&(e.input.drawCircle(t.centerX,t.centerY,t.background,t.size),null!==t.x&&e.input.drawCircle(t.x,t.y,t.color,t.center))},drawCanvas:function(){this.touchEnabled&&this.drawButtons(),this.joypadEnabled&&this.drawJoypad()}}),e.input=new e.InputSystem,e.controls=function(t){return e.input.keyboardControls(),t?(e.input.touchControls({controls:[[],[],[],["action","b"],["fire","a"]]}),e.input.joypadControls()):e.input.touchControls(),e},e.component("platformerControls",{defaults:{speed:200,jumpSpeed:-300,collisions:[]},added:function(){var t=this.entity.p;e._defaults(t,this.defaults),this.entity.on("step",this,"step"),this.entity.on("bump.bottom",this,"landed"),t.landed=0,t.direction="right"},landed:function(e){var t=this.entity.p;t.landed=.2},step:function(t){var n=this.entity.p;if(void 0===n.ignoreControls||!n.ignoreControls){var i=null;if(void 0!==n.collisions&&n.collisions.length>0&&(e.inputs.left||e.inputs.right||n.landed>0)){if(1===n.collisions.length)i=n.collisions[0];else{i=null;for(var o=0;o<n.collisions.length;o++)n.collisions[o].normalY<0&&(i=n.collisions[o])}null!==i&&i.normalY>-.3&&i.normalY<.3&&(i=null)}e.inputs.left?(n.direction="left",i&&n.landed>0?(n.vx=n.speed*i.normalY,n.vy=-n.speed*i.normalX):n.vx=-n.speed):e.inputs.right?(n.direction="right",i&&n.landed>0?(n.vx=-n.speed*i.normalY,n.vy=n.speed*i.normalX):n.vx=n.speed):(n.vx=0,i&&n.landed>0&&(n.vy=0)),n.landed>0&&(e.inputs.up||e.inputs.action)&&!n.jumping?(n.vy=n.jumpSpeed,n.landed=-t,n.jumping=!0):(e.inputs.up||e.inputs.action)&&(this.entity.trigger("jump",this.entity),n.jumping=!0),!n.jumping||e.inputs.up||e.inputs.action||(n.jumping=!1,this.entity.trigger("jumped",this.entity),n.vy<n.jumpSpeed/3&&(n.vy=n.jumpSpeed/3))}n.landed-=t}}),e.component("stepControls",{added:function(){var e=this.entity.p;e.stepDistance||(e.stepDistance=32),e.stepDelay||(e.stepDelay=.2),e.stepWait=0,this.entity.on("step",this,"step"),this.entity.on("hit",this,"collision")},collision:function(e){var t=this.entity.p;t.stepping&&(t.stepping=!1,t.x=t.origX,t.y=t.origY)},step:function(t){var n=this.entity.p;n.stepWait-=t,n.stepping&&(n.x+=n.diffX*t/n.stepDelay,n.y+=n.diffY*t/n.stepDelay),n.stepWait>0||(n.stepping&&(n.x=n.destX,n.y=n.destY),n.stepping=!1,n.diffX=0,n.diffY=0,e.inputs.left?n.diffX=-n.stepDistance:e.inputs.right&&(n.diffX=n.stepDistance),e.inputs.up?n.diffY=-n.stepDistance:e.inputs.down&&(n.diffY=n.stepDistance),(n.diffY||n.diffX)&&(n.stepping=!0,n.origX=n.x,n.origY=n.y,n.destX=n.x+n.diffX,n.destY=n.y+n.diffY,n.stepWait=n.stepDelay))}})}};"undefined"==typeof Quintus?module.exports=quintusInput:quintusInput(Quintus);