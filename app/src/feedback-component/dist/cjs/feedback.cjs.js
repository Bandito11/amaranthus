'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-01231107.js');

/*
 Stencil Client Patch Browser v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('feedback.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["feedback-component_2.cjs",[[1,"feedback-container",{"componentKey":[1,"component-key"],"shadow":[4],"hidden":[32],"feedbackCreated":[32]},[[0,"cancelClicked","cancelClickedHandler"],[0,"feedbackCreated","feedbackCreatedHandler"]]],[1,"feedback-component",{"componentKey":[1,"component-key"],"shadow":[4]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=feedback.cjs.js.map