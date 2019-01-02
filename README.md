# raclettejs

Because a raclette is basically made to be a shared meal, unlike a cookie...

Simple cookie/locaStorage sharing library that enables you to share informations on the frontend between multiple domains.
No backend implementation, no backend storing of your cookies. 

This version currently only uses localStorage.

#HOW TO USE IT
```js
let Raclette = require('raclettejs');

let storage = new Raclette(options);

//every action is async, even the loading.
storage.loaded.then(() => {
    //set
    storage.setItem("myKey", "myValue").then(...);
    //get
    storage.getItem("myKey").then(myValue => {
        //use the stored value
    })
    //clear
    storage.clear().then(...)
});
```
#options
```js
options.sharePageUrl: //the page that'll be used in the iframe.
```

#USECASE

You have a wine ecommerce website www.mywebsite.com, but your company started a champaign website www.mywebsite-champaign.com
(Well, they could have gone champaign.mywebsite.com but... that's another topic).
Now these websites can navigate from one to another seamlessly, and you have a newsletter popup that you don't want to show on the champaign website, if they subscribed on the main wine website. 

With this package you can share localStorage (option to use cookies will come soon) on a shared domain. The package creates an iframe and reads and writes information on this iframe through window.postMessage.

You shouldn't use this package to store sensitive informations (passwords/tokens/...).

The default iframe's location is on https://raclettejs.herokuapp.com/ (again nothing transit to any backend, the informations always stays on the frontend) but you can provide your own page if you want. Just specify "sharePageUrl" option and put the script server/index.js (from this package) on that page.

