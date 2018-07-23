if (typeof kendo != "undefined") {
    kendo.ns = "kendo-";
}

createNamespace("TF").productName = "routefinder";

createNamespace("TF").snapTolerance = 5;

var API = {
    Objects:
    {
        LatLng: function (lat, lng) {
            this.Lng = lng;
            this.Lat = lat;

            this.ToGeoJSONPoint = function () {
                return {
                    type: "Point",
                    coordinates: [this.Lng, this.Lat]
                };
            };
        }
    }
};

var GeoJSON = {
    Point: function (lng, lat) {
        this.type = "Point";
        this.coordinates = [lng, lat];
    },

    Feature: function (geometry, properties) {
        this.type = "Feature";
        this.geometry = geometry;
        this.properties = properties;
    },

    FeatureCollection: function (features) {
        this.type = "FeatureCollection";
        this.features = features;
    }
};

function get_random_color() {
    var letters = "12345678".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 7)];
    }
    return color;
}

function pathCombine() {
    var output = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
        if (output.substr(output.length - 1) != "/") {
            output += "/" + arguments[i];
        }
        else {
            output += arguments[i];
        }
    }
    output = output.replace(/[/]+/g, "/").replace("http:/", "http://").replace("https:/", "https://");
    return output;
}

function toCamelCase(input) {
    if (input.length < 1) {
        return input;
    }
    return input[0].toUpperCase() + input.toLowerCase().substring(1, input.length);
}

function timeStringFromJSONDate(str) {
    if (!(str.match(/\d+/))) {
        return false;
    }
    var date = new Date(parseInt(str.substr(6)));
    // date.setTime (match[0] - 0);
    return date.toLocaleTimeString();
}

function dateStringFromJSONDate(str) {
    if (!(str.match(/\d+/))) {
        return false;
    }
    var date = new Date(parseInt(str.substr(6)));
    // date.setTime (match[0] - 0);
    return date.toLocaleDateString();
}

function dateTimeStringFromJSONDate(str) {
    if (!(str.match(/\d+/))) {
        return false;
    }
    var date = new Date(parseInt(str.substr(6)));
    // date.setTime (match[0] - 0);
    return date.toLocaleString();
}

function isFunction(x) {
    return Object.prototype.toString.call(x) == "[object Function]";
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isPhoneDevice() {
    return isMobileDevice() && window.screen.width < 768;
}

function isSafari() {
    var chrome = navigator.userAgent.indexOf("CriOS") > -1 || navigator.userAgent.indexOf("Chrome") > -1;
    var safari = navigator.userAgent.indexOf("Safari") > -1;
    if ((chrome) && (safari)) safari = false;
    return safari;
}

function isSmallScreen() {
    return window.innerHeight < 621 || window.innerWidth < 621;
}

function isPortrait() {
    return isMobileDevice() && window.innerHeight > window.innerWidth;
}

function isLandscape() {
    return isMobileDevice() && window.innerWidth > window.innerHeight;
}
createNamespace("TF").isMobileDevice = isMobileDevice();
createNamespace("TF").isSafari = isSafari();
createNamespace("TF").isPhoneDevice = isPhoneDevice();
createNamespace("TF").isPortrait = isPortrait;
createNamespace("TF").isLandscape = isLandscape;

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        hash = window.location.hash.split("?"),
        search = hash.length > 1 ? hash[1] : "";
    var r = search.match(reg);
    return r != null ? r[2] : null;
}

createNamespace("TF").getHashCode = function (str) {
    return str.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
};

Array.remove = function (array, item) {
    var index;
    while ((index = array.indexOf(item)) > -1)
        array.splice(index, 1);
};

Array.extend = function (arr1, arr2) {
    if (arguments.length <= 2) {
        Array.prototype.push.apply(arr1, arr2);
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            Array.prototype.push.apply(arr1, arguments[i]);
        }
    }
    return arr1;
};

Array.contain = function (arr, item) {
    return arr.indexOf(item) != -1;
};

Array.equals = function (arr1, arr2) {
    arr1 = arr1.sort();
    arr2 = arr2.sort();
    // if the other array is a falsy value, return
    if (!arr2)
        return false;

    // compare lengths - can save a lot of time 
    if (arr1.length != arr2.length)
        return false;

    for (var i = 0, l = arr1.length; i < l; i++) {
        // Check if we have nested arrays
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arr1[i].equals(arr2[i]))
                return false;
        }
        else if (arr1[i] != arr2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

String.convertToBoolean = function (value) {
    if (value === 'True')
        return true;
    else if (value === 'False')
        return false;
    return value;
};

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}

function removeEmptyProperties(obj) {
    for (var i in obj) {
        if (obj[i] === null || obj[i] === undefined) {
            delete obj[i];
        }
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function leaveWarning() {
    window.onbeforeunload = function () {
        return "You are about to close Routefinder Web";
    };
}

function toISOStringWithoutTimeZone(m) {
    return m.format("YYYY-MM-DDTHH:mm:ss.SSS");
}

function IsEmptyString(str) {
    return (str === null ||
        str === undefined ||
        str === "");
}

function createCSSSelector(selector, style) {
    if (!document.styleSheets) return;
    if (document.getElementsByTagName("head").length == 0) return;

    var styleSheet, mediaType;

    if (document.styleSheets.length > 0) {
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if (document.styleSheets[i].disabled)
                continue;
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if (mediaType === "string") {
                if (media === "" || (media.indexOf("screen") !== -1)) {
                    styleSheet = document.styleSheets[i];
                }
            }
            else if (mediaType == "object") {
                if (media.mediaText === "" || (media.mediaText.indexOf("screen") !== -1)) {
                    styleSheet = document.styleSheets[i];
                }
            }

            if (typeof styleSheet !== "undefined")
                break;
        }
    }

    if (typeof styleSheet === "undefined") {
        var styleSheetElement = document.createElement("style");
        styleSheetElement.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

        for (i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
        }

        mediaType = typeof styleSheet.media;
    }

    if (mediaType === "string") {
        for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
            if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.addRule(selector, style);
    }
    else if (mediaType === "object") {
        var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
        for (var i = 0; i < styleSheetLength; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }
        styleSheet.insertRule(selector + "{" + style + "}", styleSheetLength);
    }
}

(function () {
    // disable default right click menu
    document.oncontextmenu = function (event) {
        if (window.event) {
            event = window.event;
            event.returnValue = false;
            return false;
        }
        event.preventDefault();
    };
    createNamespace("TF").Color = Color;

    function Color() {

    }

    Color.toHTMLColorFromLongColor = function (longColor) {
        if (longColor.toString().indexOf("#") >= 0) {
            return longColor;
        }
        return "#" + _toHex(longColor % 65536 % 256) + _toHex(longColor % 65536 / 256) + _toHex((longColor / 65536));
    };

    Color.toLongColorFromHTMLColor = function (htmlColor) {
        htmlColor = htmlColor.substr(1, 6);
        return parseInt(htmlColor.substr(0, 2), 16) + parseInt(htmlColor.substr(2, 2), 16) * 256 + parseInt(htmlColor.substr(4, 2), 16) * 65536;
    };

    function _toHex(number) {
        return _padding(Math.floor(number).toString(16));
    }

    function _padding(input) {
        if (input.length == 1) {
            input = "0" + input;
        }
        return input.toUpperCase();
    }
})();

/* Code Copy From Extjs */
Function.prototype.createInterceptor = function (fcn, scope) {
    var method = this;

    return !(typeof fcn === "function") ?
        this :
        function () {
            var me = this,
                args = arguments;
            fcn.target = me;
            fcn.method = method;
            return (fcn.apply(scope || me || window, args) !== false) ?
                method.apply(me || window, args) :
                null;
        };
};

Function.prototype.createSequence = function (fcn, scope) {
    var method = this;
    return (typeof fcn != "function") ?
        this :
        function () {
            var retval = method.apply(this || window, arguments);
            fcn.apply(scope || this || window, arguments);
            return retval;
        };
};

Function.prototype.createCallback = function () {
    // make args available, in function below
    var args = arguments,
        method = this;
    return function () {
        return method.apply(window, args);
    };
};

Function.prototype.interceptBefore = function (object, methodName, fn, scope) {
    var method = object[methodName] || function () { };
    return (object[methodName] = function () {
        var ret = fn.apply(scope || this, arguments);
        method.apply(this, arguments);
        return ret;
    });
};

Function.prototype.interceptAfter = function (object, methodName, fn, scope) {
    var method = object[methodName] || function () { };
    return (object[methodName] = function () {
        method.apply(this, arguments);
        return fn.apply(scope || this, arguments);
    });
};

createNamespace("TF").addStyle = function (styleId, content) {
    var css;
    if (!document.getElementById(styleId)) {
        css = document.createElement("style");
        css.id = styleId;
        css.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(css);
    } else {
        css = document.getElementById(styleId);
    }
    if (css.styleSheet) {
        // IE
        css.styleSheet.cssText = content;
    } else {
        // Other browsers
        css.innerHTML = content;
    }
    return css;
};

createNamespace("TF").convertToBoolean = function (data) {
    if (typeof (data) == "string") {
        return data.toLowerCase() == "true";
    }
    if (data == null) {
        return false;
    }
    return !!data;
};

createNamespace("TF").createId = function () {
    return parseFloat((new Date()).getTime().toString().substr(8, 13) + "" + Math.floor(Math.random() * 1000));
};

createNamespace("TF").getObjectCount = function (obj) {
    var count = 0;
    for (var key in obj) {
        count++;
    }
    return count;
};

createNamespace("TF").cloneGeometry = function (geometry) {
    if (!geometry) {
        return null;
    }
    if (geometry.type == "polygon") {
        return new tf.map.ArcGIS.Polygon(geometry.toJson());
    }
    if (geometry.type == "point") {
        return new tf.map.ArcGIS.Point(geometry.toJson());
    }
    if (geometry.type == "polyline") {
        return new tf.map.ArcGIS.Polyline(geometry.toJson());
    }
};

createNamespace("TF").xyToGeometry = function (x, y) {
    var p = new tf.map.ArcGIS.Point(x, y, tf.map.ArcGIS.SpatialReference({ "wkid": 4326 }));
    return tf.map.ArcGIS.webMercatorUtils.geographicToWebMercator(p);
};

createNamespace("TF").excelToObject = function (file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: "binary"
            });

            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                // var json_object = JSON.stringify(XL_row_object);
                // console.log(json_object);
                resolve(XL_row_object);
            });
        };

        reader.onerror = function () {
            reject("FAILURE");
        };

        reader.readAsBinaryString(file);
    });
};

createNamespace("TF").stopTimeToSecond = function (time) {
    var splits = time.split(":");
    return parseInt(splits[2]) + parseInt(splits[1]) * 60 + parseInt(splits[0]) * 60 * 60;
};

createNamespace("TF").csvToObject = function (file) {
    return new Promise((resolve) => {
        var jsonObject = [];
        var reader = new FileReader();
        reader.fileName = file.name;

        reader.onload = function (e) {
            var rows = e.target.result.split("\n");
            var headers = rows[0].split(",");
            for (var i = 1; i < rows.length; i++) {
                if (rows[i] === "") {
                    continue;
                }
                var data = rows[i].split(",");
                var obj = {};
                for (var j = 0; j < data.length; j++) {
                    obj[headers[j].trim().toLowerCase()] = data[j].trim();
                }
                jsonObject.push(obj);
            }
            resolve(jsonObject);
        };
        reader.readAsText(file);
    });
};

createNamespace("TF").convertToArray = function (all) {
    var array = [];
    for (var key in all) {
        array.push(all[key]);
    }
    return array;
};

createNamespace("TF").isLightness = function (color) {
    var arcgisColor = new tf.map.ArcGIS.Color(color);
    var brightness = (arcgisColor.r * 299 + arcgisColor.g * 587 + arcgisColor.b * 114) / 1000;
    return brightness >= 123;
};

createNamespace("TF").saveStorage = function (key, routeState, value) {
    tf.storageManager.save(key + "." + routeState, value);
    tf.storageManager.save(key, value);
};

createNamespace("TF").getStorage = function (key, routeState) {
    return tf.storageManager.get(key + "." + routeState) || tf.storageManager.get(key);
};

createNamespace("TF").seriesRun = function (allData, pageSize, func, isPromise) {
    if (allData.length == 0) {
        return Promise.resolve(false);
    }
    var split = [], pageIndex = 0;
    allData.forEach(function (item, index) {
        var splitIndex = Math.floor(index / pageSize);
        if (!split[splitIndex]) {
            split[splitIndex] = [];
        }
        split[splitIndex].push(item);
    });

    function run(resolve) {
        setTimeout(function () {
            if (isPromise) {
                func(split[pageIndex]).then(function (ans) {
                    // stop run when return false
                    if (ans === false) {
                        resolve();
                        return;
                    }

                    pageIndex++;
                    if (pageIndex < split.length) {
                        run(resolve);
                    } else {
                        resolve();
                    }
                });
            } else {
                func(split[pageIndex]);
                pageIndex++;
                if (pageIndex < split.length) {
                    run(resolve);
                } else {
                    resolve();
                }
            }
        });
    }

    return new Promise(function (resolve, reject) {
        run(resolve);
    });
};

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined"
                ? args[number]
                : match
                ;
        });
    };
}

function StringBuilder() {
    this.innerStr = "";
}

StringBuilder.prototype.appendLine = function (string) {
    this.innerStr += (string + "\r\n");
};

StringBuilder.prototype.append = function (string) {
    this.innerStr += string;
};

StringBuilder.prototype.toString = function () {
    return this.innerStr;
};

moment().constructor.prototype.currentTimeZoneTime = function () {
    var now = moment().utcOffset(-4);
    return moment([now.year(), now.month(), now.date(), now.hour(), now.minutes(), now.seconds(), now.millisecond()]);

};

var vendors = ["ms", "moz", "webkit", "o"];
for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"]
        || window[vendors[i] + "CancelRequestAnimationFrame"];
}
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;