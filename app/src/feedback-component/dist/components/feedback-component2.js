import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const url = 'https://feedback-d71f5.uc.r.appspot.com/add';
async function addFeedback(data) {
  if (!data.feedback) {
    throw `Feedback property is empty`;
  }
  if (!data.componentKey) {
    throw `component Id property is empty`;
  }
  const feedback = {
    feedback: data.feedback,
  };
  const response = await fetch(url, {
    headers: [['component-key', data.componentKey]],
    body: JSON.stringify(feedback),
    method: 'POST',
    mode: 'cors',
  });
  if (response.status === 200) {
    const message = await response.text();
    if (message === 'true') {
      return true;
    }
    else {
      try {
        const error = JSON.parse(message);
        return error.error;
      }
      catch (error) {
        return error;
      }
    }
  }
}

const feedbackComponentCss = ":host{display:block}input{padding:0.2em}button{margin-top:0.3em;border-radius:4px;border:none;padding:6px;text-align:center;text-decoration:none}.confirm{background-color:#0074d9;color:#f6f6f6;margin-left:2em}.cancel{background-color:#e1e1e1}.shadow:hover{box-shadow:0 8px 12px 0 rgba(0, 0, 0, 0.24), 0 7px 8px 0 rgba(0, 0, 0, 0.19)}";

const FeedbackComponent = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.cancelClicked = createEvent(this, "cancelClicked", 7);
    this.feedbackCreated = createEvent(this, "feedbackCreated", 7);
    this.componentKey = undefined;
    this.shadow = undefined;
    this.cssClass = '';
    if (this.shadow === true) {
      this.cssClass = this.cssClass.concat('shadow ');
    }
  }
  componentDidLoad() {
    const input = this.el.shadowRoot.querySelector('input');
    input.focus();
  }
  render() {
    return (h(Host, null, h("form", null, h("input", { type: 'text', onInput: (event) => this.handleChange(event) }), h("div", null, h("button", { class: this.cssClass + 'cancel ', onClick: (event) => this.onCancel(event) }, "Cancel"), h("button", { class: this.cssClass + 'confirm ', type: 'submit', onClick: (event) => this.addFeedback(event) }, "Feedback")))));
  }
  handleChange(event) {
    this.feedback = event.target.value;
  }
  async addFeedback(event) {
    event.preventDefault();
    if (this.feedback) {
      try {
        const message = await addFeedback({
          componentKey: this.componentKey,
          feedback: this.feedback,
        });
        if (message === true) {
          this.feedbackCreated.emit(message);
        }
        else {
          //TODO: Check if this error can be catch outside via events
          console.error(message);
        }
      }
      catch (error) {
        //TODO: Check if this error can be catch outside via events
        console.error(error);
      }
    }
  }
  onCancel(event) {
    event.preventDefault();
    this.cancelClicked.emit(true);
  }
  get el() { return this; }
  static get style() { return feedbackComponentCss; }
}, [1, "feedback-component", {
    "componentKey": [1, "component-key"],
    "shadow": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["feedback-component"];
  components.forEach(tagName => { switch (tagName) {
    case "feedback-component":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, FeedbackComponent);
      }
      break;
  } });
}

export { FeedbackComponent as F, defineCustomElement as d };

//# sourceMappingURL=feedback-component2.js.map