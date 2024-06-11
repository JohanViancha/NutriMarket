
export interface NotifyContent {
  title: string;
  body: string;
}

export interface Notify {
  content: NotifyContent;
  hasCancelButton: boolean;
}

