// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
// Send a message to the parent
function sendMessage(msg) {
    window.parent.postMessage(msg, '*');
}
function handleMessage(data) {
    switch (data.method) {
        case 'getItem':
            sendMessage({ action: "getItem", key: data.key, value: localStorage.getItem(data.key) });
            break;
        case 'setItem':
            localStorage.setItem(data.key, data.value);
            sendMessage({ action: "setItem", key: data.key, value: null });
            break;
        case 'clear':
            localStorage.clear();
            sendMessage({ action: "clear", key: null, value: null });
            break;
        default:
            break;
    }
}

bindEvent(window, 'message', function (e) {
    handleMessage(e.data);
});

sendMessage("loaded", "*");

