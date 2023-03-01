import { Host, h } from '@stencil/core';
//TODO Change tag property to final name of the component
export class FeedbackContainer {
  cancelClickedHandler(event) {
    this.hidden = event.detail;
  }
  feedbackCreatedHandler(event) {
    this.feedbackCreated = event.detail;
  }
  constructor() {
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
  static get is() { return "feedback-container"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["feedback-container.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["feedback-container.css"]
    };
  }
  static get properties() {
    return {
      "componentKey": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "component-key",
        "reflect": false
      },
      "shadow": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "shadow",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "hidden": {},
      "feedbackCreated": {}
    };
  }
  static get listeners() {
    return [{
        "name": "cancelClicked",
        "method": "cancelClickedHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "feedbackCreated",
        "method": "feedbackCreatedHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=feedback-container.js.map
