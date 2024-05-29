export interface Notify {
  isOpen?: boolean;
  content: NotifyContent;
  hasCancelButton: boolean;
}

export interface NotifyContent {
  title: string;
  body: string;
}

export const INCORRECT_USER_NOTIFICATION: Notify = {
  isOpen: true,
  content: {
    title: 'Error en inicio de sesión',
    body: 'El usuario y/o la contraseña son incorrectos',
  },
  hasCancelButton: false,
};

export const INCORRECT_USER_NOTIFICATIONs: Notify = {
  isOpen: true,
  content: {
    title: 'test',
    body: 'El usuario y/o la contraseña son incorrectos',
  },
  hasCancelButton: false,
};
