import Dexie, { Table } from 'dexie';

export interface Food {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface User {
  id?: number;
  name: string;
  user: string;
  password: string;
}

export class AppDB extends Dexie {
  foods!: Table<Food, number>;
  users!: Table<User, number>;

  constructor() {
    super('nutriMarketdb');
    this.version(1).stores({
      foods: '++id',
      users: '++id',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.users.add({
      name: 'Johan Ferney Viancha',
      user: 'admin',
      password: '123',
    });
    await db.foods.bulkAdd([
      {
        id: 1,
        name: 'Manzana',
        description: 'Una fruta dulce y crujiente.',
        price: 1.2,
        quantity: 100,
      },
      {
        id: 2,
        name: 'Pan',
        description: 'Pan integral fresco y saludable.',
        price: 2.5,
        quantity: 50,
      },
      {
        id: 3,
        name: 'Leche',
        description: 'Leche entera de vaca.',
        price: 0.9,
        quantity: 200,
      },
      {
        id: 4,
        name: 'Queso',
        description: 'Queso cheddar madurado.',
        price: 3.8,
        quantity: 30,
      },
      {
        id: 5,
        name: 'Pollo',
        description: 'Pechuga de pollo sin hueso.',
        price: 5.0,
        quantity: 25,
      },
      {
        id: 6,
        name: 'Pasta',
        description: 'Pasta de trigo integral.',
        price: 1.5,
        quantity: 80,
      },
      {
        id: 7,
        name: 'Arroz',
        description: 'Arroz blanco de grano largo.',
        price: 1.0,
        quantity: 120,
      },
      {
        id: 8,
        name: 'Tomate',
        description: 'Tomates frescos y jugosos.',
        price: 2.0,
        quantity: 75,
      },
      {
        id: 9,
        name: 'Aceite de oliva',
        description: 'Aceite de oliva virgen extra.',
        price: 6.5,
        quantity: 40,
      },
      {
        id: 10,
        name: 'Naranjas',
        description: 'Naranjas dulces y jugosas.',
        price: 1.8,
        quantity: 90,
      },
    ]);
  }
}

export const db = new AppDB();
