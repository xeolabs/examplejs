/**
 * @private
 * @type {Object}
 */
var TweakJSAPI = {
};

// Tests if the given object is an array
 TweakJSAPI._isArray = function (testObject) {
    return testObject && !(testObject.propertyIsEnumerable('length'))
        && typeof testObject === 'object' && typeof testObject.length === 'number';
};

// Inheritance helper
TweakJSAPI._extend = function (childObj, parentObj) {
    var tmpObj = function () {
    };
    tmpObj.prototype = parentObj.prototype;
    childObj.prototype = new tmpObj();
    childObj.prototype.constructor = childObj;
};

// Add properties of o to o2, overwriting them on o2 if already there
TweakJSAPI._apply = function (o, o2) {
    for (var name in o) {
        if (o.hasOwnProperty(name)) {
            o2[name] = o[name];
        }
    }
    return o2;
};

// Add properties of o to o2 where undefined or null on o2
 TweakJSAPI._applyIf = function (o, o2) {
    for (var name in o) {
        if (o.hasOwnProperty(name)) {
            if (o2[name] == undefined || o2[name] == null) {
                o2[name] = o[name];
            }
        }
    }
    return o2;
};