//==========================================================================
// EliMZ_MobileControls.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.2.0♦ Add responsive on screen controls to mobile games!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-mobile-controls-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-mobile-controls-for-rpg-maker/rate?source=game

Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Add responsive buttons on the screen for mobile games.
● Hide/show buttons on message.
● Special Button that can show/hide all other buttons.
● Two types of movement buttons: Directional pad and Joystick.
● Disable touch screen movement
● Disable double touch menu
● Work with diagonals
● Assign buttons to any keyboard key or script call.
● Cold and hot images for every button.
● Set vibration for Regular buttons.
● Can choose if you want to enable/disable the plugin according to 
platform: Mobile, Web, and Desktop.
● Set buttons to only be allowed on specific scenes and/or set a custom 
script condition!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1jCGESiSowTvgLrF3EGGwuVsOcbxwlqXe_LE84idhINE/edit?usp=sharing

============================================================================

@param allowedPlatforms
@text Allowed Platforms
@type select[]
@option Desktop
@option Mobile
@option Web Browser
@desc Select the platforms you want the plugin to be enabled.
@default []

@param disableScreenMove
@text Disable screen movement
@type boolean
@desc Disable the click/touch anywhere on the screen to move.
@default true

@param disableDoubleTouchMenu
@text Disable double touch menu
@type boolean
@desc Disable the double touch or right click opens menu feature.
@default true

@param hideOnMessage
@text Hide on message
@type boolean
@desc True if you want to hide buttons on message.
@default false

@param fixButtonSize
@text Fix Button Size
@type boolean
@desc See help file.
@default false

@param fixButtonInterval
@text Fix Button Interval
@type text
@desc The time interval, in frames, that the buttons will fix their size.
@default 120
@parent fixButtonSize

@param controlButton
@text Control Buttons
@type struct<controlButtonST>
@desc A button that can hide/show all buttons.
@default {"enable":"false","img":"","width":"5","horizontalOrientation":"left","padX":"2","verticalOrientation":"top","padY":"2","vibration":"0","enableScreenMove":"true","enableDoubleTouchMenu":"true"}

@param buttons
@text Regular Buttons
@type struct<buttonsST>[]
@desc Configure here all buttons that will represent keyboard keys.
@default []

@param dPadType
@text Dpad type
@type select
@option singlePad
@option joystick
@option none
@desc Choose your directional pad type.
@default singlePad

@param singlePad
@text Single Pad
@type struct<singlePadST>
@desc A single image that can handle the player movement/directions.
@default {"scenes":"[]","img":"","baseWidth":"20","horizontalOrientation":"left","padX":"2","verticalOrientation":"bottom","padY":"2"}
@parent dPadType

@param joystickPad
@text Joystick
@type struct<joystickST>
@desc A joystick pad that moves the player along with a stick inside an area.
The stick follows the fingers/mouse on screen.
@default {"scenes":"[]","baseImg":"","baseWidth":"20","ballImg":"","ballWidth":"4","extraDistance":"0","horizontalOrientation":"left","padX":"2","verticalOrientation":"bottom","padY":"2"}
@parent dPadType

*/

/* ------------------------------- SINGLE PAD ------------------------------- */
{

/*~struct~singlePadST:

@param scenes
@text Allowed Scenes
@type combo[]
@option Scene_Title @option Scene_Map @option Scene_Menu @option Scene_Item @option Scene_Skill @option Scene_Equip @option Scene_Status @option Scene_Options @option Scene_Save @option Scene_Load @option Scene_GameEnd @option Scene_Shop @option Scene_Name @option Scene_Debug @option Scene_Name @option Scene_Battle @option Scene_Gameover @option Scene_Lang @option Scene_Guide @option Scene_PostMessage
@desc A list of all scenes that will use this button.
It is case sensitive.
@default []

@param condition
@text Allowed Condition
@type multiline_string
@desc A custom condition to show this button, besides the scene.
@default return true

@param img
@text Image File
@type file
@dir img/screen_controls
@desc The image used for the dpad.
@default 

@param baseWidth
@text Image Size
@type number
@desc Set the size of the image based on px.
Default is 20%
@default 20
@parent baseImg

@param horizontalOrientation
@text Horizontal Position
@type select
@option left
@option right
@desc The orientation of the image. If left, the Pad X will push it right. Otherwise, will push it left.
@default left

@param padX
@text Padding X
@type number
@desc The distance in % that the image will be from the horizontal border of the screen.
@default 2
@parent horizontalOrientation

@param verticalOrientation
@text Vertical Position
@type select
@option bottom
@option top
@desc The orientation of the image. If bottom, the Pad Y will push it up. Otherwise, will push it down.
@default bottom

@param padY
@text Padding Y
@type number
@desc The distance in % that the image will be from the vertical border of the screen.
@default 2
@parent verticalOrientation

*/

}

/* ------------------------------ JOYSTICK PAD ------------------------------ */
{

/*~struct~joystickST:

@param scenes
@text Allowed Scenes
@type combo[]
@option Scene_Title @option Scene_Map @option Scene_Menu @option Scene_Item @option Scene_Skill @option Scene_Equip @option Scene_Status @option Scene_Options @option Scene_Save @option Scene_Load @option Scene_GameEnd @option Scene_Shop @option Scene_Name @option Scene_Debug @option Scene_Name @option Scene_Battle @option Scene_Gameover @option Scene_Lang @option Scene_Guide @option Scene_PostMessage
@desc A list of all scenes that will use this button.
It is case sensitive.
@default []

@param condition
@text Allowed Condition
@type multiline_string
@desc A custom condition to show this button, besides the scene.
@default return true

@param baseImg
@text Background Image File
@type file
@dir img/screen_controls
@desc The image used for the background/base joystick.
@default 

@param baseWidth
@text Background Image Size
@type number
@min 0
@max 100
@desc Set the background/base image size based on the screen area percent.
Default is 20%
@default 20
@parent baseImg

@param ballImg
@text Joystick Ball Image
@type file
@dir img/screen_controls
@desc The image used for the stick(joystick ball).
@default

@param ballWidth
@text Joystick Ball Width
@type number
@min 0
@max 100
@desc Set the stick size based on the screen area percent.
Default is 4%
@default 4
@parent ballImg

@param extraDistance
@text Extra Range
@type text
@desc How far the joystick ball can go when dragging it outside the base image.
@default 0
@parent ballImg

@param horizontalOrientation
@text Horizontal Position
@type select
@option left
@option right
@desc The orientation of the image. If left, the Pad X will push it right. Otherwise, will push it left.
@default left

@param padX
@text Padding X
@type number
@desc The distance in % that the image will be from the horizontal border of the screen.
@default 2
@parent horizontalOrientation

@param verticalOrientation
@text Vertical Position
@type select
@option bottom
@option top
@desc The orientation of the image. If bottom, the Pad Y will push it up. Otherwise, will push it down.
@default bottom

@param padY
@text Padding Y
@type number
@desc The distance in % that the image will be from the vertical border of the screen.
@default 2
@parent verticalOrientation

*/

}

/* ----------------------------- REGULAR BUTTONS ---------------------------- */
{

/*~struct~buttonsST:

@param key
@text Keyboard key
@type select
@option script @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply" @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Put the keyboard letter here.
If you want to use a script choose "script".
@default z

@param scriptIn
@text Script In
@type note
@desc The script call to run when button is pressed.
@default 

@param scriptOut
@text Script Out
@type note
@desc The script call to run when button is not pressed anymore.
@default

@param scenes
@text Allowed Scenes
@type combo[]
@option Scene_Title @option Scene_Map @option Scene_Menu @option Scene_Item @option Scene_Skill @option Scene_Equip @option Scene_Status @option Scene_Options @option Scene_Save @option Scene_Load @option Scene_GameEnd @option Scene_Shop @option Scene_Name @option Scene_Debug @option Scene_Name @option Scene_Battle @option Scene_Gameover @option Scene_Lang @option Scene_Guide @option Scene_PostMessage
@desc A list of all scenes that will use this button.
It is case sensitive.
@default []

@param condition
@text Allowed Condition
@type multiline_string
@desc A custom condition to show this button, besides the scene.
@default return true

@param img
@text Image
@type file
@dir img/screen_controls
@desc The image used for the button.
@default 

@param width
@text Size
@type number
@desc Set the size according to px.
@default 5

@param horizontalOrientation
@text Horizontal Position
@type select
@option left
@option right
@desc The orientation of the image. If left, the Pad X will push it right. Otherwise, will push it left.
@default left

@param padX
@text Padding X
@type number
@desc The distance in % that the image will be from the horizontal border of the screen.
@default 2
@parent horizontalOrientation

@param verticalOrientation
@text Vertical Position
@type select
@option bottom
@option top
@desc The orientation of the image. If bottom, the Pad Y will push it up. Otherwise, will push it down.
@default bottom

@param padY
@text Padding Y
@type number
@desc The distance in % that the image will be from the vertical border of the screen.
@default 2
@parent verticalOrientation

@param vibration
@text Vibration
@type text
@desc The vibration in miliseconds. Leave it 0 for no vibration.
@default 0

*/

}

/* ----------------------------- CONTROL BUTTON ----------------------------- */
{

/*~struct~controlButtonST:

@param enable
@text Enable Control Button
@type boolean
@desc Set true to use this button.
@default true

@param img
@text Image
@type file
@dir img/screen_controls
@desc The image used for the button.
@default 

@param width
@text Size
@type number
@desc Set the size according to px.
@default 5

@param horizontalOrientation
@text Horizontal Position
@type select
@option left
@option right
@desc The orientation of the image. If left, the Pad X will push it right. Otherwise, will push it left.
@default left

@param padX
@text Padding X
@type number
@desc The distance in % that the image will be from the horizontal border of the screen.
@default 2
@parent horizontalOrientation

@param verticalOrientation
@text Vertical Position
@type select
@option bottom
@option top
@desc The orientation of the image. If bottom, the Pad Y will push it up. Otherwise, will push it down.
@default top

@param padY
@text Padding Y
@type number
@desc The distance in % that the image will be from the vertical border of the screen.
@default 2
@parent verticalOrientation

@param vibration
@text Vibration
@type number
@desc The vibration in miliseconds. Leave it 0 for no vibration.
@default 0

@param enableScreenMove
@text Enable screen movement
@type boolean
@desc Set to true if you want to enable screen movement when hiding the controls.
@default true

@param enableDoubleTouchMenu
@text Enable double touch menu
@type boolean
@desc Set to true if you want to enable menu call with double touch when hiding the controls.
@default true

*/
    
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MobileControls = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

var CONTROLS_PATH = "img/screen_controls/"

/* ------------------------------- BUTTON BASE ------------------------------ */
function BaseButton() {
    this.initMembers();
}

    BaseButton.prototype.initMembers = function(){
        this.area = new Rectangle(0, 0, 0, 0)
        this.isOffScreen = false
        this.active = false
        this.touchId = null
        this.divs = [document.createElement("div")]
        this.imgs = [document.createElement("img")]
    }

    BaseButton.prototype.createArea = function(){
        var mainRect = standardizeRect(this.divs[0].getBoundingClientRect());
        this.area = new Rectangle(mainRect.x, mainRect.y, mainRect.width, mainRect.height)
    }

    BaseButton.prototype.initialize = function(parameters){
        this.setParameters(parameters)
    }

    BaseButton.prototype.setParameters = function(parameters){
        this.parameters = parameters
    }

    BaseButton.prototype.getScreenUnitsByOrientation = function(){
        return ["px", "px"];
        if(Plugin.isLandscape()){
            return ["vw", "vh"]
        }else{
            return ["vh", "vw"]
        }
    }

    BaseButton.prototype.deactivate = function(){
		this.touchId = null
		this.active = false
    }

    BaseButton.prototype.setListeners = function(){
        if(Utils.isMobileDevice()){
            this.setMobileListeners()
        }else{
            this.setMouseListeners()
        }
    }

    BaseButton.prototype.setMouseListeners = function(){
        document.addEventListener('mousemove', this.handleMove.bind(this), {passive: false})
        document.addEventListener('mouseup', this.handleUp.bind(this))
    }

    BaseButton.prototype.setMobileListeners = function(){
        document.addEventListener('touchmove', this.handleMove.bind(this), {passive: false})
        document.addEventListener('touchend', this.handleUp.bind(this))
    }

    BaseButton.prototype.handleDown = function(event){


        //remove for multitouch to work
        //event.stopPropagation()

        //not actually sure if this condition check is needed.
        // if(event.target === this.imgs[0]) {
        //     console.log("Button Down");
        //     console.log(event);
        // }

        event.preventDefault()
        if(event.changedTouches){
            this.touchId = event.changedTouches[0].identifier
        }
        this.active = true
        this.setHotImg()
	}

    //if it's a different finger
    BaseButton.prototype.trackChangedTouches = function(event){
        var hasChangedTouches = false

        for (var i = 0; i < event.changedTouches.length; i++){
            if (this.touchId == event.changedTouches[i].identifier){
                hasChangedTouches = true
                event.clientX = event.changedTouches[i].clientX
                event.clientY = event.changedTouches[i].clientY
            }
        }
    
        return hasChangedTouches
    }

    BaseButton.prototype.handleMove = function(event){
        if(!this.active || event.changedTouches && !this.trackChangedTouches(event)) return
        this.operateHandleMove(event)
    }

    BaseButton.prototype.operateHandleMove = function(event){}

    BaseButton.prototype.isAnotherTouchId = function(event){
        return event.changedTouches && this.touchId !== event.changedTouches[0].identifier
    }

    BaseButton.prototype.handleUp = function(event) {
        
        //compatibility with old IE versions... may not have the "target" field (this ended with IE9 in 2011, so we probably don't need to worry about it)
        //var target = event.srcElement;
        //var target = event.target;


        //if the up event was related to our target
        if(event.target === this.imgs[0]) {
            //console.log("Button Up");

            //secondary checks, *then* handle the button up event
            if(this.active || !this.isAnotherTouchId(event)){
                this.operateHandleUp(event)
            }
        }

    }

    BaseButton.prototype.operateHandleUp = function(event){
        this.setColdImg()
        this.deactivate()
    }

    BaseButton.prototype.setColdImg = function(){
        this.imgs[0].src = this.imgs[0].dataset.imgCold
    }

    BaseButton.prototype.setHotImg = function(){
        this.imgs[0].src = this.imgs[0].dataset.imgHot
    }

    BaseButton.prototype.isHidden = function(){
        return this.divs[0].style.visibility === "hidden"
    }

    BaseButton.prototype.isVisible = function(){
        return this.divs[0].style.visibility === "visible"
    }

    BaseButton.prototype.getOffsetXOffScreen = function(){
        var rect = standardizeRect(this.divs[0].getBoundingClientRect());
        var orientation = this.parameters.horizontalOrientation
        var width = rect.width
        if(orientation === "left"){
            return -(width + this.divs[0].offsetLeft)
        }else{
            return width + (window.innerWidth - this.divs[0].offsetLeft)
        }
    }

    BaseButton.prototype.hide = function(){
        if(!this.isOffScreen){
            var offsetX = this.getOffsetXOffScreen()
            this.divs[0].style.transition = '.1s'
            this.divs[0].style.transform = "translate(" +  offsetX + "px, 0px)"
            this.isOffScreen = true
        }
    }

    BaseButton.prototype.show = function(){
        this.divs[0].style.transition = '.1s'
        this.divs[0].style.transform = "translate(0px, 0px)"
        this.isOffScreen = false
    }

    BaseButton.prototype.updateOnResize = function() {
        //console.log("Button Resize");

        //resize clickable area helper
        this.createArea();
    }



/* ----------------------------- REGULAR BUTTON ----------------------------- */

function RegularButton() {
    BaseButton.call(this)
    this.parameters = {
        horizontalOrientation: "",
        img: "",
        key: "",
        padX: 0,
        padY: 0,
        scenes: [""],
        scriptIn: function() {},
        scriptOut: function() {},
        verticalOrientation: "",
        vibration: 0,
        width: 0,
    }
}

RegularButton.prototype = Object.create(BaseButton.prototype);
RegularButton.prototype.constructor = RegularButton;



    RegularButton.prototype.initialize = function(parameters){
        BaseButton.prototype.initialize.call(this, parameters)
        this.createHtmlElements()
        this.setStyleToElements()
        this.appendElements()
        this.deactivate()
        this.setListeners()
        this.setKeyboardKey()
    }

    RegularButton.prototype.initMembers = function(){
        BaseButton.prototype.initMembers.call(this)
        this.keyboardKey = ""
    }

    RegularButton.prototype.setKeyboardKey = function(){
        if(!this.isScriptInput()){
            var keyName = this.parameters.key.toLowerCase()
            var key = Input.keyMapper[Eli.KeyCodes.keyboard[keyName]]
            this.keyboardKey = key
        }
    }

    RegularButton.prototype.createDiv = function(){
        var div = document.createElement("div")
        
        div.draggable = false  
        div.style.visibility = "hidden"
        div.id = "buttonDiv"
        this.divs[0] = div
    }

    RegularButton.prototype.createImage = function(){
        var coldFrame = CONTROLS_PATH + this.parameters.img + ".png"
        var hotFrame = CONTROLS_PATH + this.parameters.img + "_hot.png"

        var img = document.createElement("img")

        img.id = "buttonImg"
        img.src = coldFrame
        img.draggable = false
        img.dataset.imgCold = coldFrame
        img.dataset.imgHot = hotFrame
        img.style.imageRendering = 'pixelated';
        this.imgs[0] = img
    }

    RegularButton.prototype.createHtmlElements = function(){
        this.createDiv()
        this.createImage()
    }

    RegularButton.prototype.onLoad = function(ev){
        var imgWidth = this.parameters.width;
        var imgHeight = this.parameters.height; //unused and undefined from the JSON file
        var divStyle = this.divs[0].style
        var imgStyle = this.imgs[0].style
        var horPos = this.parameters.horizontalOrientation
        var verPos = this.parameters.verticalOrientation

        var units = this.getScreenUnitsByOrientation();
        var horUnit = units[0];
        var verUnit = units[1];

        divStyle.position = "fixed"
        divStyle.boxSizing = "border-box"
        divStyle[horPos] = "" + this.parameters.padX + horUnit;
        divStyle[verPos] = "" + this.parameters.padY + verUnit;

        imgStyle.maxWidth = "100%"
        imgStyle.width = "" + imgWidth + horUnit

        //imgStyle.height = "" + imgHeight + verUnit
        imgStyle.height = "auto"

        divStyle.width = this.imgs[0].width
        this.createArea()
    }

    RegularButton.prototype.createArea = function(){
        var mainRect = standardizeRect(this.divs[0].getBoundingClientRect());
        this.area = new Rectangle(mainRect.x, mainRect.y, mainRect.width, mainRect.height)
    }

    RegularButton.prototype.setStyleToElements = function(){
        this.imgs[0].addEventListener("load", this.onLoad.bind(this), {once: true})
    }

    RegularButton.prototype.appendElements = function(){
        this.divs[0].appendChild(this.imgs[0])
    }

    RegularButton.prototype.setMouseListeners = function(){
        this.divs[0].addEventListener('mousedown', this.handleDown.bind(this))
        BaseButton.prototype.setMouseListeners.call(this)
    }

    RegularButton.prototype.setMobileListeners = function(){
        this.divs[0].addEventListener('touchstart', this.handleDown.bind(this))
        BaseButton.prototype.setMobileListeners.call(this)
    }

    RegularButton.prototype.removeFromScene = function(){
    
        //if the button isn't already disabled, don't release it. (solves a bug with sprinting between rooms with the buttons globally disabled)
        if(this.active == true) {
            this.resetInput()
        }
        this.setColdImg()
        this.deactivate()
        this.divs[0].style.visibility = "hidden"
    }

    RegularButton.prototype.addOnScene = function(){ 
        this.divs[0].style.visibility = "visible"
        this.onLoad()
    }

    RegularButton.prototype.handleDown = function(event){
        BaseButton.prototype.handleDown.call(this, event)
        this.setInput()
	}

    RegularButton.prototype.operateHandleMove = function(event) {
        BaseButton.prototype.operateHandleMove.call(this, event)
        var x = event.clientX
        var y = event.clientY
        if(!this.area.contains(x, y)){
            this.handleUp(event)
        }
    }

    RegularButton.prototype.operateHandleUp = function(event) {
        BaseButton.prototype.operateHandleUp.call(this, event)
        this.resetInput()
    }

    RegularButton.prototype.setInput = function(){
        if(navigator.vibrate){
            navigator.vibrate(this.parameters.vibration)
        }
        if(this.isScriptInput()){
            this.parameters.scriptIn()
        }else{
            var key = this.keyboardKey
            Input._currentState[key] = true
        }
    }

    RegularButton.prototype.isScriptInput = function(){
        return this.parameters.key === "script"
    }

    RegularButton.prototype.resetInput = function(){
        if(this.isScriptInput()){
            this.parameters.scriptOut()
        }else{
            var key = this.keyboardKey
            Input._currentState[key] = false
        }
    }

    RegularButton.prototype.canAddToScene = function(sceneName){

        //if showOnscreenControls exists and is false, then automatically return false
        if(ConfigManager != null && ConfigManager.showOnscreenControls != null && ConfigManager.showOnscreenControls == false) {
            return false;
        }
        return this.parameters.scenes.includes(sceneName) && this.parameters.enableCondition();

    }



/* ----------------------------- CONTROL BUTTON ----------------------------- */

function ControlButton() {
    RegularButton.call(this)
    this.parameters = {
        enable: false,
        horizontalOrientation: "",
        img: "",
        padX: 0,
        padY: 0,
        verticalOrientation: "",
        vibrate: 0,
        width: 0,
    }
}

ControlButton.prototype = Object.create(RegularButton.prototype);
ControlButton.prototype.constructor = ControlButton;



    ControlButton.prototype.initMembers = function(){
        RegularButton.prototype.initMembers.call(this)
        this.isHidingButtons = false
    }

    ControlButton.prototype.setKeyboardKey = function(){}

    ControlButton.prototype.setInput = function(){
        if($gameMessage.isBusy()) return

        if(this.isHidingButtons){
            Plugin.addButtonsOnScene()
            this.isHidingButtons = false
        }else{
            Plugin.removeButtonsFromScene()
            this.isHidingButtons = true
        }
    }

    ControlButton.prototype.resetInput = function(){}

    ControlButton.prototype.canAddToScene = function(sceneName){
        //if showOnscreenControls exists and is false, then automatically return false
        if(ConfigManager != null && ConfigManager.showOnscreenControls != null && ConfigManager.showOnscreenControls == false) {
            return false;
        }        
        return true
    }


/* ------------------------------- SINGLE DPAD ------------------------------ */

function DpadController() {
    BaseButton.call(this)
    this.parameters = {
        baseWidth: 0,
        horizontalOrientation: "",
        img: "",
        padX: 0,
        padY: 0,
        scenes: [""],
        verticalOrientation: "",
    }
}

DpadController.prototype = Object.create(BaseButton.prototype);
DpadController.prototype.constructor = DpadController;



    DpadController.prototype.initialize = function(parameters){
        BaseButton.prototype.initialize.call(this, parameters)
        this.createHtmlElements()
        this.setStyleToElements()
        this.appendElements()
        this.deactivate()
        this.setListeners()
    }

    DpadController.prototype.initMembers = function(){
        BaseButton.prototype.initMembers.call(this)
        this.directionAreas = new Array(10).fill(new Rectangle(0, 0, 0, 0))
    }

    DpadController.prototype.createDiv = function(){
        var div = document.createElement("div")
        div.id = "dpadDiv"
        div.draggable = false  
        div.style.visibility = "hidden"
        this.divs[0] = div
    }

    DpadController.prototype.createImage = function(){    
        var coldFrame = CONTROLS_PATH + this.parameters.img + ".png"
        var hotFrame = CONTROLS_PATH + this.parameters.img + "_hot.png"

        var img = document.createElement("img")
        img.id = "dpadImg"
        img.src = coldFrame
        img.draggable = false
        img.dataset.imgCold = coldFrame
        img.dataset.imgHot = hotFrame
        img.style.imageRendering = 'pixelated';
        this.imgs[0] = img
    }

    DpadController.prototype.createHtmlElements = function(){
        this.createDiv()
        this.createImage()
    }

    DpadController.prototype.onLoad = function(ev){
        var imgWidth = this.parameters.baseWidth
        var divStyle = this.divs[0].style
        var imgStyle = this.imgs[0].style
        var horPos = this.parameters.horizontalOrientation
        var verPos = this.parameters.verticalOrientation

        var units = this.getScreenUnitsByOrientation();
        var horUnit = units[0];
        var verUnit = units[1];

        divStyle.position = "absolute"
        divStyle.boxSizing = "border-box"
        divStyle[horPos] = "" + this.parameters.padX + horUnit;
        divStyle[verPos] = "" + this.parameters.padY + verUnit;

        imgStyle.maxWidth = "100%"
        imgStyle.width = "" + imgWidth + horUnit;
        imgStyle.height = "auto"

        divStyle.width = this.imgs[0].width
        this.createArea()
        this.createDirectionArea()
    }

    DpadController.prototype.createDirectionArea = function(){
        var mainRect = standardizeRect(this.divs[0].getBoundingClientRect());
        var width = mainRect.width/3
        var height = mainRect.height/3
        var rect0 = new Rectangle(0, 0, 0, 0)

        var upLeft = new Rectangle(mainRect.x, mainRect.y, width, height)
        var up = new Rectangle(upLeft.right, mainRect.y, width, height)
        var upRight = new Rectangle(up.right, mainRect.y, width, height)

        var left = new Rectangle(mainRect.x, upLeft.bottom, width, height)
        var center = new Rectangle(left.right, upLeft.bottom, width, height)
        var right = new Rectangle(center.right, upLeft.bottom, width, height)

        var downLeft = new Rectangle(mainRect.x, left.bottom, width, height)
        var down = new Rectangle(downLeft.right, left.bottom, width, height)
        var downRight = new Rectangle(down.right, left.bottom, width, height)

        //3x3 grid of touch location
        this.directionAreas = [
            rect0, downLeft, down, downRight, left, center, right, upLeft, up,upRight
        ];

        this.walkArea = new Rectangle(mainRect.x)

    }

    DpadController.prototype.setStyleToElements = function(){
        this.imgs[0].addEventListener("load", this.onLoad.bind(this), {once: true})
    }

    DpadController.prototype.appendElements = function(){
        this.divs[0].appendChild(this.imgs[0])
    }

    DpadController.prototype.setMouseListeners = function(){
        this.divs[0].addEventListener('mousedown', this.handleDown.bind(this))
        BaseButton.prototype.setMouseListeners.call(this)
    }

    DpadController.prototype.setMobileListeners = function(){
        this.divs[0].addEventListener('touchstart', this.handleDown.bind(this))
        BaseButton.prototype.setMobileListeners.call(this)
    }

    DpadController.prototype.removeFromScene = function(){
        this.setColdImg()
        this.resetInput()
        this.deactivate()
        this.divs[0].style.visibility = "hidden"
    }

    DpadController.prototype.addOnScene = function(){ 
        this.divs[0].style.visibility = "visible"
        this.onLoad()
    }

    DpadController.prototype.getClientCoordinates = function(event){
        if(event.changedTouches){
            return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
        }else{
            return { x: event.clientX, y: event.clientY }
        }
    }

    DpadController.prototype.getTouchId = function(event){
        return event.changedTouches[0].identifier
    }

    DpadController.prototype.getDirection = function(coordinates){
        var x = coordinates.x;
        var y = coordinates.y;

        for(var i = 0; i < this.directionAreas.length; ++i) {
            if(this.directionAreas[i].contains(x, y)) {
                return i;
            }
        }
        return -1;
    }

    DpadController.prototype.handleDown = function(event){

        if (typeof TouchEvent !== 'undefined') {
            if(event instanceof TouchEvent) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    console.log(
                    "changedTouches[" + i + "].identifier = " + event.changedTouches[i].identifier
                    );
                }
            }
        }
        //console.log("DOWN");


        //parent button down event
        BaseButton.prototype.handleDown.call(this, event);
        //get local X and Y coords
        var coordinates = this.getClientCoordinates(event);

        //does array lookup given X and Y coords
        var direction = this.getDirection(coordinates)
        this.setInput(direction)
	}

    DpadController.prototype.operateHandleMove = function(event) {
        BaseButton.prototype.operateHandleMove.call(this, event)
        var coords = {x: event.clientX, y: event.clientY}
        var diretion = this.getDirection(coords)
        this.setInput(diretion)
    }

    DpadController.prototype.operateHandleUp = function(event) {
        BaseButton.prototype.operateHandleUp.call(this, event)
        this.resetInput()
    }

    DpadController.prototype.setInput = function(direction){
        var isRight = [6, 3, 9].includes(direction)
        var isDown =[2, 1, 3].includes(direction)
        var isLeft = [4, 7, 1].includes(direction)
        var isUp = [8, 7, 9].includes(direction)
        var isDownRight = direction === 3
        var isDownLeft = direction === 1
        var isUpLeft = direction === 7
        var isUpRight = direction === 9

        Input._currentState['right'] = isRight || isDownRight || isUpRight
        Input._currentState['down'] = isDown || isDownRight || isDownLeft
        Input._currentState['left'] = isLeft || isDownLeft || isUpLeft
        Input._currentState['up'] = isUp || isUpLeft || isUpRight
    }

    DpadController.prototype.resetInput = function(){
        Input._currentState['up'] = false
        Input._currentState['down'] = false
        Input._currentState['left'] = false
        Input._currentState['right'] = false
    }

    DpadController.prototype.canAddToScene = function(sceneName){
        //if showOnscreenControls exists and is false, then automatically return false
        if(ConfigManager != null && ConfigManager.showOnscreenControls != null && ConfigManager.showOnscreenControls == false) {
            return false;
        }
        return this.parameters.scenes.includes(sceneName) && this.parameters.enableCondition()
    }

    DpadController.prototype.updateOnResize = function() {
        this.createArea();
        this.createDirectionArea();
    }
    

/* -------------------------------- JOYSTICK (bugged, todo: fix this) -------------------------------- */

function JoystickController() {
    BaseButton.call(this)
    this.parameters = {
        ballImg: "",
        ballWidth: 0,
        baseImg: "",
        baseWidth: 0,
        extraDistance: 0,
        horizontalOrientation: "",
        padX: 0,
        padY: 0,
        scenes: [""],
        verticalOrientation: "",
    }
}

JoystickController.prototype = Object.create(BaseButton.prototype);
JoystickController.prototype.constructor = JoystickController;


    JoystickController.prototype.initialize = function(parameters){
        BaseButton.prototype.initialize.call(this, parameters)
        this.createHtmlElements()
        this.appendElements()
        this.setStyleToElements()
        this.deactivate()
        this.setListeners()
    }

    JoystickController.prototype.initMembers = function(){
        BaseButton.prototype.initMembers.call(this)
        this.divs[1] = document.createElement("div")
        this.imgs[1] = document.createElement("img")
        this.maxDistance = 0
        this.dragStart = null
    }

    JoystickController.prototype.createBaseDiv = function(){
        var div = document.createElement("div")
        div.id = "joystickBaseDiv"
        div.draggable = false  
        div.style.visibility = "hidden"
        this.divs[0] = div
    }

    JoystickController.prototype.createBaseImg = function(){
        var coldFrame = CONTROLS_PATH + this.parameters.baseImg + ".png"
        var hotFrame = CONTROLS_PATH + this.parameters.baseImg + "_hot.png"

        var img = document.createElement("img")
        img.id = "joystickBaseImg"
        img.src = coldFrame
        img.draggable = false
        img.dataset.imgCold = coldFrame
        img.dataset.imgHot = hotFrame
        img.style.imageRendering = 'pixelated';
        this.imgs[0] = img
    }

    JoystickController.prototype.createStickDiv = function(){
        var div = document.createElement("div")
        div.id = "joystickBallDiv"
        div.draggable = false
        this.divs[1] = div
        this.divs[1].style.visibility = "hidden"
    }

    JoystickController.prototype.createStickImg = function(){
        var coldFrame = CONTROLS_PATH + this.parameters.ballImg + ".png"
        var hotFrame = CONTROLS_PATH + this.parameters.ballImg + "_hot.png"

        var img = document.createElement("img")
        img.id = "joystickBallImg"
        img.src = coldFrame
        img.draggable = false
        img.dataset.imgCold = coldFrame
        img.dataset.imgHot = hotFrame
        img.style.imageRendering = 'pixelated';
        this.imgs[1] = img
    }

    JoystickController.prototype.createHtmlElements = function(){
        this.createBaseDiv()
        this.createBaseImg()
        this.createStickDiv()
        this.createStickImg()
    }

    JoystickController.prototype.onLoad = function(ev){
        var imgWidth = this.parameters.baseWidth;
        var divStyle = this.divs[0].style;
        var imgStyle = this.imgs[0].style;
        var horPos = this.parameters.horizontalOrientation;
        var verPos = this.parameters.verticalOrientation;

        var units = this.getScreenUnitsByOrientation();
        var horUnit = units[0];
        var verUnit = units[1];

        divStyle.position = "fixed";
        divStyle.boxSizing = "border-box";
        divStyle[horPos] = "" + this.parameters.padX + horUnit;
        divStyle[verPos] = "" + this.parameters.padY + verUnit;
        imgStyle.maxWidth = "100%";
        imgStyle.width = "" + imgWidth + horUnit;
        imgStyle.height = "auto";

        divStyle.width = this.imgs[0].width
        this.imgs[1].addEventListener("load", this.onStickImgLoad.bind(this), {once: true})
    }

    JoystickController.prototype.onStickImgLoad = function(ev){
        var imgWidth = this.parameters.ballWidth
        var divStyle = this.divs[1].style
        var imgStyle = this.imgs[1].style
        var xPos = function() {this.imgs[0].width/2 - this.imgs[1].width/2}
        var yPos = function() {this.imgs[0].height/2 - this.imgs[1].height/2}

        var units = this.getScreenUnitsByOrientation();
        var horUnit = units[0];
        var verUnit = units[1];


        divStyle.position = "absolute"
        imgStyle.maxWidth = "100%"
        imgStyle.width = "" + imgWidth + horUnit;
        imgStyle.height = "auto"
        divStyle.width = this.imgs[1].width
        divStyle.top = "" + yPos() + "px";
        divStyle.left = "" + xPos() + "px";
        this.maxDistance = Math.abs(this.divs[0].clientWidth/2 - this.divs[1].clientWidth/2) + this.parameters.extraDistance
        this.createArea()
    }

    JoystickController.prototype.setStyleToElements = function(){
        this.imgs[0].addEventListener("load", this.onLoad.bind(this), {once: true})
    }

    JoystickController.prototype.appendElements = function(){
        this.divs[0].appendChild(this.imgs[0]);
        this.divs[0].appendChild(this.divs[1]);       
        this.divs[1].appendChild(this.imgs[1]);
    }

    JoystickController.prototype.deactivate = function(){
        BaseButton.prototype.deactivate.call(this)
		this.dragStart = null
    }

    JoystickController.prototype.setMouseListeners = function(){
        this.divs[1].addEventListener('mousedown', this.handleDown.bind(this))
        BaseButton.prototype.setMouseListeners.call(this)
    }

    JoystickController.prototype.setMobileListeners = function(){
        this.divs[1].addEventListener('touchstart', this.handleDown.bind(this))
        BaseButton.prototype.setMobileListeners.call(this)
    }

    JoystickController.prototype.handleDown = function(event){
        this.divs[1].style.transition = '0s'
        BaseButton.prototype.handleDown.call(this, event)
        this.setDragStart(event)
	}

    JoystickController.prototype.operateHandleMove = function(event){
        BaseButton.prototype.operateHandleMove.call(this, event)
        var coordDifference = this.getCoordinateDifference(event);
        var angleDistance = this.getAngleAndDistance(xDiff, yDiff);

        var xDiff = coordDifference[0];
        var yDiff = coordDifference[1];
        var angle = angleDistance[0];
        var distance = angleDistance[1];


        this.moveStick(angle, distance)

        if(this.isOnDeadZone(distance)){
            this.resetMoveInput()
        }else{
            this.setInput(angle)
        }
    }

    JoystickController.prototype.operateHandleUp = function(event){
        BaseButton.prototype.operateHandleUp.call(this, event)
        this.resetStickPosition()
        this.resetMoveInput()
    }

    JoystickController.prototype.isHidden = function(){
        return  BaseButton.prototype.isHidden.call(this) && 
                this.divs[1].style.visibility === "hidden"
    }

    JoystickController.prototype.isVisible = function(){
        return  BaseButton.prototype.isVisible.call(this) && 
                this.divs[1].style.visibility === "visible"
    }

    JoystickController.prototype.removeFromScene = function(){
        this.divs[1].style.transition = '0s'
        this.divs[1].style.visibility = "hidden"
        this.divs[0].style.visibility = "hidden"
    }

    JoystickController.prototype.addOnScene = function(){
        this.divs[1].style.visibility = "visible"
        this.divs[0].style.visibility = "visible"
        this.onLoad()
        this.onStickImgLoad()
    }

    JoystickController.prototype.setDragStart = function(event){
        if(event.changedTouches){
            this.dragStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
        }else{
            this.dragStart = { x: event.clientX, y: event.clientY }
        }
    }

    JoystickController.prototype.setColdImg = function(){
        BaseButton.prototype.setColdImg.call(this)
        this.imgs[1].src = this.imgs[1].dataset.imgCold
    }

    JoystickController.prototype.setHotImg = function(){
        BaseButton.prototype.setHotImg.call(this)
        this.imgs[1].src = this.imgs[1].dataset.imgHot
    }

    JoystickController.prototype.getCoordinateDifference = function(event){
        var xDiff = event.clientX - this.dragStart.x
        var yDiff = event.clientY - this.dragStart.y

        return [xDiff, yDiff]
    }

    JoystickController.prototype.isOnDeadZone = function(distance){
        var deadZone = this.imgs[1].width / 2
        return distance < deadZone
    }

    JoystickController.prototype.moveStick = function(angle, distance){
        var stickOffset = this.getStickOffset(angle, distance);
        var xPosition = stickOffset[0];
        var yPosition = stickOffset[1];

        this.divs[1].style.transform = "translate(" + xPosition + "px, " + yPosition + "px)"
    }

    JoystickController.prototype.getStickOffset = function(angle, distance){
        var xPosition = distance * Math.cos(angle)
        var yPosition = distance * Math.sin(angle)

        return [xPosition, yPosition]
    }

    JoystickController.prototype.getAngleAndDistance = function(xDiff, yDiff){
        var angle = Math.atan2(yDiff, xDiff)
        var distance = Math.min(this.maxDistance, Math.hypot(xDiff, yDiff))

        return [angle, distance]
    }

    JoystickController.prototype.resetStickPosition = function(){
        this.divs[1].style.transition = '.2s'
        this.divs[1].style.transform = "translate(0px, 0px)"
    }

    JoystickController.prototype.isBetween = function(number, min, max){
        return number > min && number < max
    }

    JoystickController.prototype.isBetweenOrEqual = function(number, min, max){
        return number >= min && number <= max
    }

    JoystickController.prototype.setInput = function(angle){
        angle *= (180/Math.PI)

        var isRight = this.isBetweenOrEqual(angle, -45, 45)
        var isDown = this.isBetweenOrEqual(angle, 45, 135)
        var isLeft = this.isBetweenOrEqual(angle, 135, 180) || this.isBetweenOrEqual(angle, -180, -135)
        var isUp = this.isBetweenOrEqual(angle, -135, -45)
        var isDownRight = this.isBetweenOrEqual(angle, 22.5, 67.5)
        var isDownLeft = this.isBetweenOrEqual(angle, 112.5, 157.5)
        var isUpLeft = this.isBetweenOrEqual(angle, -157.5, -112.5)
        var isUpRight = this.isBetweenOrEqual(angle, -67.5, -22.5)

        Input._currentState['right'] = isRight || isDownRight || isUpRight
        Input._currentState['down'] = isDown || isDownRight || isDownLeft
        Input._currentState['left'] = isLeft || isDownLeft || isUpLeft
        Input._currentState['up'] = isUp || isUpLeft || isUpRight
    }

    JoystickController.prototype.resetMoveInput = function(){
        Input._currentState['up'] = false
        Input._currentState['down'] = false
        Input._currentState['left'] = false
        Input._currentState['right'] = false
    }

    JoystickController.prototype.canAddToScene = function(sceneName){
        //if showOnscreenControls exists and is false, then automatically return false
        if(ConfigManager != null && ConfigManager.showOnscreenControls != null && ConfigManager.showOnscreenControls == false) {
            return false;
        }
        return this.parameters.scenes.includes(sceneName) && this.parameters.enableCondition()
    }
    

/* ------------------------------ PLUGIN OBJECT ----------------------------- */

function Parameters(parameters) {
    this.allowedPlatforms = JSON.parse(parameters.allowedPlatforms)
    this.disableDoubleTouchMenu = parameters.disableDoubleTouchMenu === "true"
    this.disableScreenMove = parameters.disableScreenMove === "true"
    this.hideOnMessage = parameters.hideOnMessage === "true"
    this.fixButtonSize = (parameters.fixButtonSize || "false") === "true"
    this.fixButtonInterval = Math.max(Number(parameters.fixButtonInterval || "120"), 1)
    this.dPadType = parameters.dPadType
    this.controlButton = this.parseControlButtonParameters(parameters.controlButton)
    this.joystickPad = this.parseJoystickParameters(parameters.joystickPad)
    this.singlePad = this.parseSinglePadParameters(parameters.singlePad)
    this.buttons = this.parseRegularButtonParameters(parameters.buttons)
}


    Parameters.prototype.parseControlButtonParameters = function(rawParam){
        var param = JSON.parse(rawParam)

        return {
            enable: param.enable === "true",
            horizontalOrientation: param.horizontalOrientation,
            img: param.img,
            padX: Number(param.padX),
            padY: Number(param.padY),
            verticalOrientation: "",
            vibration: Number(param.vibration),
            width: Number(param.width),
            enableScreenMove: param.enableScreenMove === "true",
            enableDoubleTouchMenu: param.enableDoubleTouchMenu === "true",
        }
    }

    Parameters.prototype.parseSinglePadParameters = function(rawParam){
        var param = JSON.parse(rawParam)

        return {
            baseWidth: Number(param.baseWidth),
            horizontalOrientation: param.horizontalOrientation,
            img: param.img,
            padX: Number(param.padX),
            padY: Number(param.padY),
            scenes: JSON.parse(param.scenes),
            verticalOrientation: param.verticalOrientation,
            enableCondition: param.condition ? new Function(param.condition) : new Function("return true")
        }
    }

    Parameters.prototype.parseJoystickParameters = function(rawParam){
        var param = JSON.parse(rawParam)

        return {
            ballImg: param.ballImg,
            ballWidth: Number(param.ballWidth),
            baseImg: param.baseImg,
            baseWidth: Number(param.baseWidth),
            extraDistance: Number(param.extraDistance),
            horizontalOrientation: param.horizontalOrientation,
            padX: Number(param.padX),
            padY: Number(param.padY),
            scenes: JSON.parse(param.scenes),
            verticalOrientation: param.verticalOrientation,
            enableCondition: param.condition ? new Function(param.condition) : new Function("return true")
        }
    }

    Parameters.prototype.parseRegularButtonParameters = function(rawParam){
        var buttonParams = JSON.parse(rawParam)
        var buttons = []

        for(var i = 0; i < buttonParams.length; ++i) {
            var param = buttonParams[i];
            var button = JSON.parse(param)
            buttons.push({
                horizontalOrientation: button.horizontalOrientation,
                img: button.img,
                key: button.key,
                padX: Number(button.padX),
                padY: Number(button.padY),
                scenes: JSON.parse(button.scenes),
                scriptIn: button.scriptIn.length > 4 ? new Function(JSON.parse(button.scriptIn)) : new Function(),
                scriptOut: button.scriptOut.length > 4 ? new Function(JSON.parse(button.scriptOut)) : new Function(),
                verticalOrientation: button.verticalOrientation,
                vibration: Number(button.vibration),
                width: Number(button.width),
                enableCondition: button.condition ? new Function(button.condition) : new Function("return true")
            })
        }

        return buttons
    }


Eli.MobileControls = {

    url: "https://hakuenstudio.itch.io/eli-mobile-controls-for-rpg-maker",
    alias: {},
    Parameters: Parameters,
    BaseButton: BaseButton,
    RegularButton: RegularButton,
    ControlButton: ControlButton,
    JoystickController: JoystickController,
    DpadController: DpadController,
    parameters: new Parameters(PluginManager.parameters("EliMZ_MobileControls")),
    elements: [],
    divContainer: document.createElement('div'),
    joystick: new JoystickController(),
    dpad: new DpadController(),
    controlButton: new ControlButton(),
    buttonList: [],
    timeForRefresh: 0,
    isHidingButtons: false,

    initialize: function(){},

    initPluginCommands: function(){},

    createHtmlElements: function(){

        this.createDiv();
        this.createDpad();

        var vbuttons = this.param().buttons;
        for(var i = 0; i < vbuttons.length; ++i) {
            var parameters = vbuttons[i];
            this.createRegularButton(parameters);
        }

        if(this.param().controlButton.enable){
            this.createControlButton();
        }

        this.disableContextMenu()
    },

    createDiv: function(){
        var div = document.createElement('div')
        div.id = 'ScreenButton'
        div.style.position = "absolute"
        div.style.overflow = "hidden"
        div.style.zIndex = "11"
        div.style.top = 0+'px'
        div.style.left = 0+'px'
        div.style.right = 0+'px'
        div.style.bottom = 0+'px'
        div.style.margin = "auto"
        document.body.appendChild(div)
        this.divContainer = div
    },

    createDpad: function(){
        if(this.param().dPadType === "singlePad"){
            this.createSingleDpad();

        }else if(this.param().dPadType === "joystick"){
            this.createJoystick();
        }
    },

    createSingleDpad: function(){
        this.dpad.initialize(this.param().singlePad);
        this.addToDiv(this.dpad.divs[0]);
        this.elements.push(this.dpad.divs[0]);
        this.buttonList.push(this.dpad);
    },

    createJoystick: function(){
        this.joystick.initialize(this.param().joystickPad);
        this.buttonList.push(this.joystick);
        this.elements.push(this.joystick.divs[0]);
        this.addToDiv(this.joystick.divs[0]);
    },

    createRegularButton: function(parameters){
        var button = new RegularButton();
        button.initialize(parameters);

        this.addToDiv(button.divs[0]);
        this.elements.push(button.divs[0]);
        this.buttonList.push(button);
    },

    createControlButton: function(){   
        this.controlButton.initialize(this.param().controlButton)
        this.addToDiv(this.controlButton.divs[0]) 
    },

    disableContextMenu: function(){
        var oncontextmenu = function(ev) {
            ev.preventDefault()
            return false
        }
        this.divContainer.addEventListener("contextmenu", oncontextmenu)
        this.elements.forEach(function(element) {
            element.addEventListener("contextmenu", oncontextmenu)
        })
    },

    isMenuDisabledByDoubleTouch: function(){
        return this.param().disableDoubleTouchMenu && !this.controlButton.isHidingButtons
    },

    isControlButtonDisablingMenuByDoubleTouch: function(){
        return  (this.controlButton.isHidingButtons && !this.param().controlButton.enableDoubleTouchMenu) ||
                this.controlButton.area.contains(TouchInput._x, TouchInput._y)
    },

    isMovementDisabledByScreenTouch: function(){
        return this.param().disableScreenMove && !this.controlButton.isHidingButtons
    },

    isControlButtonDisablingMovementByScreenTouch: function(){
        return  (this.controlButton.isHidingButtons && !this.param().controlButton.enableScreenMove) || 
                this.controlButton.area.contains(TouchInput._x, TouchInput._y)
    },

    getDiv: function(){
        return this.divContainer
    },

    addToDiv: function(element){
        this.getDiv().appendChild(element)
    },

    removeButtonsFromScene: function(){
        var scene = SceneManager._scene.constructor.name

        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]

            if(button.canAddToScene(scene)){
                button.removeFromScene()
            }
        }
    },

    addButtonsOnScene: function(){
        var scene = SceneManager._scene.constructor.name

        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]

            if(button.canAddToScene(scene)){
                button.addOnScene()
            }
        }
    },

    canRefreshButtonsForScene: function(){
        return  !this.controlButton.isHidingButtons &&
                SceneManager._scene
    },

    refreshButtonsForScene: function(){
        var scene = SceneManager._scene.constructor.name
        
        if(this.param().controlButton.enable){
            if(this.controlButton.canAddToScene()) {
                this.controlButton.divs[0].style.visibility = "visible"
            } else {
                this.controlButton.divs[0].style.visibility = "hidden"
            }
            
        }
        
        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]

            if(button.canAddToScene(scene)){
                button.addOnScene()
            }else{
                button.removeFromScene()
            }
        }
        this.timeForRefresh = 0
    },

    refreshKeyboardKeys: function(){
        
        for(var i = 0; i < Plugin.buttonList.length; ++i){
            var button = Plugin.buttonList[i];
            if(button.setKeyboardKey && !button.keyboardKey){
                button.setKeyboardKey()
            }
        }
    },

    hideButtons: function(){
        var scene = SceneManager._scene.constructor.name

        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]

            if(button.canAddToScene(scene)){
                button.hide()
            }
        }

        this.isHidingButtons = true
    },

    showButtons: function(){
        var scene = SceneManager._scene.constructor.name

        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]

            if(button.canAddToScene(scene)){
                button.show()
            }
        }

        this.isHidingButtons = false
    },

    getControlButton: function(){
        return this.controlButton
    },

    isLandscape: function(){
        if(typeof screen.orientation === "undefined"){
            return window.innerHeight < window.innerWidth //detect landscape old style
        }else{
            return screen.orientation.type.includes("landscape")    
        }
    },

    anyButtonAreaContains: function(x, y){
        for (var i = 0; i < this.buttonList.length; i++) {
            if (this.buttonList[i].area.contains(x, y)) {
                return true;
            }
        }
        return false;
    },

    isMovingWithButtons: function(){
        return this.joystick.active || this.dpad.active;
    },

    param: function(){
        return this.parameters;
    },

    isAllowedOnDesktop: function(){
        return Utils.isNwjs() && this.parameters.allowedPlatforms.includes("Desktop");
    },

    isAllowedOnMobile: function(){
        return Utils.isMobileDevice() && this.parameters.allowedPlatforms.includes("Mobile");
    },

    isAllowedOnWebBrowser: function(){
        return !Utils.isNwjs() && !Utils.isMobileDevice() && this.parameters.allowedPlatforms.includes("Web Browser");
    },

    isMobileControlsAllowed: function(){
        return Utils.isOptionValid("test") || this.isAllowedOnDesktop() || this.isAllowedOnMobile() || this.isAllowedOnWebBrowser();
    },

    //refresh all buttons' touchable areas when the window is resized
    updateOnResize: function() {

        // joystick: new JoystickController(),
        // dpad: new DpadController(),
        // controlButton: new ControlButton(),
        // buttonList: [],
        //console.log("resize");


        //update controlButton separately; it's not in the button list, but the joysticks are.
        this.controlButton.updateOnResize();

        for(var i = 0; i < this.buttonList.length; ++i){
            var button = this.buttonList[i]
            button.updateOnResize();
        }

    




    }

}

//pulled from EliMZ_Book.js, we shouldn't need more than just this part, so this is all I'm bringing in.
Eli.KeyCodes = {

    keyboard: {
        backspace:8, tab:9, enter:13, shift:16, ctrl:17, alt:18, pausebreak:19, capslock:20, 
        esc:27, space:32, pageup:33, pagedown:34, end:35, home:36, 
        leftarrow:37, uparrow:38, rightarrow:39, downarrow:40, insert:45, delete:46, 
        0:48, 1:49, 2:50, 3:51, 4:52, 5:53, 6:54, 7:55, 8:56, 9:57, 
        a:65, b:66, c:67, d:68, e:69, f:70, g:71, h:72, i:73, j:74, k:75, l:76, m:77, n:78, 
        o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, z:90, 
        leftwindowkey:91, rightwindowkey:92, selectkey:93, 
        numpad0:96, numpad1:97, numpad2:98, numpad3:99, numpad4:100, numpad5:101, 
        numpad6:102, numpad7:103, numpad8:104, numpad9:105, 
        multiply:106, add:107, subtract:109, decimalpoint:110, divide:111, 
        f1:112, f2:113, f3:114, f4:115, f5:116, f6:117, f7:118, f8:119, f9:120, f10:121, f11:122, f12:123,
        numlock:144, scrolllock:145, semicolon:186, equalsign:187, comma:188, dash:189, period:190,
        forwardslash:191, graveaccent:192, openbracket:219, backslash:220, closebracket:221, singlequote:222
    },

    gamepad: {
        a: 0, b: 1, x: 2, y: 3, lb: 4, rb: 5, lt: 6, rt: 7, select: 8,
        start: 9, l3: 10, r3: 11, up: 12, down: 13, left: 14, right: 15
    },

    mouse: {
        left: 0,
        middle: 1,
        right: 2,
        back: 3,
        forward: 5,
    },

    defaultKeyboard: [
        9, 13, 16, 17, 18, 27, 32, 33, 34, 37, 38, 39, 
        40, 45, 81, 87, 88, 90, 96, 98, 100, 102, 104, 120
    ],

    defaultGamepad: [0, 1, 2, 3, 4, 5, 12, 13, 14, 15],

    isDefaultKeyboard: function(keyCode){
        return this.defaultKeyboard.includes(keyCode)
    },

    isDefaultGamepad: function(keyCode){
        return this.defaultGamepad.includes(keyCode)
    },
}

//used to provide X and Y to the ClientRect objects from older web browsers.
//I don't know if I should do it this way, or just edit the methods that need a DOMRect to use left and top.
var standardizeRect = function(inputRect) {
    if (typeof inputRect.x == "undefined") {
        if(inputRect.width < 0) {
            inputRect.x = inputRect.left - inputRect.width;
        } else {
            inputRect.x = inputRect.left;
        }
    }
    if (typeof inputRect.y == "undefined") {
        if(inputRect.height < 0) {
            inputRect.y = inputRect.top - inputRect.height;
        } else {
            inputRect.y = inputRect.top;
        }
    }

    return inputRect;
}

var Plugin = Eli.MobileControls
var Alias = Eli.MobileControls.alias

Plugin.initialize()

if(Plugin.isMobileControlsAllowed()){

/* -------------------------------- GRAPHICS -------------------------------- */
{

Alias.Graphics_switchStretchMode = Graphics._switchStretchMode
Graphics._switchStretchMode = function() {
    Alias.Graphics_switchStretchMode.call(this)
    if(Plugin.canRefreshButtonsForScene()){
        setTimeout(Plugin.refreshButtonsForScene.bind(Plugin), 50)
    }
}

Alias.Graphics_switchFullScreen = Graphics._switchFullScreen
Graphics._switchFullScreen = function() {
    Alias.Graphics_switchFullScreen.call(this)
    if(Plugin.canRefreshButtonsForScene()){
        setTimeout(Plugin.refreshButtonsForScene.bind(Plugin), 50)
    }
}

Alias.Graphics_createErrorPrinter = Graphics._createErrorPrinter
Graphics._createErrorPrinter = function() {
    Alias.Graphics_createErrorPrinter.call(this)
    this._errorPrinter.style.pointerEvents = "none"
}

Alias.Graphics_updateErrorPrinter = Graphics._updateErrorPrinter
Graphics._updateErrorPrinter = function() {
    Alias.Graphics_updateErrorPrinter.call(this)
    this._errorPrinter.style.pointerEvents = "none"
}


Alias.Graphics_onWindowResize = Graphics._onWindowResize
Graphics._onWindowResize = function() {
    Alias.Graphics_onWindowResize.call(this)

    //update button touchable area
    Eli.MobileControls.updateOnResize();

};

}

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_createGameObjects = DataManager.createGameObjects
DataManager.createGameObjects = function() {
    Alias.DataManager_createGameObjects.call(this)
    Plugin.refreshKeyboardKeys()
}

}

/* -------------------------------- GAME TEMP ------------------------------- */
{

Alias.Game_Temp_setDestination = Game_Temp.prototype.setDestination
Game_Temp.prototype.setDestination = function(x, y) {
    if(Plugin.isMovingWithButtons()){
        x = null
        y = null
    }else if(Plugin.isControlButtonDisablingMovementByScreenTouch()){
        x = null
        y = null
    }else if(Plugin.isMovementDisabledByScreenTouch()){
        x = null
        y = null
    } else if(Plugin.anyButtonAreaContains(TouchInput._x, TouchInput._y)){
        x = null
        y = null
    }

    Alias.Game_Temp_setDestination.call(this, x, y)
}
    
}

/* ------------------------------- SCENE BOOT ------------------------------- */
{

Alias.Scene_Boot_create = Scene_Boot.prototype.create
Scene_Boot.prototype.create = function() {
    Alias.Scene_Boot_create.call(this)
    Plugin.createHtmlElements()
}

}

/* ------------------------------- SCENE BASE ------------------------------- */
{

Alias.Scene_Base_start = Scene_Base.prototype.start
Scene_Base.prototype.start = function(){
    Alias.Scene_Base_start.call(this)
    if(Plugin.canRefreshButtonsForScene()){
        Plugin.refreshButtonsForScene()
    }
}

if(Plugin.param().fixButtonSize && !Utils.isNwjs()){

    Alias.Scene_Base_update = Scene_Base.prototype.update
    Scene_Base.prototype.update = function(){
        Alias.Scene_Base_update.call(this)
        this.keepRefreshingMobileButtonsForScene()
    }

    Scene_Base.prototype.keepRefreshingMobileButtonsForScene = function(){
        Plugin.timeForRefresh++

        if(Plugin.canRefreshButtonsForScene() && Plugin.timeForRefresh >= Plugin.param().fixButtonInterval){
            Plugin.refreshButtonsForScene()
            Plugin.timeForRefresh = 0
        }
    }
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled
Scene_Map.prototype.isMenuCalled = function() {
    if(this.isMenuDisabledByMobileControls()){
        return false
    }
    return Alias.Scene_Map_isMenuCalled.call(this)
}

Scene_Map.prototype.isMenuDisabledByMobileControls = function() {
    var isMobileDisabling = Plugin.isMenuDisabledByDoubleTouch() || Plugin.isControlButtonDisablingMenuByDoubleTouch()
    return isMobileDisabling && TouchInput.isCancelled()
}

}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
{

Alias.Window_Message_onFirstMessage = Window_Message.prototype.onFirstMessage
Window_Message.prototype.onFirstMessage = function(){
    Alias.Window_Message_onFirstMessage.call(this)

    if(this.canHideMobileControls()){
        Plugin.hideButtons()
    }
}

Window_Message.prototype.canHideMobileControls = function(){
    return  Plugin.param().hideOnMessage && 
            !Plugin.getControlButton().isHidingButtons && !Plugin.isHidingButtons
}

Alias.Window_Message_onLastMessage = Window_Message.prototype.onLastMessage
Window_Message.prototype.onLastMessage = function(){
    Alias.Window_Message_onLastMessage.call(this)

    if(this.canShowMobileControls()){
        Plugin.showButtons()
    }
}

Window_Message.prototype.canShowMobileControls = function(){
    return  Plugin.param().hideOnMessage && 
            !Plugin.getControlButton().isHidingButtons && Plugin.isHidingButtons
}

}

}

}