import Dexie, { Table } from 'dexie';

export interface Food {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  img: string;
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
        price: 1000,
        quantity: 100,
        img: 'https://img.freepik.com/foto-gratis/manzana-mitad-fresca-salpicaduras-agua-sobre-fondo-negro_23-2147867061.jpg?t=st=1717186025~exp=1717189625~hmac=d5e6c85353779ac837f24810a341de76e6818c051d433c4ff0c07c4d18651a14&w=740',
      },
      {
        id: 2,
        name: 'Pan',
        description: 'Pan integral fresco y saludable.',
        price: 3000,
        quantity: 50,
        img: 'https://img.freepik.com/foto-gratis/delicioso-arreglo-pan-horneado-tomates_23-2148258675.jpg?t=st=1717186068~exp=1717189668~hmac=7626f9c7fd6758e8af4ade45ef6690db0da9e28c7525a66a2d4f8249de819447&w=740',
      },
      {
        id: 3,
        name: 'Leche',
        description: 'Leche entera de vaca.',
        price: 4000,
        quantity: 200,
        img: 'https://img.freepik.com/foto-gratis/despilfarrando-leche-fuera-vaso_23-2148211452.jpg?t=st=1717184067~exp=1717187667~hmac=ad63617f6056a3131405823e6a2e98dbf3e2494c17fe1d823d9c7f50e267d11e&w=740',
      },
      {
        id: 4,
        name: 'Queso',
        description: 'Queso cheddar madurado.',
        price: 7000,
        quantity: 30,
        img: 'https://img.freepik.com/foto-gratis/queso-plano-cuchillo_23-2148376118.jpg?t=st=1717184118~exp=1717187718~hmac=2609ba21856d3b507be56870136569d664bd00db19387b53700e98f19172b697&w=740',
      },
      {
        id: 5,
        name: 'Pollo',
        description: 'Pechuga de pollo sin hueso.',
        price: 50000,
        quantity: 25,
        img: 'https://img.freepik.com/foto-gratis/primer-plano-manos-cortando-delicioso-pavo_23-2148681867.jpg?t=st=1717184147~exp=1717187747~hmac=f75dd49d38c6b12eb8f4a6df6c1677647dc91e1e31239d8b16f7749f61281435&w=740',
      },
      {
        id: 6,
        name: 'Arroz',
        description: 'Arroz blanco de grano largo.',
        price: 800,
        quantity: 120,
        img: 'https://img.freepik.com/foto-gratis/tazon-arroz-crudo_23-2147897524.jpg?t=st=1717184184~exp=1717187784~hmac=87979dd3b906ae038c18c1dfbbb8eb8fe6ac0ac80e4c2a3863a0c4cbbb7caa41&w=740',
      },
      {
        id: 7,
        name: 'Tomate',
        description: 'Tomates frescos y jugosos.',
        price: 3000,
        quantity: 75,
        img: 'https://img.freepik.com/foto-gratis/vista-superior-delicioso-tomate-fresco_23-2148668697.jpg?t=st=1717184227~exp=1717187827~hmac=2e892ab19cb3f89c7af7e665bac110cb987ba1bfc2807f8a885361023dc6a9df&w=740',
      },
      {
        id: 8,
        name: 'Aceite de oliva',
        description: 'Aceite de oliva virgen extra.',
        price: 24000,
        quantity: 40,
        img: 'https://img.freepik.com/foto-gratis/aceite-oliva-minimalista-botella-vaso_23-2148286014.jpg?t=st=1717184253~exp=1717187853~hmac=c5d6a17976794c12fcc8246c0bc00a11a68eb170789868a33eacd3525f042269&w=740',
      },
      {
        id: 9,
        name: 'Naranjas',
        description: 'Naranjas dulces y jugosas.',
        price: 2000,
        quantity: 90,
        img: 'https://img.freepik.com/foto-gratis/vista-superior-rodaja-naranja_23-2148817854.jpg?t=st=1717186267~exp=1717189867~hmac=a5ebf140922395bd5a1c6248962c010ce3d9018b6b7ff253833991b5e3122625&w=740',
      },
    ]);
  }
}

export const db = new AppDB();
