console.log("Adding polyfills.");

//I need to apply at least this polyfill out of the gate:
//since PluginManager.setup($plugins) breaks the program before we can even get to MiscTweaks.js.
//it errors at: PluginManager.loadScript
//at: this.onError.bind(this); since .bind() is not defined for ios 5.
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}



//these could probably be in MiscTweaks.js, but I'll keep all the polyfills in the same place.

//array.includes polyfill, courtesy of the LLM
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);
    var len = o.length >>> 0;

    if (len === 0) {
      return false;
    }

    var n = fromIndex | 0;
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      var element = o[k];

      // SameValueZero comparison
      if (
        element === searchElement ||
        (typeof element === 'number' &&
         typeof searchElement === 'number' &&
         isNaN(element) &&
         isNaN(searchElement))
      ) {
        return true;
      }
      k++;
    }

    return false;
  };
}

//another for string.includes
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (search instanceof RegExp) {
      throw new TypeError('First argument must not be a RegExp');
    }

    if (start === undefined) {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    }

    return this.indexOf(search, start) !== -1;
  };
}

//array.fill polyfill
if (!Array.prototype.fill) {
  Array.prototype.fill = function (value, start, end) {
    if (this == null) {
      throw new TypeError('Cannot convert this to object');
    }

    var obj = Object(this);
    var len = obj.length >>> 0;

    var relativeStart = start >> 0; // to integer
    var k = relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

    var relativeEnd = end === undefined ? len : end >> 0;
    var final = relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

    while (k < final) {
      obj[k] = value;
      k++;
    }

    return obj;
  };
}

//Function.bind polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}

//math.trunc polyfill
if (!Math.trunc) {
  Math.trunc = function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
}