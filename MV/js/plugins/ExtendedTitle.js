//add the methods we have from Scene_Title~@1.rb, adds some options to the main menu.




//assigns these menu keys with these menu names. Three of them we get from the root game, the other three we assign here. 
Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());

    //I may also want to add back the options menu too. (maybe replace the DLC with this?)
    //this.addCommand(TextManager.options,   'options');

    //todo: the quit option isn't really accessible via the UI editor. It's saved in the System.json file.
    var quitStr = TextManager.command(20);
    if(quitStr == "") {
        quitStr = "GIVE UP";
    }
    this.addCommand(quitStr,   'quit');



    var s4 = "Language";
    var s5 = "Changed-Special";
    var s6 = "Guide";

    //SceneManager.exit();

    //
    //todo: is lang_str already loaded at this point? should we load it again?
    switch(lang_str) {
        case "1":
            s6 = "操作指南"
            s4 = "简体中文"
            break;
        case "2":
            s6 = "操作指南"
            s4 = "繁體中文"
            break;
        case "3":
            s6 = "OPERATION GUIDE"
            s4 = "ENGLISH"
            break;
        case "4":
            s6 = "操作ガイド"
            s4 = "日本語"
            break; 
        case "5":
            s6 = "조작 가이드"
            s4 = "한국어"
            break;
        case "6":
            s6 = "GUIA DE OPERAÇÃO"
            s4 = "PORTUGUÊS"
            break;
        case "7":
            s6 = "руководство"
            s4 = "РУССКИЙ"
            break;
        case "8":
            s6 = "MANUAL DE OPERACIONES"
            s4 = "ESPAÑOL"
            break;            
        case "9":
            s6 = "แนวทางการดำเนินงาน"
            s4 = "ไทย"
            break;
        case "10":
            s6 = "GUIDE D'OPÉRATION"
            s4 = "FRANÇAIS"
            break;
        default:
            s6 = "OPERATION GUIDE"
            s4 = "LANGUAGE"
            break;
    }
    //

    //todo: test this

    //add menu strings to main menu
    this.addCommand(s4,   'lang');
    this.addCommand(s5,   'dlc');
    //this.addCommand(TextManager.options,   'options');
    this.addCommand("OPTIONS",   'options');

    this.addCommand(s6,   'guide');

};

Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = Graphics.boxHeight - this.height - 24;
};


Scene_Title.prototype.commandGuide = function() {
    // DataManager.setupNewGame();
    // this._commandWindow.close();
    // this.fadeOutAll();
    // SceneManager.goto(Scene_Map);

    this._commandWindow.close();
    SceneManager.push(Scene_Guide);

    // console.log("Guide");

};

Scene_Title.prototype.commandDlc = function() {
    this._commandWindow.close();
    
    //convention special
    //SceneManager.push(Scene_PostMessage);

    window.location.href = "../MV_Special/index.html";

    SceneManager.push(Scene_Options);


    //console.log("Dlc");
};

Scene_Title.prototype.commandLang = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Lang);
    //console.log("Lang");
};

Scene_Title.prototype.commandQuit = function() {
    this._commandWindow.close();
    SceneManager.exit();
};


//binds the different command methods to the menu options with these keys
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));

    this._commandWindow.setHandler('guide',  this.commandGuide.bind(this));
    this._commandWindow.setHandler('dlc',  this.commandDlc.bind(this));
    this._commandWindow.setHandler('lang',  this.commandLang.bind(this));
    this._commandWindow.setHandler('quit',  this.commandQuit.bind(this));


    this.addWindow(this._commandWindow);

};




/////////////////////////////Scene_Lang


//"constructor"
function Scene_Lang() {
    //run initialize method
    this.initialize.apply(this, arguments);
}

Scene_Lang.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Lang.prototype.constructor = Scene_Lang;

Scene_Lang.prototype.initialize = function() {
    //call super
    Scene_MenuBase.prototype.initialize.call(this);

};

Scene_Lang.prototype.update = function() {
    //call super
    Scene_MenuBase.prototype.update.call(this);
    //console.log("update");

}


//on window create, create sub-window
Scene_Lang.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();

    //cache old language string (used to see if we should call a data update on exit)
    this._old_lang_str = lang_str;
};

//on window close
Scene_Lang.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};


function Window_Lang() {
    this.initialize.apply(this, arguments);
}

Window_Lang.prototype = Object.create(Window_Options.prototype);
Window_Lang.prototype.constructor = Window_Lang;

Window_Lang.prototype.initialize = function() {
    Window_Options.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
Window_Lang.prototype.windowWidth = function() {
    return 258;
};
Window_Lang.prototype.makeCommandList = function() {
    this.clearCommandList();
    
    this.addCommand("简体中文", '1');
    this.addCommand("繁體中文", '2');
    this.addCommand("ENGLISH", '3');
    this.addCommand("日本語", '4');
    this.addCommand("한국어", '5');
    this.addCommand("PORTUGUÊS", '6');
    this.addCommand("РУССКИЙ", '7');
    this.addCommand("ESPAÑOL", '8');
    this.addCommand("ไทย", '9');
    this.addCommand("FRANÇAIS", '10');

    //console.log("MakeCommandList");
}
Window_Lang.prototype.changeValue = function(symbol, value) {}
Window_Lang.prototype.cursorRight = function(wrap) {}
Window_Lang.prototype.cursorLeft = function(wrap) {}
Window_Lang.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'left');
    //this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
}
Window_Lang.prototype.processOk = function() {

    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    
    //save the updated language
    lang_str = symbol;
    StorageManager.save(lang_filename, lang_str);

    //audio feedback
    SoundManager.playOk();

    this.close();
    //console.log(lang_str);

};

Window_Lang.prototype.update = function() {
    Window_Options.prototype.update.call(this);
    
    //re-open once we've closed. We do this to replicate the original game's visual feedback on language change
    if(this.isClosed()) {
        this.open();
    }
}

Scene_Lang.prototype.createCommandWindow = function() {
    //this._optionsWindow = new Window_Options();
    //this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
    //this.addWindow(this._optionsWindow);

    // this._commandWindow = new Window_Command();
    // this._commandWindow.makeCommandList = function() {
    //     this.addCommand("AnCommand", 'a');
    //     console.log("MakeCommandList");
    // }
    // this._commandWindow.updatePlacement = function() {
    //     this.x = (Graphics.boxWidth - this.width) / 2;
    //     this.y = (Graphics.boxHeight - this.height) / 2;
    // };
    // this._commandWindow.updatePlacement();



    this._backgroundBitmap = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this.addChild(this._backgroundBitmap);

    this.createWindowLayer(); //needed so that our menu is drawn above the background bitmap
    this._commandWindow = new Window_Lang();
    this._commandWindow.setHandler('cancel', this.exitLang.bind(this));


    //see rpg_window.js
    //this._commandWindow.
    this.addWindow(this._commandWindow);

};

Scene_Lang.prototype.exitLang = function() {



    //re-call the database, this time with new language
    if(this._old_lang_str != lang_str) {
        
        //the problem is that it tries to use the global datafiles before the server gives them to us.
        //we can fix this by returning before popping the scene, and adding a callback counter to only pop the scene once all the data has been populated

        //for now, bodge: just refresh the page on lang change exit
        window.location.reload();
        return;
    
        DataManager.loadDatabase(); //note: makes dataSystem NULL, we need to fix this.
    }


    this.popScene(); //return to main title
    
    if(SceneManager._nextScene) {
        //console.log(SceneManager._nextScene);
        //do not fade in on return
        SceneManager._nextScene.fadeSpeed = function() {
            return 1;
        };

    }
}




/////////////////////////////Scene_Guide




function Scene_Guide() {
    this.initialize.apply(this, arguments);
}

Scene_Guide.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Guide.prototype.constructor = Scene_Guide;

Scene_Guide.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Guide.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsWindow();
};

Scene_Guide.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};

Scene_Guide.prototype.createOptionsWindow = function() {
    this._optionsWindow = new Window_Selectable();
    
    //change: play paper sound instead of cancel sound
    this._optionsWindow.processCancel = function() {
        //SoundManager.playCancel();
        AudioManager.playSe({name: "Book", pan: 0, pitch: 100, volume: 100});
        this.updateInputData();
        this.deactivate();
        this.callCancelHandler();
    };



    this._optionsWindow.activate();
    this._optionsWindow.setHandler('cancel', this.setFadeOut.bind(this));
    this.addWindow(this._optionsWindow);

    AudioManager.playSe({name: "Book", pan: 0, pitch: 100, volume: 100});
    this._backgroundBitmap = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this._spriteBitmap = new Sprite(ImageManager.loadPicture("Guide"));
    this._spriteBitmap.opacity = 0x0;
    this.addChild(this._backgroundBitmap);
    this.addChild(this._spriteBitmap);

    //fading to make it behave a bit more like RPGMaker VX
    this._fadeIn = true;
    this._fadeOut = false;


    //todo: leverage the Game_Picture's fade methods on the spriteBitmap
    //this._gp = new Game_Picture();
    //this._gp.show("Guide", 0, 0, 0, 100, 100, 255, Graphics.BLEND_NORMAL);

};


Scene_Guide.prototype.setFadeOut = function() {
    this._fadeOut = true;
    this._fadeIn = false;
}

Scene_Guide.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    //console.log("update");

    var fadeTime = 20; //20 ticks to fade

    //entry
    if(this._fadeIn == true) {
        //fade for 20 ticks
        if(this._spriteBitmap.opacity < 0xFF) {
            this._spriteBitmap.opacity += (255.0 / fadeTime);
        } else {
            this._fadeIn = false
        }
    }

    //exit
    if(this._fadeOut == true) {
        if(this._spriteBitmap.opacity > 0) {
            this._spriteBitmap.opacity -= (255.0 / fadeTime);
        } else {
            this._fadeIn = false;
            this.popScene(); //return to main title
            
            if(SceneManager._nextScene) {
                //console.log(SceneManager._nextScene);
                //do not fade in on return
                SceneManager._nextScene.fadeSpeed = function() {
                    return 1;
                };

            }
        }
    }

}


/*
def create_command_window
s1 = Vocab::new_game
s2 = Vocab::continue
s3 = Vocab::shutdown
@command_window = Window_Command.new(172, [s1, s2, s3])
@command_window.x = (544 - @command_window.width) / 2
@command_window.y = 288
if @continue_enabled                    # 如果「继续」有效
  @command_window.index = 1             # 将光标移至「继续游戏」
else                                    # 否则则将「继续游戏」半透明化
  @command_window.draw_item(1, false)
end
@command_window.openness = 0
@command_window.open
end
*/



////////////////////////////Window_Options extension

//new setting, default to true for mobile devices
ConfigManager.showOnscreenControls = Utils.isMobileDevice();

//Utils.isMobileDevice

//save settings
ConfigManager.makeData = function() {
    var config = {};
    config.alwaysDash = this.alwaysDash;
    config.commandRemember = this.commandRemember;
    config.bgmVolume = this.bgmVolume;
    config.bgsVolume = this.bgsVolume;
    config.meVolume = this.meVolume;
    config.seVolume = this.seVolume;
    config.showOnscreenControls = this.showOnscreenControls;
    return config;
};

//load settings
ConfigManager.applyData = function(config) {
    this.alwaysDash = this.readFlag(config, 'alwaysDash');
    this.commandRemember = this.readFlag(config, 'commandRemember');
    this.bgmVolume = this.readVolume(config, 'bgmVolume');
    this.bgsVolume = this.readVolume(config, 'bgsVolume');
    this.meVolume = this.readVolume(config, 'meVolume');
    this.seVolume = this.readVolume(config, 'seVolume');
    
    //if this one doesn't exist, then we just leave it at default (determined by the initializer above)
    if(config['showOnscreenControls'] != null) {
        this.showOnscreenControls = this.readFlag(config, 'showOnscreenControls');
    }
    
};




Window_Options.prototype.addGeneralOptions = function() {
    this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    this.addCommand(TextManager.commandRemember, 'commandRemember');

    this.addCommand("Show onscreen controls", 'showOnscreenControls');


};



Window_Options.prototype.getConfigValue = function(symbol) {
    return ConfigManager[symbol];
};

Window_Options.prototype.setConfigValue = function(symbol, volume) {
    ConfigManager[symbol] = volume;
};



/////////////////////////////Scene_PostMessage
//special message scene for printing text on the thermal printer, backpack exclusive

function Scene_PostMessage() {
    this.initialize.apply(this, arguments);
}

Scene_PostMessage.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PostMessage.prototype.constructor = Scene_PostMessage;

Scene_PostMessage.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_PostMessage.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    //this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createInputWindow();
};

Scene_PostMessage.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
};

Scene_PostMessage.prototype.createEditWindow = function() {
    this._editWindow = new Window_PostMessage(75, 25);
    this.addWindow(this._editWindow);
};

Scene_PostMessage.prototype.createInputWindow = function() {
    this._inputWindow = new Window_NameInput(this._editWindow);
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
    this.addWindow(this._inputWindow);
};

//on close, send a message
Scene_PostMessage.prototype.onInputOk = function() {
    //this._actor.setName(this._editWindow.name());
    outgoing = this._editWindow.name() + "\n";


    fetch(`/printer`, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        //     "Content-Length": outgoing.length
        // },
        body: JSON.stringify({ text: outgoing })
    })
    //.then(response => response.json())
    //.then(data => console.log(data));
    

    
    this.popScene();
};


/////////////////////////////Window_PostMessage
function Window_PostMessage() {
    this.initialize.apply(this, arguments);
}

Window_PostMessage.prototype = Object.create(Window_Base.prototype);
Window_PostMessage.prototype.constructor = Window_PostMessage;

Window_PostMessage.prototype.initialize = function(maxLength, lineLength) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    //this._actor = actor;
    this._name = ""; //actor.name().slice(0, this._maxLength);
    this._index = this._name.length;
    this._maxLength = maxLength;
    this._lineLength = lineLength;
    this._defaultName = this._name;
    this.deactivate();
    this.refresh();
    //ImageManager.reserveFace(actor.faceName());
};

Window_PostMessage.prototype.windowWidth = function() {
    return 480;
};

Window_PostMessage.prototype.windowHeight = function() {
    return this.fittingHeight(4);
};

Window_PostMessage.prototype.name = function() {
    return this._name;
};

Window_PostMessage.prototype.restoreDefault = function() {
    this._name = this._defaultName;
    this._index = this._name.length;
    this.refresh();
    return this._name.length > 0;
};

Window_PostMessage.prototype.add = function(ch) {
    if (this._index < this._maxLength) {
        this._name += ch;
        this._index++;
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_PostMessage.prototype.back = function() {
    if (this._index > 0) {
        this._index--;
        this._name = this._name.slice(0, this._index);
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_PostMessage.prototype.faceWidth = function() {
    return 0;
};

Window_PostMessage.prototype.charWidth = function() {
    var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
    return this.textWidth(text);
};

Window_PostMessage.prototype.left = function() {
    var nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
    var nameWidth = (this._lineLength + 1) * this.charWidth();
    return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
};

Window_PostMessage.prototype.itemRect = function(index) {
    return {
        x: this.left() + index % this._lineLength * this.charWidth(),
        y: 54 * Math.trunc(index / this._lineLength),
        width: this.charWidth(),
        height: this.lineHeight()
    };
};

Window_PostMessage.prototype.underlineRect = function(index) {
    var rect = this.itemRect(index);
    rect.x++;
    rect.y += rect.height - 4;
    rect.width -= 2;
    rect.height = 2;
    return rect;
};

Window_PostMessage.prototype.underlineColor = function() {
    return this.normalColor();
};

Window_PostMessage.prototype.drawUnderline = function(index) {
    var rect = this.underlineRect(index);
    var color = this.underlineColor();
    this.contents.paintOpacity = 48;
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.contents.paintOpacity = 255;
};

Window_PostMessage.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y);
};

Window_PostMessage.prototype.refresh = function() {
    this.contents.clear();
    //this.drawActorFace(this._actor, 0, 0);
    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};


