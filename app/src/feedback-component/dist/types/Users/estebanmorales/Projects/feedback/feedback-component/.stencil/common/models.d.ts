export interface IFeedback {
  _id: string;
  componentId?: string;
  name: string;
  feedbacks: {
    dateCreated: string;
    feedback: string;
  }[];
  description: string;
  dateCreated: string;
  dateUpdated: string;
}
export interface IUser {
  username: string;
  password: string;
  uuid?: string;
  email: string;
}
