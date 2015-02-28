cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.rjfun.cordova.plugin.flurry/www/Flurry.js",
        "id": "com.rjfun.cordova.plugin.flurry.Flurry",
        "clobbers": [
            "window.plugins.Flurry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.flurry.sdk-android": "4.0.0",
    "com.google.admobsdk-googleplay": "5.0.89",
    "com.rjfun.cordova.plugin.flurry": "1.0.0",
    "org.apache.cordova.vibration": "0.3.12",
    "org.apache.cordova.splashscreen": "0.3.5",
    "org.apache.cordova.network-information": "0.2.14"
}
// BOTTOM OF METADATA
});