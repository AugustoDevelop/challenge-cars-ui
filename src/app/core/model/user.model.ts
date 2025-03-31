import { Car } from './car.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  login: string;
  phone: string;
  cars?: Car[];
  createdAt?: string;
  updatedAt?: string;
}