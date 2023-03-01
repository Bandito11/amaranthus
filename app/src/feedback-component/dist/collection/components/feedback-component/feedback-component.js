import { Host, h } from '@stencil/core';
import { addFeedback } from '../../services/feedback-service';
export class FeedbackComponent {
  constructor() {
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
  static get is() { return "feedback-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["feedback-component.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["feedback-component.css"]
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
  static get events() {
    return [{
        "method": "cancelClicked",
        "name": "cancelClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "feedbackCreated",
        "name": "feedbackCreated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=feedback-component.js.map
