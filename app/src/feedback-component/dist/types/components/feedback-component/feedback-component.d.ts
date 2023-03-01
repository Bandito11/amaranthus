import { EventEmitter } from '../../stencil-public-runtime';
export declare class FeedbackComponent {
  componentKey: string;
  shadow: boolean;
  cssClass: string;
  cancelClicked: EventEmitter<boolean>;
  feedbackCreated: EventEmitter<boolean>;
  el: HTMLElement;
  feedback: string;
  constructor();
  componentDidLoad(): void;
  render(): any;
  handleChange(event: any): void;
  addFeedback(event: any): Promise<void>;
  onCancel(event: any): void;
}
