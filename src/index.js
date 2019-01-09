require('promise-polyfill/src/polyfill');

const defaultOptions = {
    sharePageUrl: "https://raclettejs.herokuapp.com/"
};

const states = {
    initializing: 0,
    initialized: 1,
    destroyed: 2,
}

class Raclette {

    constructor(options = {}) {
        this.state = states.initializing;

        this.options = { ...defaultOptions, ...options };
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("src", this.options.sharePageUrl);

        this.container = document.createElement("div");
        this.container.style.display = "none";
        document.body.appendChild(this.container);
        this.container.appendChild(this.iframe);

        let self = this;
        this.stack = [];

        this.eventListenerFn = (data) => self.receiveMessagefunction(data);
        window.addEventListener("message", this.eventListenerFn, false);

        let resolveLoaded;
        this.loaded = new Promise((resolve, reject) => {
            resolveLoaded = resolve;
        });
        this.loaded.then(_ => this.state = states.initialized); //setup state when initialized
        this.resolveLoaded = resolveLoaded;
    }

    destroy() {
        window.removeEventListener("message", this.eventListenerFn, false);
        this.container.innerHTML = '';
        this.state = states.destroyed;
    }

    receiveMessagefunction(event) {
        if (!this.options.sharePageUrl.startsWith(event.origin))
            return; //TODO send every message in an object (with a specific interface) and handle only message containing this type of object. (maybe define also an ID of raclettejs instance and use it as identity in this object, that could allow us to use multiple instances of raclettejs...)

        if (event.data === "loaded") {
            this.resolveLoaded();
            return;
        }
        let key = event.data.key, value = event.data.value;
        let indexFound;
        this.stack.forEach((item, index) => {
            if ((item.action == event.data.action && event.data.action == "clear") ||
                (item.action == event.data.action && item.key == event.data.key))
                indexFound = index;
        })
        let stacked = this.stack[indexFound];
        if (stacked) {
            this.stack.splice(indexFound, 1);
            stacked.resolve(JSON.parse(value));
        }
    }

    getItem(key) {
        this.beforeAction();

        return new Promise((function (resolve) {
            this.stack.push({ action: 'getItem', key, resolve });
            this.iframe.contentWindow.postMessage({ method: 'getItem', key }, '*');
        }).bind(this));
    }
    setItem(key, value) {
        this.beforeAction();

        return new Promise((function (resolve) {
            this.stack.push({ action: 'setItem', key, resolve });
            this.iframe.contentWindow.postMessage({ method: 'setItem', key, value: JSON.stringify(value) }, '*');
        }).bind(this));
    }
    clear() {
        this.beforeAction();

        return new Promise((function (resolve) {
            this.stack.push({ action: 'clear', resolve });
            this.iframe.contentWindow.postMessage({ method: 'clear' }, '*');
        }).bind(this));
    }

    beforeAction() {
        switch (this.state) {
            case states.initializing:
                throw "this instance of RacletteJS isn't already initialized, you must wait for when the library is ready to be used by using the .loaded promise property";
            case states.destroyed:
                throw "this instance of RacletteJS has been destroyed (by calling the .destroy() method). You cannot use it anymore.";
            case states.initialized:
            default:
                break;
        }
    }

}

module.exports = Raclette;