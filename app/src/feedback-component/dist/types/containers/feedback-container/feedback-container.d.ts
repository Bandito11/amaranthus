export declare class FeedbackContainer {
  componentKey: string;
  shadow: boolean;
  hidden: boolean;
  feedbackCreated: boolean;
  cssClass: string;
  cancelClickedHandler(event: CustomEvent<boolean>): void;
  feedbackCreatedHandler(event: CustomEvent<boolean>): void;
  constructor();
  getFeedbackCreated(): any;
  getFeedbackComponent(): any;
  render(): any;
  showFeedbackComponent(): void;
}
