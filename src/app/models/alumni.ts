import { User } from './user';
import { DegreeInterface, Degree } from './degree';
import { School } from './school';


export const PROGRAMME = [
  'Computer Engineering',
  'Computer Science'
];

export interface AlumniInterface {
  id: number;
  userId: number;
  schoolId: number;
  yearStarted: Date;
  yearCompleted: Date;
  schoolIndexNumber?: string;
  degree?: Degree;
  user?: User;
  school?: School;
}


export class Alumni implements AlumniInterface {
  id: number;
  userId: number;
  schoolId: number;
  yearStarted: Date;
  yearCompleted: Date;
  _degreeEarned?: DegreeInterface;
  schoolIndexNumber?: string;
  _user?: User;
  _school?: School;

  constructor(private data?: AlumniInterface) {
    if (this.data) {
      this.id = data.id;
      this.userId = data.userId;
      this.schoolId = data.schoolId;
      this.yearCompleted = data.yearCompleted;
      this.yearStarted = data.yearStarted;
      this.schoolIndexNumber = data.schoolIndexNumber;
      this._degreeEarned = data.degree;
    }
  }

  get degree() {
    return this._degreeEarned;
  }
  set degree(degree: DegreeInterface) {
    this._degreeEarned = degree;
  }

  get user() {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
    this.userId = user?.id;
  }

  get school() {
    return this._school;
  }
  set school(school: School) {
    this._school = school;
    this.schoolId = school?.id;
  }

  get info(): AlumniInterface {
    return {
      id: this.id,
      userId: this.userId,
      schoolId: this.schoolId,
      yearStarted: this.yearStarted,
      yearCompleted: this.yearCompleted,
      schoolIndexNumber: this.schoolIndexNumber
    };
  }

  set info(info: AlumniInterface) {
    this.id = info.id;
    this.userId = info.userId;
    this.schoolId = info.schoolId;
    this.yearStarted = info.yearStarted;
    this.yearCompleted = info.yearCompleted;
    this.schoolIndexNumber = info.schoolIndexNumber;
  }
}
