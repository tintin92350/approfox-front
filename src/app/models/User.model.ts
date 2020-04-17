import {Department} from './Department.model';
import {Role} from './Role.enum';

export class User {
  public id: number;
  public login: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public mail: string;
  public role: Role;
  public departmentNumber: Department;
}
