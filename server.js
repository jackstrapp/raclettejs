// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
// Send a message to the parent
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(msg, '*');
};
var results = document.getElementById('results'),
    messageButton = document.getElementById('message_button');
// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
    handleMessage(e.data);
});


function handleMessage(data) {
    debugger;
    switch (data.method) {
        case 'getItem':
            sendMessage({ key: data.key, value: localStorage.getItem(data.key) });
            break;
        case 'setItem':
            localStorage.setItem(data.key, data.value);
            break;
        default:
            break;
    }
}

sendMessage("loaded", "*");

console.log("raclettejs is loaded on server page");

