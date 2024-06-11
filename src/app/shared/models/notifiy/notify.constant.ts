import { Notify } from "./notify.interfaces";

export const INCORRECT_USER_NOTIFICATION: Notify = {
    content: {
      title: 'Error en inicio de sesión',
      body: 'El usuario y/o la contraseña son incorrectos',
    },
    hasCancelButton: false,
  };
  
  export const USER_REGISTER_NOTIFICATION: Notify = {
    content: {
      title: 'Registro de usuarios',
      body: 'El usuario ha sido registrado exitosamente!',
    },
    hasCancelButton: false,
  };
  
  export const USER_MUST_BE_LOGGED_IN: Notify = {
    content: {
      title: 'Error al agregar al carrito de compras',
      body: 'Debes estar logueado para agregar este producto al carrito de compras',
    },
    hasCancelButton: true,
  };
  