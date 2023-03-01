import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './feedback-component2.js';

const feedbackContainerCss = ":host{display:block}button{border-radius:4px;border:none;background-color:#f6f6f6;padding:6px;text-align:center;text-decoration:none}.shadow:hover{box-shadow:0 8px 12px 0 rgba(0, 0, 0, 0.24), 0 7px 8px 0 rgba(0, 0, 0, 0.19)}.thank-you{border:2px solid #f6f6f6;width:13em;padding:0.4em;color:#2ecc40;box-shadow:0 5px 8px 0 rgba(17, 17, 17, 0.24),\n    0 4px 5px 0 rgba(31, 31, 31, 0.19);animation:fadeInAnimation ease 1s;animation-iteration-count:1;animation-fill-mode:forwards}@keyframes fadeInAnimation{0%{opacity:0}100%{opacity:1}}.heart-icon{color:#ff4136;font-size:1.1em}";

const FeedbackContainer$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  cancelClickedHandler(event) {
    this.hidden = event.detail;
  }
  feedbackCreatedHandler(event) {
    this.feedbackCreated = event.detail;
  }
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.componentKey = undefined;
    this.shadow = undefined;
    this.hidden = undefined;
    this.feedbackCreated = undefined;
    this.hidden = true;
    this.feedbackCreated = false;
    this.cssClass = '';
    if (this.shadow === true) {
      this.cssClass = this.cssClass.concat('shadow ');
    }
  }
  getFeedbackCreated() {
    if (this.feedbackCreated) {
      return (h("div", { class: 'ripple-back', id: 'ripple-loader' }, h("p", { class: 'thank-you ripple-loader' }, h("span", { class: 'heart-icon' }, "\u2665"), " Thanks for the feedback!")));
    }
    else {
      return this.getFeedbackComponent();
    }
  }
  getFeedbackComponent() {
    if (this.hidden) {
      return (h("button", { class: this.cssClass, onClick: () => this.showFeedbackComponent() }, "Feedback?"));
    }
    else {
      return (h("feedback-component", { componentKey: this.componentKey, shadow: this.shadow }));
    }
  }
  render() {
    return h(Host, null, this.getFeedbackCreated());
  }
  showFeedbackComponent() {
    if (this.hidden) {
      this.hidden = false;
    }
    else {
      this.hidden = true;
    }
  }
  static get style() { return feedbackContainerCss; }
}, [1, "feedback-container", {
    "componentKey": [1, "component-key"],
    "shadow": [4],
    "hidden": [32],
    "feedbackCreated": [32]
  }, [[0, "cancelClicked", "cancelClickedHandler"], [0, "feedbackCreated", "feedbackCreatedHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["feedback-container", "feedback-component"];
  components.forEach(tagName => { switch (tagName) {
    case "feedback-container":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, FeedbackContainer$1);
      }
      break;
    case "feedback-component":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const FeedbackContainer = FeedbackContainer$1;
const defineCustomElement = defineCustomElement$1;

export { FeedbackContainer, defineCustomElement };

//# sourceMappingURL=feedback-container.js.map