import "@babel/polyfill";

const sharePageUrl = "https://raclettejs.herokuapp.com/";


export class RacletteStorage {
    constructor() {
        this.iframe = document.createElement("iframe");
        this.iframe.setAttribute("src", sharePageUrl);
        
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

        if (event.data === "loaded") this.resolveLoaded();

        let key = event.data.key, value = event.data.value;
        let indexFound = this.stack.map(value => value.key).indexOf(key);
        let stacked = this.stack[indexFound];
        this.stack.splice(indexFound, 1);
        stacked.resolve(JSON.parse(value));
    }

    getItem(key) {
        return new Promise((function (resolve) {
            this.stack.push({ key, resolve });
            this.iframe.contentWindow.postMessage({ method: 'getItem', key }, '*');
        }).bind(this));
    }
    setItem(key, value) {
        this.iframe.contentWindow.postMessage({ method: 'setItem', key, value: JSON.stringify(value) }, '*');
    }





}

// window.racletteStorage = new RacletteStorage();
// racletteStorage.loaded.then(() => {
//     racletteStorage.getItem("list").then(list => {
//         let div = document.getElementById("list");
//         div.innerText = list.join(',');
//     });
//     window.addItem = function () {
//         let value = document.getElementById("to_add").value;

//         racletteStorage.getItem("list").then(list => {
//             list = list || [];
//             list.push(value);
//             racletteStorage.setItem("list", list);
//             this.setTimeout(() => window.location.reload(), 50);
//         });
//     }
// });

