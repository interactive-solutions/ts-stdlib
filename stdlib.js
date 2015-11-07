/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
var is;
(function (is) {
    var stdlib;
    (function (stdlib) {
        /**
         * Different callback types
         */
        var CallbackType;
        (function (CallbackType) {
            CallbackType[CallbackType["ONCE"] = 0] = "ONCE";
            CallbackType[CallbackType["CONTINUOUS"] = 1] = "CONTINUOUS";
        })(CallbackType || (CallbackType = {}));
        /**
         * Wraps a callback function and associates it with a callback type and id
         */
        var Callback = (function () {
            function Callback(_id, _callback, _type) {
                this._id = _id;
                this._callback = _callback;
                this._type = _type;
            }
            Object.defineProperty(Callback.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Callback.prototype, "callback", {
                get: function () {
                    return this._callback;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Callback.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            return Callback;
        })();
        /**
         * Event manager
         */
        var EventManager = (function () {
            function EventManager() {
                this.counter = 0;
                this.events = {};
            }
            EventManager.prototype.attach = function (event, callback) {
                if (this.events[event] === undefined) {
                    this.events[event] = [];
                }
                var id = this.counter;
                this.events[event][id] = new Callback(id, callback, CallbackType.CONTINUOUS);
                // If everything worked without errors, increment counter
                this.counter++;
                return id;
            };
            EventManager.prototype.once = function (event, callback) {
                if (this.events[event] === undefined) {
                    this.events[event] = [];
                }
                var id = this.counter;
                this.events[event][id] = new Callback(id, callback, CallbackType.ONCE);
                // If everything worked without errors, increment counter
                this.counter++;
                return id;
            };
            EventManager.prototype.detach = function (event, id) {
                delete this.events[event][id];
            };
            EventManager.prototype.emit = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var callbacks = this.events[event];
                for (var id in callbacks) {
                    if (!callbacks.hasOwnProperty(id)) {
                        continue;
                    }
                    var callback = callbacks[id];
                    callback.callback.apply(callback, args);
                    if (callback.type === CallbackType.ONCE) {
                        this.detach(event, callback.id);
                    }
                }
            };
            return EventManager;
        })();
        stdlib.EventManager = EventManager;
    })(stdlib = is.stdlib || (is.stdlib = {}));
})(is || (is = {}));
/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
var is;
(function (is) {
    var stdlib;
    (function (stdlib) {
        /**
         * Error that is thrown if a poll with a given name already exists
         */
        var PollNameExists = (function () {
            function PollNameExists() {
            }
            return PollNameExists;
        })();
        stdlib.PollNameExists = PollNameExists;
        /**
         * Wrapper for set/clear interval functions
         */
        var PollingManager = (function () {
            function PollingManager() {
                this.polls = {};
            }
            PollingManager.prototype.add = function (name, callback, timeOut) {
                var args = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    args[_i - 3] = arguments[_i];
                }
                if (this.polls[name] !== undefined) {
                    throw new PollNameExists();
                }
                this.polls[name] = setInterval(callback, timeOut, args);
            };
            PollingManager.prototype.remove = function (name) {
                if (this.polls[name] !== undefined) {
                    clearInterval(this.polls[name]);
                    this.polls[name] = undefined;
                }
            };
            return PollingManager;
        })();
        stdlib.PollingManager = PollingManager;
    })(stdlib = is.stdlib || (is.stdlib = {}));
})(is || (is = {}));
/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
var is;
(function (is) {
    var stdlib;
    (function (stdlib) {
        /**
         * Utility query string class
         */
        var QueryString = (function () {
            function QueryString() {
            }
            /**
             * Creates a query string from an object
             *
             * @param obj
             * @returns {string}
             */
            QueryString.stringify = function (obj) {
                var queryString = obj ? Object.keys(obj).sort().map(function (key) {
                    var val = obj[key];
                    if (val === '' || val === undefined) {
                        return;
                    }
                    if (Array.isArray(val)) {
                        return val.sort().map(function (val2) {
                            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                        }).join('&');
                    }
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
                }).join('&') : '';
                var regExp = new RegExp('&+');
                queryString = queryString.replace(regExp, '&');
                if (queryString.charAt(0) === '&') {
                    queryString = queryString.substr(1);
                }
                return queryString;
            };
            QueryString.parse = function () {
                var queryString = {};
                var href = window.location.href;
                var query = href.split('?')[1];
                if (!query) {
                    return false;
                }
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (typeof queryString[pair[0]] === 'undefined') {
                        queryString[pair[0]] = decodeURIComponent(pair[1]);
                    }
                    else if (typeof queryString[pair[0]] === 'string') {
                        queryString[pair[0]] = [queryString[pair[0]], decodeURIComponent(pair[1])];
                    }
                    else {
                        queryString[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                }
                return queryString;
            };
            return QueryString;
        })();
        stdlib.QueryString = QueryString;
    })(stdlib = is.stdlib || (is.stdlib = {}));
})(is || (is = {}));
