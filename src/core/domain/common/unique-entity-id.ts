import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : Math.random().toString())
  }
}