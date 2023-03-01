import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-c34b1aea.js';

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

const FeedbackComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
};
FeedbackComponent.style = feedbackComponentCss;

const feedbackContainerCss = ":host{display:block}button{border-radius:4px;border:none;background-color:#f6f6f6;padding:6px;text-align:center;text-decoration:none}.shadow:hover{box-shadow:0 8px 12px 0 rgba(0, 0, 0, 0.24), 0 7px 8px 0 rgba(0, 0, 0, 0.19)}.thank-you{border:2px solid #f6f6f6;width:13em;padding:0.4em;color:#2ecc40;box-shadow:0 5px 8px 0 rgba(17, 17, 17, 0.24),\n    0 4px 5px 0 rgba(31, 31, 31, 0.19);animation:fadeInAnimation ease 1s;animation-iteration-count:1;animation-fill-mode:forwards}@keyframes fadeInAnimation{0%{opacity:0}100%{opacity:1}}.heart-icon{color:#ff4136;font-size:1.1em}";

const FeedbackContainer = class {
  cancelClickedHandler(event) {
    this.hidden = event.detail;
  }
  feedbackCreatedHandler(event) {
    this.feedbackCreated = event.detail;
  }
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
FeedbackContainer.style = feedbackContainerCss;

export { FeedbackComponent as feedback_component, FeedbackContainer as feedback_container };

//# sourceMappingURL=feedback-component_2.entry.js.map