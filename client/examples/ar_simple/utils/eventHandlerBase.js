define(function () {
    class EventHandlerBase {
        constructor() {
            this._listeners = new Map(); // string type -> [listener, ...]
            this._polyfillCustomEvent();
        }

        /**
         * 兼容处理自定义事件
         */
        _polyfillCustomEvent() {
            if (typeof window !== "undefined" && typeof window.CustomEvent !== "function") {

                //对于不支持Customevent的老式浏览器，通过document.createEvent方法创建事件
                let CustomEvent = function (event, params = {bubbles: false, cancelable: false, detail: undefined}) {
                    let evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };

                CustomEvent.prototype = window.Event.prototype;

                window.CustomEvent = CustomEvent;
            }
        }

        /**
         * 创建自定义事件
         * @param event
         * @param params
         * @returns {CustomEvent<any>}
         */
        createEvent(event, params = {detail: undefined}) {
            return new CustomEvent(event, params)
        }

        /**
         * 监听事件
         * @param type
         * @param listener
         */
        addEventListener(type, listener) {
            let listeners = this._listeners.get(type)
            if (Array.isArray(listeners) === false) {
                listeners = []
                this._listeners.set(type, listeners)
            }
            listeners.push(listener)
        }

        /**
         * 移除事件监听
         * @param type
         * @param listener
         */
        removeEventListener(type, listener) {
            let listeners = this._listeners.get(type)
            if (Array.isArray(listeners) === false) {
                return
            }
            if (!listener) {
                this._listeners.delete(type);
            }
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1)
                    return
                }
            }
        }

        /**
         * 派遣事件
         * @param event
         */
        dispatchEvent(event) {
            let listeners = this._listeners.get(event.type)
            if (Array.isArray(listeners) === false) return

            // need a copy, since removeEventListener is often called inside listeners to create one-shots and it modifies the array, causing
            // listeners not to be called!
            var array = listeners.slice(0);
            for (let listener of array) {
                listener(event)
            }
        }
    }

    return EventHandlerBase;
})