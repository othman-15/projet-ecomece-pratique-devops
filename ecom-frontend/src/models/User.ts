export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Guest = 'GUEST'
}

export class User {
  id!: number;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  dob?: Date;
  gender: string = '';
  address: string = '';
  country: string = '';
  role: Role = Role.Guest;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public greetUser(): string {
    return `${this.role}\nHello ${this.fullName()}`;
  }
}
