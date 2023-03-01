import { IFeedback } from '../../../common/models';
export declare function addFeedback(data: Partial<IFeedback> & {
  componentKey: string;
  feedback: string;
}): Promise<any>;
