
//see: https://github.com/DVLP/localStorageDB/blob/master/localdata.js
(function () {
    var win = typeof window !== 'undefined' ? window : {}
    var indexedDB = win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
    if (typeof window !== 'undefined' && !indexedDB) {
        console.error('indexDB not supported');
        return;
    }
    var db,
        request = indexedDB.open('ldb', 1);
    request.onsuccess = function (evt) {
        db = this.result;
    };
    request.onerror = function (event) {
        console.error('indexedDB request error');
        console.log(event);
    };

    request.onupgradeneeded = function (event) {
        db = null;
        var store = event.target.result.createObjectStore('s', {
            keyPath: 'k'
        });

        store.transaction.oncomplete = function (e) {
            db = e.target.db;
        };
    };

    // if using proxy mode comment this

    var ldb = {
        ready: false,
        get: function (key, callback) {
            if (!db) {
                setTimeout(function () { ldb.get(key, callback); }, 50);
                return;
            }
            var getRequest = db.transaction('s').objectStore('s').get(key);
            getRequest.onsuccess = function (event) {
                var result = (event.target.result && event.target.result['v']) || null;
                callback(result);
            };
            getRequest.onerror = function(event) {
                callback(null);
            };
        },

        set: function (key, value, callback) {
            if (!db) {
                setTimeout(function () { ldb.set(key, value, callback); }, 50);
                return;
            }
            var txn = db.transaction('s', 'readwrite');
            txn.oncomplete = function (event) {
                var toString$ = {}.toString;
                if (toString$.call(callback).slice(8, -1) === 'Function') {
                    callback();
                }
            };
            txn.objectStore('s').put({
                'k': key,
                'v': value
            });
            txn.commit();
        },
        delete: function (key, callback) {
            if (!db) {
                setTimeout(function () { ldb.delete(key, callback); }, 50);
                return;
            }
            db.transaction('s', 'readwrite').objectStore('s').delete(key).onsuccess = function (event) {
                if (callback) callback();
            };
        },
        list: function (callback) {
            if (!db) {
                setTimeout(function () { ldb.list(callback); }, 50);
                return;
            }
            db.transaction('s').objectStore('s').getAllKeys().onsuccess = function (event) {
                var result = (event.target.result) || null;
                callback(result);
            };
        },
        getAll: function (callback) {
            if (!db) {
                setTimeout(function () { ldb.getAll(callback); }, 50);
                return;
            }
            db.transaction('s').objectStore('s').getAll().onsuccess = function (event) {
                var result = (event.target.result) || null;
                callback(result);
            };
        },
        clear: function (callback) {
            if (!db) {
                setTimeout(function () { ldb.clear(callback); }, 50);
                return;
            }
            db.transaction('s', 'readwrite').objectStore('s').clear().onsuccess = function (event) {
                if (callback) callback();
            };
        }
    };
    var exported = {
        'get': ldb.get,
        'set': ldb.set,
        'delete': ldb.delete,
        'list': ldb.list,
        'getAll': ldb.getAll,
        'clear': ldb.clear
    };
    win['ldb'] = exported;
    if (typeof module !== 'undefined') {
        module.exports = exported;
    }

    // Use only for apps that will only work on latest devices only

    // window.ldb = new Proxy({}, {
    //   get: function(func, key, callback) {
    //     return (key === 'get') ? getValue : function(callback) {
    //       return getValue(key, callback)
    //     };
    //   },
    //   set: function(func, key, value) {
    //    let txn = db.transaction('s', 'readwrite'); 
    //    txn.oncomplete = function(event) {
    //      var toString$ = {}.toString;
    //      if (toString$.call(callback).slice(8, -1) === 'Function') {
    //        callback();
    //      }
    //    }
    //    txn.objectStore('s').put({
    //   'k': key,
    //   'v': value,
    // });
    //    txn.commit();
    //   }
    // });
})();


////////////////////////////////////////////////////////
//all methods that use localStorage:



/*
        'get': ldb.get,
        'set': ldb.set,
        'delete': ldb.delete,
        'list': ldb.list,
        'getAll': ldb.getAll,
        'clear': ldb.clear,

*/






//alternate functions that save and load to the indexedDB
//or through local files again if it's not in the browser
StorageManager.saveAlt = function(savefileId, data) {
    if (this.isLocalMode()) {
        this.saveToLocalFile(savefileId, data);
    } else {
        this.saveToWebIndexedDB(savefileId, data);
    }
};

StorageManager.loadAlt = function(savefileId, callback) {
    if (this.isLocalMode()) {
        var result = this.loadFromLocalFile(savefileId);
        callback(result);
    } else {
        this.loadFromIndexedDB(savefileId, callback);
    }
};

StorageManager.removeAlt = function(savefileId) {
    if (this.isLocalMode()) {
        this.removeLocalFile(savefileId);
    } else {
        this.removeWebStorage(savefileId);
    }
};

//helpers for the functions above
StorageManager.saveToWebIndexedDB = function(savefileId, in_data) {
    var key = this.webStorageKey(savefileId);
    var data = LZString.compressToBase64(in_data);
    ldb.set(key, data);
};

//the key difference from normal localStorage: we can't return a loaded value, we have to run a callback that takes it as an argument
//callback args: fn(result)
StorageManager.loadFromIndexedDB = function(savefileId, callback) {
    var key = this.webStorageKey(savefileId);    
    ldb.get(key, function(result) {
        callback(LZString.decompressFromBase64(result));
    });
};

StorageManager.removeIndexedDB = function(savefileId) {
    var key = this.webStorageKey(savefileId);
    ldb.delete(key);
};





//we can't use ldb to load files synchronously, so we can't use it for the greater program.
//the only thing we need this for is for saving savedata pictures, so we'll just save those separately using the localStorageDB directly
/*

StorageManager.webStorageKey = function (savefileId) {
    if (savefileId < 0) {
        return 'RPG Config';
    } else if (savefileId === 0) {
        return 'RPG Global';
    } else {
        return 'RPG File%1'.format(savefileId);
    }
};


//todo: comb through local 
StorageManager.moveFiles = function () {


    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        if(key.includes("RPG Config") || key.includes("RPG Global") || key.includes("RPG File")) {
            //transfer it to indexedDB

            //function (key, value, callback)
            ldb.set(key, value, function() {
                console.log("Moved: " + key + " to indexedDB.");
                
                //localStorage.removeItem(key);
            });

        }
    }


}


StorageManager.backup = function (savefileId) {
    if (this.exists(savefileId)) {
        if (this.isLocalMode()) {
            var data = this.loadFromLocalFile(savefileId);
            var compressed = LZString.compressToBase64(data);
            var fs = require('fs');
            var dirPath = this.localFileDirectoryPath();
            var filePath = this.localFilePath(savefileId) + ".bak";
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, compressed);
        } else {
            var data = this.loadFromWebStorage(savefileId);
            var compressed = LZString.compressToBase64(data);
            var key = this.webStorageKey(savefileId) + "bak";
            
            //localStorage.setItem(key, compressed);
            ldb.set(key, compressed);


        }
    }
};


StorageManager.cleanBackup = function (savefileId) {
    if (this.backupExists(savefileId)) {
        if (this.isLocalMode()) {
            var fs = require('fs');
            var dirPath = this.localFileDirectoryPath();
            var filePath = this.localFilePath(savefileId);
            fs.unlinkSync(filePath + ".bak");
        } else {
            var key = this.webStorageKey(savefileId);

            //localStorage.removeItem(key + "bak");
            ldb.delete(key + "bak");
        }
    }
};

StorageManager.restoreBackup = function (savefileId) {
    if (this.backupExists(savefileId)) {
        if (this.isLocalMode()) {
            var data = this.loadFromLocalBackupFile(savefileId);
            var compressed = LZString.compressToBase64(data);
            var fs = require('fs');
            var dirPath = this.localFileDirectoryPath();
            var filePath = this.localFilePath(savefileId);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, compressed);
            fs.unlinkSync(filePath + ".bak");
        } else {
            var data = this.loadFromWebStorageBackup(savefileId);
            var compressed = LZString.compressToBase64(data);
            var key = this.webStorageKey(savefileId);

            //localStorage.setItem(key, compressed);
            //localStorage.removeItem(key + "bak");
            ldb.set(key, compressed);
            ldb.delete(key + "bak");

        }
    }
};




StorageManager.saveToWebStorage = function (savefileId, json) {
    var key = this.webStorageKey(savefileId);
    var data = LZString.compressToBase64(json);

    //localStorage.setItem(key, data);
    ldb.set(key, data);

};

StorageManager.loadFromWebStorage = function (savefileId) {
    var key = this.webStorageKey(savefileId);

    //var data = localStorage.getItem(key);
    var data = ldb.get(key, function() {
        console.log("GET");
    });
    while(1) {
        yield()
    }


    return LZString.decompressFromBase64(data);
};

StorageManager.loadFromWebStorageBackup = function (savefileId) {
    var key = this.webStorageKey(savefileId) + "bak";


    //var data = localStorage.getItem(key);
    var data = ldb.getSync(key);


    return LZString.decompressFromBase64(data);
};

StorageManager.webStorageBackupExists = function (savefileId) {
    var key = this.webStorageKey(savefileId) + "bak";



    //return !!localStorage.getItem(key);
    return !!ldb.getSync(key);

};

StorageManager.webStorageExists = function (savefileId) {
    var key = this.webStorageKey(savefileId);


    //return !!localStorage.getItem(key);
    return !!ldb.getSync(key);
};

StorageManager.removeWebStorage = function (savefileId) {
    var key = this.webStorageKey(savefileId);


    //localStorage.removeItem(key);
    ldb.delete(key);


};

*/