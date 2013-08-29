/**
 *
 * @param cfg
 * @constructor
 */
var ExampleJS = function (cfg) {

    this._init(); // Super constructor

    // Create iframe
    this._iframe = document.createElement('iframe');
    this._iframe.style.height = "100%";
    this._iframe.style.width = "100%";
    document.body.appendChild(this._iframe);

    this._iframe.src = "http://xeolabs.github.io/examplejs/index.html";

    // True once connected
    this._connected = false;

    // Calls buffered while not connected
    this._callBuffer = [];

    // Initially selected tags
    cfg.tags = this._getURLTags();

    // Initially selected page
    cfg.page = this._getURLPage();

    // Buffer initial config call
    this.set(cfg);

    // Request connection
    this._connect();
};

// Extends framework base component
ExampleJS._extend(ExampleJS, ExampleJSAPI.Component);

ExampleJS.prototype._getURLTags = function () {
    var tags = {};
    var params = this._getSearchParams();
    var tagListStr = params.tags;
    if (tagListStr) {
        var tagList = tagListStr.split(",");
        for (var i = 0, len = tagList.length; i < len; i++) {
            tags[tagList[i]] = true;
        }
    }
    return tags;
};

ExampleJS.prototype._getURLPage = function () {
    var params = this._getSearchParams();
    return params.page;
};

ExampleJS.prototype._getSearchParams = function () {
    var searchParams = {};
    var search = window.location.search.slice(1);
    var params = search.split('&');
    var tokens;
    for (var i = 0, len = params.length; i < len; i++) {
        tokens = params[i].split("=");
        searchParams[tokens[0]] = tokens[1];
    }
    return searchParams;
};

/**
 * Updates this example portal
 * @param params
 */
ExampleJS.prototype.set = function (params) {
    var call = this._apply({ call:"configure" }, params);
    if (!this._connected) {
        // Buffer until ready
        this._callBuffer.unshift(call);
        return;
    }
    this._send(call);
};

/**
 * Sends a call to the page
 * @param params
 * @private
 */
ExampleJS.prototype._send = function (params) {
    this._iframe.contentWindow.postMessage(JSON.stringify(params), "*");
};

/**
 * Merges objects
 * @private
 */
ExampleJS.prototype._apply = function (o, o2) {
    for (var name in o) {
        if (o.hasOwnProperty(name)) {
            o2[name] = o[name];
        }
    }
    return o2;
};

/**
 * Requests connection with page
 * @private
 */
ExampleJS.prototype._connect = function () {

    var self = this;

    // Periodically request connection with examples page
    var pConnect = setInterval(function () {
        self._send({
            call:"connect"
        });
    }, 200);

    // Message from page
    addEventListener("message",
        function (event) {
            var data = JSON.parse(event.data);
            switch (data.call) {

                case "connected":
                    // Stop sending connection requests
                    clearInterval(pConnect);
                    self._sendBufferedCalls();
                    self._connected = true;
                    self._publish("connection", { connected:true });
                    break;

                case "home":
                    // Home link clicked
                    self._publish("home");
                    break;

                case "tags":
                    // Tag selection updated
                    self._publish("tags", data.tags);
                    break;

                case "filter":
                    // Tag filter operator updated
                    self._publish("filter", data.filter);
                    break;

                case "page":
                    // Page selected
                    self._publish("page", data.page);
                    break;
            }
        });
};

/**
 * Sends calls that were buffered while not connected
 * @private
 */
ExampleJS.prototype._sendBufferedCalls = function () {
    while (this._callBuffer.length > 0) {
        this._send(this._callBuffer.pop());
    }
};


//// Gets tags off location hash
//function getRequestTags() {
//    var tags = request.getHashParam("tags");
//    if (tags) {
//        var map = {};
//        tags = tags.split(",");
//        for (var i = 0, len = tags.length; i < len; i++) {
//            map[tags[i]] = true;
//        }
//        tags = map;
//    }
//    return tags || {};
//}
//
//// Sets tags on location hash and rebuilds the hash
//function setRequestTags(tags) {
//    var list = [];
//    for (var tag in tags) {
//        if (tags.hasOwnProperty(tag) && tags[tag] === true) {
//            list.push(tag);
//        }
//    }
//    requestTags = list.length > 0 ? "tags=" + list.join(",") : null;
//    rebuildRequestHash();
//}
//
//// Rebuilds location hash
//function rebuildRequestHash() {
//    var list = [];
//    if (selectedTags) {
//        list.push(selectedTags);
//    }
//    if (requestExample) {
//        list.push(requestExample);
//    }
//    window.location.hash = list.join("|");
//}
//
//// Sets example path on location hash
//function setRequestExample(path) {
//    requestExample = "ex=" + path;
//    rebuildRequestHash();
//}
