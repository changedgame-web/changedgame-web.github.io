


//99 potential save slots
DataManager.maxSavefiles = function() {
    return 99;
};

//-----------------------------------------------------------------------------
// Window_SavefileList
//
// The window for selecting a save file on the save and load screens.

function Window_SavefileList() {
    this.initialize.apply(this, arguments);
}

Window_SavefileList.prototype = Object.create(Window_Selectable.prototype);
Window_SavefileList.prototype.constructor = Window_SavefileList;

Window_SavefileList.prototype.initialize = function(x, y, width, height, filename, parentRef) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    if(filename) {
        this.f_m = filename;
    } else {
        this.f_m = TextManager.file
    }

    this.parentRef = parentRef;
    
    this.activate();
    this._mode = null;
};

Window_SavefileList.prototype.setMode = function(mode) {
    this._mode = mode;
};

Window_SavefileList.prototype.maxItems = function() {
    return DataManager.maxSavefiles();
};

Window_SavefileList.prototype.maxVisibleItems = function() {
    return 14;
};

Window_SavefileList.prototype.itemHeight = function() {
    var innerHeight = this.height - this.padding * 2;
    return Math.floor(innerHeight / this.maxVisibleItems());
};

//called when index is changed
Window_SavefileList.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    //console.log("Select called");

    //call info load from parent
    if(this.parentRef) {
        this.parentRef.putImageFromSub(this._index);
    }

    // if (info) {
    //     this.changePaintOpacity(valid);
    //     this.changePaintOpacity(true);
    //     //draw thumbnail + other info if this is the one selected
    //     if(this.index() == index) {
    //         this.parentRef.putImageFromSub(index, info);
    //     }
    // }


};

Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.itemRectForText(index);
    this.resetTextColor();
    if (this._mode === 'load') {
        this.changePaintOpacity(valid);
    }
    this.drawFileId(id, rect.x, rect.y);


    //console.log("DrawItem called");

};

Window_SavefileList.prototype.drawFileId = function(id, x, y) {
    //filename = 'data' + lss + '/Map%1.json'.format(mapId.padZero(3));
    //TextManager.file
    this.drawText(this.f_m + ' ' + '%1'.format(id.padZero(2)), x, y, 180);
};



Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
    if (info.title) {
        this.drawText(info.title, x, y, width);
    }
};




Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    if (info.playtime) {
        this.drawText(info.playtime, x, y, width, 'right');
    }
};

Window_SavefileList.prototype.playOkSound = function() {
};


//-----------------------------------------------------------------------------
// Window_SaveInfo
//
// The window that shows the image + savedata preview

function Window_SaveInfo() {
    this.initialize.apply(this, arguments);
}

Window_SaveInfo.prototype = Object.create(Window_Base.prototype);
Window_SaveInfo.prototype.constructor = Window_SaveInfo;

Window_SaveInfo.prototype.initialize = function(x, y, width, height, filename) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    if(filename) {
        this.f_m = filename;
    } else {
        this.f_m = TextManager.file
    }
    
    this.activate();
    this._mode = null;
};


// Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
//     var bitmap = ImageManager.loadCharacter(characterName);
//     var big = ImageManager.isBigCharacter(characterName);
//     var pw = bitmap.width / (big ? 3 : 12);
//     var ph = bitmap.height / (big ? 4 : 8);
//     var n = characterIndex;
//     var sx = (n % 4 * 3 + 1) * pw;
//     var sy = (Math.floor(n / 4) * 4) * ph;
//     this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
// };



Window_SaveInfo.prototype.showSaveInfo = function(index) {

    this.contents.clear();

    //global info is stored at StorageManager.load(0);
    //the rest of the save files extend down from there.

    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);

    //console.log(index);

    if (!valid) {

        //this save file doesn't have any info associated with it.

        this.drawText("No Such file!", 0, 444, this.width - 200, 'right');
        return;
    }

    // } else {
    //     this.drawText("We have file!", 0, 444, this.width - 200, 'right');
    // }



    //var json = StorageManager.load(id);
    //var sParsed = JSON.parse(json);
    var context = this;
    var game_name = $dataSystem.gameTitle;
    //oops! we already use the game_name with StorageManager.webStorageKey in our s/l methods.
    //var imageID = game_name + "_" + id + "_thumbnail";
    var imageID = "" + id + "_thumbnail";

    //async image load
    StorageManager.loadAlt(imageID, function(screenshot) {

        //extra 36 off the true width? (is this 6 * context padding? what is this constant?)
        var contextWidth = context.width - 36;
        var contextHeight = context.height - 36;

        //if screenshot file exists, load it. if not, put empty thumbnail
        if(screenshot) {

            var loadedBitmap = Bitmap.load(screenshot);

            //async bitmap loading, so we have to load it in with a callback
            loadedBitmap.addLoadListener(function() {
                //console.log("bitmap Loaded");
                

                var drawX = (contextWidth - loadedBitmap.width) / 2;
                var drawY = 6;

                //draw shadow
                context.contents.fillRect(drawX + 5, drawY + 5, loadedBitmap.width, loadedBitmap.height, "rgba(0, 0, 64, 1)")
                //draw loaded bitmap
                context.contents.blt(loadedBitmap, 0, 0, loadedBitmap.width, loadedBitmap.height, drawX, drawY);            

                //context.drawPartyCharacters(info, 288, 444);
                context.drawPartyCharacters(info, contextWidth / 2, contextHeight - 40);
            
                context.drawPlaytime(info, 0, contextHeight - context.lineHeight(), contextWidth);
                //context.drawPlaytime(info, 300, context.height, 200);
            
            }) 

        } else {

            context.drawText("Can't find screenshots!", 0, 168, contextWidth, 'center');
            //this.drawPartyCharacters(info, 288, 444);
            //this.drawPlaytime(info, 300, 400, 200);
            context.drawPlaytime(info, 0, contextHeight - context.lineHeight(), contextWidth);
            
            //relative to window's top left corner
            context.drawPartyCharacters(info, contextWidth / 2, contextHeight - 40);

        }


    })




}


Window_SaveInfo.prototype.drawPartyCharacters = function(info, x, y) {
    if (info.characters) {
        for (var i = 0; i < info.characters.length; i++) {
            var data = info.characters[i];
            this.drawCharacter(data[0], data[1], x + i * 48, y);
        }
    }
};

Window_SaveInfo.prototype.drawPlaytime = function(info, x, y, width) {
    if (info.playtime) {
        this.drawText(info.playtime, x, y, width, 'right');
    }
};


//-----------------------------------------------------------------------------
// Scene_File
//
// The superclass of Scene_Save and Scene_Load.

function Scene_File() {
    this.initialize.apply(this, arguments);
}

Scene_File.prototype = Object.create(Scene_MenuBase.prototype);
Scene_File.prototype.constructor = Scene_File;

Scene_File.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createSaveStrings();
    this.createHelpWindow();
    this.createListWindow();
};

Scene_File.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._listWindow.refresh();
};

Scene_File.prototype.savefileId = function() {
    return this._listWindow.index() + 1;
};

Scene_File.prototype.createSaveStrings = function() {

    this.s_m = "";
    this.l_m = "";
    this.f_m = "";


    var lang_num = parseInt(lang_str);
    switch(lang_num) {
        case 1:
            this.s_m     = "储存到第几个档位？"
            this.l_m     = "从第几个档位载入？"
            this.f_m            = "档案"
            break;
        case 2:
            this.s_m     = "儲存到第幾個檔位？"
            this.l_m     = "從第幾個檔位載入？"
            this.f_m            = "檔案"
            break;
        case 3:
            this.s_m     = "Try to stay hopeful."
            this.l_m     = "There is no point in reliving the past."
            this.f_m            = "Experience"
            break;
        case 4:
            this.s_m     = "セーブするファイルを選択してください。"
            this.l_m     = "呼び出すファイルを選択してください。"
            this.f_m            = "データ"
            break;
        case 5:
            this.s_m     = "몇번 위치에 저장할까요?"
            this.l_m     = "몇번 위치를 로드할까요?"
            this.f_m            = "파일"
            break;
        case 6:
            this.s_m     = "Tente manter a esperança."
            this.l_m     = "Não há sentido em reviver o passado."
            this.f_m            = "Experiência"
            break;
        case 7:
            this.s_m     = "Не теряй надежды."
            this.l_m     = "Нет смысла жить прошлым."
            this.f_m            = "Образец"
            break;
        case 8:
            this.s_m     = "Intenta mantener la esperanza."
            this.l_m     = "No tiene sentido revivir el pasado."
            this.f_m            = "Experiencia"
            break;
        case 9:
            this.s_m     = "บันทึกความหวัง"
            this.l_m     = "พยายามที่จะมีความหวัง"
            this.f_m            = "บันทึกเหตุการณ์"
            //Font.default_size = 30
            break;
        case 10:
            this.s_m     = "Try to stay hopeful."
            this.l_m     = "There is no point in reliving the past."
            this.f_m            = "Experience"
            break;
        default:
            this.s_m     = "储存到第几个档位？"
            this.l_m     = "从第几个档位载入？"
            this.f_m            = "档案"
            break;
    }

}

Scene_File.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(1);
    this._helpWindow.setText(this.helpWindowText());
    this.addWindow(this._helpWindow);
};

Scene_File.prototype.createListWindow = function() {

    //width of the file list
    var width = 240; //Graphics.boxWidth;
    //width = Graphics.boxWidth;

    var x = width;
    var y = this._helpWindow.height;
    var height = Graphics.boxHeight - y;
    this._infoWindow = new Window_SaveInfo(x, y, Graphics.boxWidth - x, height, this.f_m)
    //this._infoWindow.setMode(this.mode());
    //this._infoWindow.refresh();



    var x = 0;
    this._listWindow = new Window_SavefileList(x, y, width, height, this.f_m, this);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());



    this._listWindow.refresh();
    this.addWindow(this._listWindow);
    this.addWindow(this._infoWindow);


};

Scene_File.prototype.mode = function() {
    return null;
};

Scene_File.prototype.activateListWindow = function() {
    this._listWindow.activate();
};

Scene_File.prototype.helpWindowText = function() {
    return '';
};

Scene_File.prototype.firstSavefileIndex = function() {
    return 0;
};

Scene_File.prototype.onSavefileOk = function() {
};

//todo: make this interaction cleaner
Scene_File.prototype.putImageFromSub = function(index) {
    //Scene_MenuBase.prototype.update.call(this);


    this._infoWindow.showSaveInfo(index);



};



//-----------------------------------------------------------------------------
// Scene_Save
//
// The scene class of the save screen.

function Scene_Save() {
    this.initialize.apply(this, arguments);
}

Scene_Save.prototype = Object.create(Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;

Scene_Save.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
};

Scene_Save.prototype.mode = function() {
    return 'save';
};

Scene_Save.prototype.helpWindowText = function() {
    var stext = "";
    if(this.s_m) {
        stext = this.s_m;
    } else {
        stext = TextManager.saveMessage;
    }
    return stext;
};

Scene_Save.prototype.firstSavefileIndex = function() {
    return DataManager.lastAccessedSavefileId() - 1;
};

Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
        this.onSaveSuccess();
    } else {
        this.onSaveFailure();
    }
};

Scene_Save.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
	StorageManager.cleanBackup(this.savefileId());
    this.popScene();
};

Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};

//-----------------------------------------------------------------------------
// Scene_Load
//
// The scene class of the load screen.

function Scene_Load() {
    this.initialize.apply(this, arguments);
}

Scene_Load.prototype = Object.create(Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;

Scene_Load.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
    this._loadSuccess = false;
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};

Scene_Load.prototype.mode = function() {
    return 'load';
};

Scene_Load.prototype.helpWindowText = function() {
    var stext = "";
    if(this.l_m) {
        stext = this.l_m;
    } else {
        stext = TextManager.loadMessage;
    }
    return stext;
};

Scene_Load.prototype.firstSavefileIndex = function() {
    return DataManager.latestSavefileId() - 1;
};

Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};

Scene_Load.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};

Scene_Load.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};

Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};


//modify scene_map's terminate function to take a screenshot on exit
//DataManager.makeSaveContents
//SceneManager.snap
var $gameScreenshot       = null;

//resize the bitmap containing an image by stretching it w/h
Bitmap.prototype.imageResize = function(newWidth, newHeight) {
    //(could probably do this better, but this works. I'm not complaining.

    var w = this.width;
    var h = this.height;
    var canvas = this._canvas;
    var context = this._context;

    //backup image
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    var tempContext = tempCanvas.getContext('2d');
    tempContext.drawImage(canvas, 0, 0, w, h);

    //resize main canvas
    newWidth = Math.max(newWidth || 0, 1);
    newHeight = Math.max(newHeight || 0, 1);
    this._canvas.width = newWidth;
    this._canvas.height = newHeight;
    this._baseTexture.width = newWidth;
    this._baseTexture.height = newHeight;

    //put backup image onto main canvas (disable image smoothing)
    //var oldImageSetting = context.imageSmoothingEnabled;
    //context.imageSmoothingEnabled = false;
    context.drawImage(tempCanvas, 0, 0, newWidth, newHeight);
    //context.imageSmoothingEnabled = oldImageSetting;

    //do I need to set this flag? not sure, but I'll do it anyway.
    this._setDirty();
};


Scene_Map.prototype.terminate = function() {
    
    //console.log("Scene_Map terminated");
    //take screenshot
    var sceneCanvas = SceneManager.snap();
    
    if(sceneCanvas._canvas) {
        //console.log("saved");
        //$gameScreenshot = sceneCanvas._canvas.toDataURL('image/png');
    

        //we have <5mb of local website storage, we should probably do everything we can to reduce these.
        //or we should (and will) use localDB to store screenshots
        // return Utils.isNwjs()
        // if(StorageManager.isLocalMode()) {
        if(true) {
            //original dimensions from Save.rb scaled by 1.5
            sceneCanvas.imageResize(489, 374);
            $gameScreenshot = sceneCanvas._canvas.toDataURL('image/png');
        } else {
            //how much smaller are JPGs? should we even attempt to use them?
            sceneCanvas.imageResize(489, 374);
            $gameScreenshot = sceneCanvas._canvas.toDataURL('image/jpeg', 0.4);
        }


    } else {
        $gameScreenshot = null;
    }


    //the rest of the method:
    Scene_Base.prototype.terminate.call(this);
    if (!SceneManager.isNextScene(Scene_Battle)) {
        this._spriteset.update();
        this._mapNameWindow.hide();
        SceneManager.snapForBackground();
    } else {
        ImageManager.clearRequest();
    }

    if (SceneManager.isNextScene(Scene_Map)) {
        ImageManager.clearRequest();
    }

    $gameScreen.clearZoom();

    this.removeChild(this._fadeSprite);
    this.removeChild(this._mapNameWindow);
    this.removeChild(this._windowLayer);
    this.removeChild(this._spriteset);
};

//even though this has the other info we need, it's all lumped into a single file and loading it repeatedly really slows things down
// DataManager.makeSavefileInfo = function() {
//     var info = {};
//     info.globalId   = this._globalId;
//     info.title      = $dataSystem.gameTitle;
//     info.characters = $gameParty.charactersForSavefile();
//     info.faces      = $gameParty.facesForSavefile();
//     info.playtime   = $gameSystem.playtimeText();
//     info.timestamp  = Date.now();
//     info.screenshot = $gameScreenshot;
//     return info;
// };


DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    var contents = {};
    contents.system       = $gameSystem;
    contents.screen       = $gameScreen;
    contents.timer        = $gameTimer;
    contents.switches     = $gameSwitches;
    contents.variables    = $gameVariables;
    contents.selfSwitches = $gameSelfSwitches;
    contents.actors       = $gameActors;
    contents.party        = $gameParty;
    contents.map          = $gameMap;
    contents.player       = $gamePlayer;
    
    //moved to different storage API
    //contents.screenshot = $gameScreenshot;
    return contents;
};


//alteration: added image saving
DataManager.saveGameWithoutRescue = function(savefileId) {
    var json = JsonEx.stringify(this.makeSaveContents());
    if (json.length >= 200000) {
        console.warn('Save data too big!');
    }
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);

    //save image
    var game_name = $dataSystem.gameTitle;
    var imageID = "" + savefileId + "_thumbnail";
    StorageManager.saveAlt(imageID, $gameScreenshot);

    return true;
};





