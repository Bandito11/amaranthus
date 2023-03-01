import type { Components, JSX } from "../types/components";

interface FeedbackComponent extends Components.FeedbackComponent, HTMLElement {}
export const FeedbackComponent: {
  prototype: FeedbackComponent;
  new (): FeedbackComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
