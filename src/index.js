require('promise-polyfill/src/polyfill');

const defaultSharePageUrl = "https://raclettejs.herokuapp.com/";

class Raclette {

    constructor(options = {}) {

        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("src", options.sharePageUrl || defaultSharePageUrl);

        this.container = document.createElement("div");
        this.container.style.display = "none";
        document.body.appendChild(this.container);

        this.container.appendChild(this.iframe);

        let self = this;
        this.stack = [];

        window.addEventListener(
            "message",
            (data) => self.receiveMessagefunction(data),
            false
        );
        let resolveLoaded;
        this.loaded = new Promise((resolve, reject) => {
            resolveLoaded = resolve;
        });
        this.resolveLoaded = resolveLoaded;
    }

    receiveMessagefunction(event) {
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
        return new Promise((function (resolve) {
            this.stack.push({ action: 'getItem', key, resolve });
            this.iframe.contentWindow.postMessage({ method: 'getItem', key }, '*');
        }).bind(this));
    }
    setItem(key, value) {
        return new Promise((function (resolve) {
            this.stack.push({ action: 'setItem', key, resolve });
            this.iframe.contentWindow.postMessage({ method: 'setItem', key, value: JSON.stringify(value) }, '*');
        }).bind(this));
    }
    clear() {
        return new Promise((function (resolve) {
            this.stack.push({ action: 'clear', resolve });
            this.iframe.contentWindow.postMessage({ method: 'clear' }, '*');
        }).bind(this));
    }
}

module.exports = Raclette;