import { p as promiseResolve, b as bootstrapLazy } from './index-c34b1aea.js';
export { s as setNonce } from './index-c34b1aea.js';

/*
 Stencil Client Patch Browser v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["feedback-component_2",[[1,"feedback-container",{"componentKey":[1,"component-key"],"shadow":[4],"hidden":[32],"feedbackCreated":[32]},[[0,"cancelClicked","cancelClickedHandler"],[0,"feedbackCreated","feedbackCreatedHandler"]]],[1,"feedback-component",{"componentKey":[1,"component-key"],"shadow":[4]}]]]], options);
});

//# sourceMappingURL=feedback.js.map