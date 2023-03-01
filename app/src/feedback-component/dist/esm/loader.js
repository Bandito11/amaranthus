import { p as promiseResolve, b as bootstrapLazy } from './index-c34b1aea.js';
export { s as setNonce } from './index-c34b1aea.js';

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["feedback-component_2",[[1,"feedback-container",{"componentKey":[1,"component-key"],"shadow":[4],"hidden":[32],"feedbackCreated":[32]},[[0,"cancelClicked","cancelClickedHandler"],[0,"feedbackCreated","feedbackCreatedHandler"]]],[1,"feedback-component",{"componentKey":[1,"component-key"],"shadow":[4]}]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map