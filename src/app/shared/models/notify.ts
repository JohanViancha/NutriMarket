export interface Notify {
  content: NotifyContent;
  hasCancelButton: boolean;
}

export interface NotifyContent {
  title: string;
  body: string;
}

export const INCORRECT_USER_NOTIFICATION: Notify = {
  content: {
    title: 'Error en inicio de sesión',
    body: 'El usuario y/o la contraseña son incorrectos',
  },
  hasCancelButton: false,
};

export const USER_REGISTER_NOTIFICATION : Notify = {
  content: {
    title: 'Registro de usuarios',
    body: 'El usuario ha sido registrado exitosamente!',
  },
  hasCancelButton: false,
};
