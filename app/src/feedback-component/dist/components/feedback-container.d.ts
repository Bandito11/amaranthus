import type { Components, JSX } from "../types/components";

interface FeedbackContainer extends Components.FeedbackContainer, HTMLElement {}
export const FeedbackContainer: {
  prototype: FeedbackContainer;
  new (): FeedbackContainer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
