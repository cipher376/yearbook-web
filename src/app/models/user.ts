import { Address } from './address';
import { Alumni } from './alumni';
import { MyDevice } from './my-device';
import { Photo } from './my-media';

export enum UserConfigAction {
  AccountDeactivation = 'AccountDeactivation',
  PostFromStateOnly = 'PostFromStateOnly',
  PostFromMySchoolsOnly = 'PostFromMySchoolsOnly'
}

export class UserConfig {
  id?: number;
  action: UserConfigAction;
  response: string;
  reason?: string;
  userId: number;
}

export interface CredentialsInterface {
  id?: number;
  email: string;
  phone?: string;
  password?: string;
  realm?: string;
  remember?: boolean;
}

export class Credentials implements CredentialsInterface {
  id?: number;
  email: string;
  phone?: string;
  password?: string;
  realm?: string;
  remember?: boolean;

  constructor(cred?: CredentialsInterface) {
    Object.assign(this, cred);
  }
}


export interface UserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  userName?: string;
  otherName?: string;
  dateOfBirth?: Date;
  gender?: string;

  photos?: Photo[];
  address?: Address;
  alumni?: Alumni[];
  devices?: MyDevice[];
  userConfigs?: UserConfig[];

}


export class User implements UserInterface {
  id?: number;
  private fullName?: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  nickName?: string;
  userName?: string;
  dateOfBirth?: Date;
  gender?: string;

  email?: string;
  phone?: string;
  password?: string;
  realm?: string;
  remember?: boolean;

  /************Relations**********/
  photos?: Photo[];
  address?: Address;
  alumni?: Alumni[];
  devices?: MyDevice[];
  userConfigs?: UserConfig[];

  constructor(userData?: UserInterface, cred?: Credentials) {
    if (userData) {
      this.id = userData.id;
      this.FullName = userData?.firstName + ' ' + (userData?.otherName ?? '') + ' ' + userData?.lastName;
      this.fullName = userData?.firstName + ' ' + (userData?.otherName ?? '') + ' ' + userData?.lastName;
      this.firstName = userData?.firstName;
      this.lastName = userData?.lastName;
      this.otherName = userData?.otherName || undefined;
      this.dateOfBirth = userData?.dateOfBirth || undefined;
      this.nickName = userData?.nickName || undefined;
      this.userName = userData?.userName || undefined;
      this.gender = userData?.gender || undefined;

      this.photos = userData.photos || [];
      this.address = userData.address;
      this.alumni = userData.alumni || [];
      this.devices = userData.devices;
      this.userConfigs = userData.userConfigs;
    }
    if (cred) {
      this.password = cred.password;
      this.realm = cred.realm || undefined;
      this.remember = cred.remember || undefined;
      this.email = cred.email || undefined;
      this.realm = cred.realm || undefined;
      this.phone = cred.phone || undefined;
    }

  }
  get FullName() {
    // console.log(this.fullName);
    if (!this.fullName) { this.fullName = null; }
    return this.fullName;
  }
  set FullName(name: string) {
    try {
      let nameArray = name.split(' ');
      nameArray = nameArray.filter(n => {
        return n !== '';
      });
      this.fullName = '';
      nameArray.forEach((n, i) => {
        this.fullName += n;
        if (i !== nameArray.length - 1 && n.length > 1) {
          this.fullName += ' ';
        }
      });
      const fname = this.fullName.slice(0, this.fullName.indexOf(' '));
      const lname = this.fullName.slice(this.fullName.lastIndexOf(' ') + 1);
      const oname = this.fullName.slice(this.fullName.indexOf(' '), this.fullName.lastIndexOf(' '));
      this.firstName = fname;
      this.lastName = lname;
      this.otherName = oname || '';
    } catch (error) {

    }
  }

  get Info(): UserInterface | CredentialsInterface {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName,
      otherName: this.otherName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender
    };
  }

  get UpdateInfo(): UserInterface | CredentialsInterface {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      otherName: this.otherName,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender
    };
  }
}
