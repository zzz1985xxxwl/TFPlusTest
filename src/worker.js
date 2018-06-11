importScripts();

onmessage = function (e) {
    var c = 0;
    for (var i = 0; i < e.data; i++) {
        c += i;
    }
    setTimeout(() => {
        postMessage(c);
    }, 2000);
};