export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob?: Date;
  gender: string;
  address: string;
  country: string;
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
}
