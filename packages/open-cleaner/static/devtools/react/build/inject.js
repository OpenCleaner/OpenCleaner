!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: !1
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.loaded = !0, module.exports;
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.p = "", __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    var lastDetectionResult, installGlobalHook = __webpack_require__(1), nullthrows = __webpack_require__(2)["default"];
    window.addEventListener("message", function(evt) {
        evt.source === window && evt.data && "react-devtools-detector" === evt.data.source && (lastDetectionResult = {
            hasDetectedReact: !0,
            reactBuildType: evt.data.reactBuildType
        }, chrome.runtime.sendMessage(lastDetectionResult));
    }), window.addEventListener("pageshow", function(evt) {
        lastDetectionResult && evt.target === window.document && chrome.runtime.sendMessage(lastDetectionResult);
    });
    var detectReact = "\nwindow.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('renderer', function(evt) {\n  window.postMessage({\n    source: 'react-devtools-detector',\n    reactBuildType: evt.reactBuildType,\n  }, '*');\n});\n", saveNativeValues = "\nwindow.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeObjectCreate = Object.create;\nwindow.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeMap = Map;\nwindow.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeWeakMap = WeakMap;\nwindow.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeSet = Set;\n", js = ";(" + installGlobalHook.toString() + "(window))" + saveNativeValues + detectReact, script = document.createElement("script");
    script.textContent = js, nullthrows(document.documentElement).appendChild(script), 
    nullthrows(script.parentNode).removeChild(script);
}, function(module, exports) {
    "use strict";
    function installGlobalHook(window) {
        function detectReactBuildType(renderer) {
            try {
                if ("string" == typeof renderer.version) return renderer.bundleType > 0 ? "development" : "production";
                var toString = Function.prototype.toString;
                if (renderer.Mount && renderer.Mount._renderNewRootComponent) {
                    var renderRootCode = toString.call(renderer.Mount._renderNewRootComponent);
                    return 0 !== renderRootCode.indexOf("function") ? "production" : renderRootCode.indexOf("storedMeasure") !== -1 ? "development" : renderRootCode.indexOf("should be a pure function") !== -1 ? renderRootCode.indexOf("NODE_ENV") !== -1 ? "development" : renderRootCode.indexOf("development") !== -1 ? "development" : renderRootCode.indexOf("true") !== -1 ? "development" : renderRootCode.indexOf("nextElement") !== -1 || renderRootCode.indexOf("nextComponent") !== -1 ? "unminified" : "development" : renderRootCode.indexOf("nextElement") !== -1 || renderRootCode.indexOf("nextComponent") !== -1 ? "unminified" : "outdated";
                }
            } catch (err) {}
            return "production";
        }
        if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
            var hasDetectedBadDCE = !1, hook = {
                _renderers: {},
                helpers: {},
                checkDCE: function(fn) {
                    try {
                        var toString = Function.prototype.toString, code = toString.call(fn);
                        code.indexOf("^_^") > -1 && (hasDetectedBadDCE = !0, setTimeout(function() {
                            throw new Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://fb.me/react-perf-use-the-production-build");
                        }));
                    } catch (err) {}
                },
                inject: function(renderer) {
                    var id = Math.random().toString(16).slice(2);
                    hook._renderers[id] = renderer;
                    var reactBuildType = hasDetectedBadDCE ? "deadcode" : detectReactBuildType(renderer);
                    return hook.emit("renderer", {
                        id: id,
                        renderer: renderer,
                        reactBuildType: reactBuildType
                    }), id;
                },
                _listeners: {},
                sub: function(evt, fn) {
                    return hook.on(evt, fn), function() {
                        return hook.off(evt, fn);
                    };
                },
                on: function(evt, fn) {
                    hook._listeners[evt] || (hook._listeners[evt] = []), hook._listeners[evt].push(fn);
                },
                off: function(evt, fn) {
                    if (hook._listeners[evt]) {
                        var ix = hook._listeners[evt].indexOf(fn);
                        ix !== -1 && hook._listeners[evt].splice(ix, 1), hook._listeners[evt].length || (hook._listeners[evt] = null);
                    }
                },
                emit: function(evt, data) {
                    hook._listeners[evt] && hook._listeners[evt].map(function(fn) {
                        return fn(data);
                    });
                },
                supportsFiber: !0,
                _fiberRoots: {},
                getFiberRoots: function(rendererID) {
                    var roots = hook._fiberRoots;
                    return roots[rendererID] || (roots[rendererID] = new Set()), roots[rendererID];
                },
                onCommitFiberUnmount: function(rendererID, fiber) {
                    hook.helpers[rendererID] && hook.helpers[rendererID].handleCommitFiberUnmount(fiber);
                },
                onCommitFiberRoot: function(rendererID, root) {
                    var mountedRoots = hook.getFiberRoots(rendererID), current = root.current, isKnownRoot = mountedRoots.has(root), isUnmounting = null == current.memoizedState || null == current.memoizedState.element;
                    isKnownRoot || isUnmounting ? isKnownRoot && isUnmounting && mountedRoots["delete"](root) : mountedRoots.add(root), 
                    hook.helpers[rendererID] && hook.helpers[rendererID].handleCommitFiberRoot(root);
                }
            };
            Object.defineProperty(window, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
                value: hook
            });
        }
    }
    module.exports = installGlobalHook;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = function(x) {
        if (null != x) return x;
        throw new Error("Got unexpected null or undefined");
    };
} ]);