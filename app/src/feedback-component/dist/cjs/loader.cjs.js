'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-01231107.js');

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["feedback-component_2.cjs",[[1,"feedback-container",{"componentKey":[1,"component-key"],"shadow":[4],"hidden":[32],"feedbackCreated":[32]},[[0,"cancelClicked","cancelClickedHandler"],[0,"feedbackCreated","feedbackCreatedHandler"]]],[1,"feedback-component",{"componentKey":[1,"component-key"],"shadow":[4]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map