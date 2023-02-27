// export class Hero {
//   constructor(
//     public _id ?: string,
//     public name: string,
//     public power: string,
//     public alterEgo?: string
//   ) {
//   }
// }

export interface Hero {
  _id: string
  name: string;
  gender: boolean;
  mail: string;
  age: number;
  address: string;
}
