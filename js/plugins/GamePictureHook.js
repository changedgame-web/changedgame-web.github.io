



console.log("Loaded GamePictureHook.js!");

var lang_filename = "lang.txt";
var lang_str = "3";

(function() {

})();


//fake call hooks for the steam user status API. I'll leave the calls in the program in case I want to add that back.
class SteamUserStatsLite {

    constructor() {

    }

    static instance() {
        return sssl;
    }

    set_achievement(input) {
        console.log("Steam Set ACH: " + input);
    } 

    update() {
        console.log("Steam Update Called.");
    }

}
const sssl = new SteamUserStatsLite();


//rpg_object.js, retrofitting modified methods 

//////////////////////////////////////////////////
//Game_Character.rb
//////////////////////////////////////////////////

//tweaked version: not used in lieu of the dirty (guaranteed accurate) versions
/*
Game_Character.prototype.moveTowardCharacter = function(character) {
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);
    //map method definition found in rpg_object.js
    var width = Game_Map.prototype.width();
    var height = Game_Map.prototype.height();
    if(Game_Map.prototype.isLoopHorizontal() &&
        sx < -width && sx > -width * 2) {
        sx += width * 2;
    }
    if(Game_Map.prototype.isLoopVertical() &&
        sy < -height && sy > -height * 2) {
        sy += height * 2;
    }


    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};

Game_Character.prototype.moveAwayFromCharacter = function(character) {
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);

    var width = Game_Map.prototype.width();
    var height = Game_Map.prototype.height();
    if(Game_Map.prototype.isLoopHorizontal() &&
        sx < -width && sx > -width * 2) {
        sx += width * 2;
    }
    if(Game_Map.prototype.isLoopVertical() &&
        sy < -height && sy > -height * 2) {
        sy += height * 2;
    }

    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 6 : 4);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 2 : 8);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 2 : 8);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 6 : 4);
        }
    }
};
*/


//dirty re-implementation of the code used in the original game, rather than tweaking the new code to match.
Game_Character.prototype.deltaXFromPlayer = function() {

    var sx = this.x - $gamePlayer.x;
    var width = Game_Map.prototype.width();

    if (Game_Map.prototype.isLoopHorizontal()) {
        if (sx == 1 - width) {
            sx += width;
        } else if (Math.abs(sx) > width / 2) {
            sx -= width;
        }
    }

    return sx
    //return $gameMap.deltaX(this.x, x);
};

Game_Character.prototype.deltaYFromPlayer = function() {

    var sy = this.y - $gamePlayer.y;
    var height = Game_Map.prototype.height();

    if (Game_Map.prototype.isLoopVertical()) {
        if (sy == 1 - height) {
            sy += height;
        } else if (Math.abs(sy) > height / 2) {
            sy -= height;
        }
    }

    return sy
    //return $gameMap.deltaY(this.y, y);
};

Game_Character.prototype.moveTowardPlayer = function() {

    var sx = this.deltaXFromPlayer(); //err: character not defined
    var sy = this.deltaYFromPlayer();
    var width = Game_Map.prototype.width();
    var height = Game_Map.prototype.height();

    if (Game_Map.prototype.isLoopHorizontal() &&
        sx < -width && sx > -width * 2) {
        sx += width * 2;
    }
    if (Game_Map.prototype.isLoopVertical() &&
        sy < -height && sy > -height * 2) {
        sy += height * 2;
    }

    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }

    //this.moveTowardCharacter($gamePlayer);
};

Game_Character.prototype.moveAwayFromPlayer = function() {

    var sx = this.deltaXFromPlayer();
    var sy = this.deltaYFromPlayer();
    var width = Game_Map.prototype.width();
    var height = Game_Map.prototype.height();

    if (Game_Map.prototype.isLoopHorizontal() &&
        sx < -width && sx > -width * 2) {
        sx += width * 2;
    }
    if (Game_Map.prototype.isLoopVertical() &&
        sy < -height && sy > -height * 2) {
        sy += height * 2;
    }


    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 6 : 4);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 2 : 8);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 2 : 8);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 6 : 4);
        }
    }

};

//to fix the box pushing issue... we need to call updateRoutineMove (often run from Game_Event moveTypeCustom)
//at the end of this method.
Game_Character.prototype.forceMoveRoute = function(moveRoute) {
    if (!this._originalMoveRoute) {
        this.memorizeMoveRoute();
    }
    this._moveRoute = moveRoute;
    this._moveRouteIndex = 0;
    this._moveRouteForcing = true;
    this._waitCount = 0;
    this.updateRoutineMove();
};


//////////////////////////////////////////////////
//Game_Event.rb
//////////////////////////////////////////////////


Game_Event.prototype.setupPageSettings = function() {
    var page = this.page();
    var image = page.image;
    if (image.tileId > 0) {
        this.setTileImage(image.tileId);
    } else {
        this.setImage(image.characterName, image.characterIndex);
    }


    //Game_CharacterBase.prototype.characterName
    //picture NPCs with localized text
    if (image.characterName == "$!03" ||
        image.characterName == "$!07" ||
        image.characterName == "$!13" ||
        image.characterName == "$!14" ||
        image.characterName == "$!15" ||
        image.characterName == "$!16" ||
        image.characterName == "$!19"
    ) {
        if(lang_str == "1") {
            //we may want to use setImage instead... wait no. there's private stuff below. we good.
            this._characterName = image.characterName;
        } else {
            this._characterName = image.characterName + "_" + lang_str;
        }
    } else {
        this._characterName = image.characterName;
    }


    if (this._originalDirection !== image.direction) {
        this._originalDirection = image.direction;
        this._prelockDirection = 0;
        this.setDirectionFix(false);
        this.setDirection(image.direction);
    }
    if (this._originalPattern !== image.pattern) {
        this._originalPattern = image.pattern;
        this.setPattern(image.pattern);
    }
    this.setMoveSpeed(page.moveSpeed);
    this.setMoveFrequency(page.moveFrequency);
    this.setPriorityType(page.priorityType);
    this.setWalkAnime(page.walkAnime);
    this.setStepAnime(page.stepAnime);
    this.setDirectionFix(page.directionFix);
    this.setThrough(page.through);
    this.setMoveRoute(page.moveRoute);
    this._moveType = page.moveType;
    this._trigger = page.trigger;
    if (this._trigger === 4) {
        this._interpreter = new Game_Interpreter();
    } else {
        this._interpreter = null;
    }

};


Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    if (!$gameMap.isEventRunning()) {

        if (Game_Map.prototype.isLoopHorizontal() && x < 0) {
            x += Game_Map.prototype.width();
        }
        if (Game_Map.prototype.isLoopVertical() && y < 0) {
            y += Game_Map.prototype.height();
        }

        if (this._trigger === 2 && $gamePlayer.pos(x, y)) {
            if (!this.isJumping() && this.isNormalPriority()) {
                this.start();
            }
        }
    }
};



//////////////////////////////////////////////////
//Game_Map.rb
//////////////////////////////////////////////////

//disable mapnames in all files because I'm too lazy to do it per-each.
Game_Map.prototype.isNameDisplayEnabled = function() {
    return false;
};

//turns out we leave this one stock
Game_Map.prototype.setup = function(mapId) {
    if (!$dataMap) {
        throw new Error('The map data is not available');
    }
    this._mapId = mapId;
    this._tilesetId = $dataMap.tilesetId;
    this._displayX = 0;
    this._displayY = 0;
    this.refereshVehicles();
    this.setupEvents();
    this.setupScroll();
    this.setupParallax();
    this.setupBattleback();
    this._needsRefresh = false;
};

//use this instead of the function above because of the way the internet loader works
DataManager.loadMapData = function(mapId) {
    if (mapId > 0) {

        //TODO: open the language file
        //f1 = File.open(File.join("Audio/","lang.txt"),"r")

        var lss = lang_str;
        var filename = "";

        //turn this into != when we finally get it working... we must move all sub-data into their respective sub-folders.
        if(lss != "1") {
            filename = 'data' + lss + '/Map%1.json'.format(mapId.padZero(3));
        } else {
            filename = 'Map%1.json'.format(mapId.padZero(3));
        }
        //var filename = 'Map%1.json'.format(mapId.padZero(3));
        
        this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataMap', filename));
        this.loadDataFile('$dataMap', filename);
    } else {
        this.makeEmptyMap();
    }
};


//how do we change this one? the one above calls it... but so do other things.
//currently unmodified
DataManager.loadDataFile = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad(window[name]);
        }
    };
    xhr.onerror = this._mapLoader || function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();
};


//"autoplay" also seems to be different, but the new version matches that of the following code: I think it's already changed...
//Game_Map.prototype.autoplay

//we need to access the savefile location... I think this one should do it.
//MV is build on node.js... I wonder how the in-browser version of the game handles saves (does it use the localstorage API?)
//looks like it uses StorageManager.isLocalMode to switch between storage types

//DataManager.saveGame is the main upper-level save caller

//StorageManager.save is our generic file handler abstraction layer



//////////////////////////////////////////////////
//Game_Picture.rb
//////////////////////////////////////////////////



//args: name: string, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number
//var show_super = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {

    //we may also need to modify:
    //ImageManager.requestPicture
    //since that function seems to try and pre-emptively load these images without changing their path.
    //Instead of this, I've added a "dummy" 67/68 picture to the list for now, both so I can select that number when editing the event and so I don't get a 404 on image load.

    //should we hook the image name here, or should we do it in the loading function? (I.E. make it still "think" 67/68 are the ones it loaded...)
    //I think with the second option, changing the language on the fly no longer becomes possible...
    // console.log("GP_proto_show!");
    if(name == "67" || name == "68") {
        name = name + "_" + lang_str;
    }

    
    //original defition for this function is in rpg_object.js
    //I'm too lazy to do a full context transfer, so I'm just going to do a full duplicate instead
    //show_super(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    this._name = name;
    this._origin = origin;
    this._x = x;
    this._y = y;
    this._scaleX = scaleX;
    this._scaleY = scaleY;
    this._opacity = opacity;
    this._blendMode = blendMode;
    this.initTarget();
    this.initTone();
    this.initRotation();

}

//again just like the dataManager, we need to edit the imageManager


//not sure what the difference between the "load" and "request" functions are, but we need to edit both it seems

ImageManager.requestBitmap = function(folder, filename, hue, smooth) {
    if (filename) {

        if(filename == "67" || filename == "68") {
            filename = filename + "_" + lang_str;
        }

        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.requestNormalBitmap(path, hue || 0);
        bitmap.smooth = smooth;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};

ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
    if (filename) {

        if(filename == "67" || filename == "68") {
            filename = filename + "_" + lang_str;
        }

        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.loadNormalBitmap(path, hue || 0);
        bitmap.smooth = smooth;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};



//////////////////////////////////////////////////
//Game_Player.rb
//////////////////////////////////////////////////

Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
        this.setDirection(this._newDirection);
        if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
            $gameMap.setup(this._newMapId);
            this._needsMapReload = false;
        }
        $gameSystem.saveWalkingBgm2(); //this._walkingBgm = $dataMap.bgm;

        this.locate(this._newX, this._newY);
        
        //not present in the VX version of the game: it ruins some implied effects that assume this doesn't happen
        //Example: it resets the player's spritesheet to default
        //this.refresh();
        
        this.clearTransferInfo();
    }
};



Game_Player.prototype.checkEventTriggerTouch = function(x, y) {


    var width = Game_Map.prototype.width();
    var height = Game_Map.prototype.height();

    if (Game_Map.prototype.isLoopHorizontal() &&
        x == width) {
        x -= width;
    }
    if (Game_Map.prototype.isLoopVertical() &&
        y == height ) {
        y -= height;
    }


    if (this.canStartLocalEvents()) {
        this.startMapEvent(x, y, [1,2], true);
    }
};


//////////////////////////////////////////////////
//Game_Temp.rb
//////////////////////////////////////////////////


Game_Temp.prototype.initialize = function() {
    this._isPlaytest = Utils.isOptionValid('test');
    this._commonEventId = 0;
    this._destinationX = null;
    this._destinationY = null;

};


//load language preferences on start. The file only needs to be reloaded when we change languages in Scene_Lang
(function(){

    //check if file exists and make it if it doesn't, putting in a default of 1
    
    //this is the only place where the file might not exist,
    //so other than the language selection section itself, no other writes to the filesystem need to be made
    if(StorageManager.exists(lang_filename)) {
        lang_str = StorageManager.load(lang_filename);
    } else {
        //file doesn't exist yet, default language to our hard-coded fallback
        StorageManager.save(lang_filename, lang_str);
    }

})();


//TODO: font
// Bitmap.prototype.setFontSize = function(px) {
//     this.fontSize = px;
// }

//////////////////////////////////////////////////
//Main.rb
//////////////////////////////////////////////////

//TODO: font


//////////////////////////////////////////////////
//Save.rb
//////////////////////////////////////////////////


//TODO: the whole file,
//this UI is from a custom plugin made by some user back in 2008.
//https://rpg.blue/thread-85115-1-1.html
//They're banned though, so I can't see what they've said.
//see: Save.js

//////////////////////////////////////////////////
//Scene_Title~@1.rb
//////////////////////////////////////////////////

//extra methods that add new options to the title
//see: ExtendedTitle.js





//////////////////////////////////////////////////
//Scene_File.rb
//////////////////////////////////////////////////

Scene_Load.prototype.reloadMapIfUpdated = function() {
    //commented out in 
    //if ($gameSystem.versionId() !== $dataSystem.versionId) {
    $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
    $gamePlayer.requestMapReload();
    //}
};

//todo: modify this function, see Scene_Title.rb and rpg_manager.js
DataManager.loadDatabase = function() {
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
        var src = this._databaseFiles[i].src;

        //load files from the correct spot (excluding the mapInfos file, as per stock behavior)
        if(lang_str != "1" && !src.includes("MapInfos")) {
            src = "data" + lang_str + "/" + src;
        }

        this.loadDataFile(name, prefix + src);
    }
    if (this.isEventTest()) {
        this.loadDataFile('$testEvent', prefix + 'Event.json');
    }
};



//////////////////////////////////////////////////
//Window_SaveFile.rb
//////////////////////////////////////////////////

// //appearently, this one is modified, but it's unused since Save.rb overrides it.
// Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
//     if (info.characters) {
//         for (var i = 0; i < info.characters.length; i++) {
//             var data = info.characters[i];
//             //name, index, x, y
//             this.drawCharacter(data[0], data[1], x + i * 48, y + 50);
//         }
//     }
// };



//extra note:
//Window_Base.prototype.processNormalCharacter is sometimes fed one less argument than intended,
//this results in log warning spam in the console, though it doesn't affect anything.






