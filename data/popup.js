/**
 * (c) 2013 Rob Wu <gwnRob@gmail.com>
 * Implementation of chrome.browserAction for Jetpack Add-ons.
 * Distributed under the MIT license.
 */

/*jshint browser:true*/
/*globals self*/
'use strict';
function updatePanelDimensions() {
    let wrapper = document.documentElement;
    let dimensions = {
        height: wrapper.offsetHeight || wrapper.offsetHeight,
        width: wrapper.offsetWidth || wrapper.scrollWidth
    };
    self.port.emit('dimensions', dimensions);
}
if (document.readyState == 'complete') {
    updatePanelDimensions();
} else {
    document.addEventListener('DOMContentLoaded', updatePanelDimensions);
    window.addEventListener('load', function() {
        setTimeout(function() {
            updatePanelDimensions();
        }, 0);
    });
}

const CLOSE_TOKEN = 'window.close.' + Math.random();

document.addEventListener(CLOSE_TOKEN, function() {
    self.port.emit('hide');
});

// When window.close() is called, hide the popup.
document.documentElement.setAttribute('onreset',
        'document.documentElement.removeAttribute("onreset");' +
        'window.close=function(){document.dispatchEvent(new CustomEvent("' + CLOSE_TOKEN + '"));};'
);
document.documentElement.onreset();
