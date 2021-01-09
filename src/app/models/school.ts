import { Audio, Photo } from './my-media';
import { Address } from './address';

export const SCHOOL_TYPE = [
  'University', 'College', 'Senior high school',
  'Seminary', 'Junior high school', 'Technical school',
  'Vocational school', 'Basic/Primary School'
]
export enum SchoolType {
  UNIVERSITY = 'University',
  COLLEGE = 'College',
  SENIOR_HIGH_SCHOOL = 'Senior high school',
  BASIC_SCHOOL = 'Basic/Primary School',
  SEMINARY = 'Seminary',
  JUNIOR_HIGH_SCHOOL = 'Junior high school',
  TECHNICAL_SCHOOL = 'Technical school',
  VOCATIONAL_SCHOOL = 'Vocational school',
}

export const ACCOMMODATION_TYPE = [
  'Day', 'Hall', 'Hostel', 'Boarding', 'Rent', 'No accommodation'
]
export enum AccommodationType {
  DAY = 'Day',
  HALL = 'Hall',
  BOARDING = 'Hostel',
  HOSTEL = 'Boarding',
  RENT = 'Rent',
  NONE = 'No accommodation'
}

// export enum schoolSize {
//   SMALL = 'Small', // less than 500 students
//   MEDIUM = 'Medium', // less than 2000 students
//   LARGE = 'Large' // above 2000 students
// }

export interface SchoolInterface {
  id: number;
  name: string;
  dateStarted: Date;
  address?: Address;
  type: SchoolType;
  gender: string;
  photos: Photo[];
  thumbnailUrl: string;
  coverUrl: string;
}

export interface SchoolDetailsInterface {
  id: number;
  about: string;
  alias: string;
  totalStudents: number;
  studentAlias: string;
  accommodationTypes: AccommodationType[];
  helpLines: string;
  email: string;
  motto: string;
  mission: string;
  vision: string;
  anthem: string;
  anthemAudio: Audio;
  flag: Photo;
  departments: string[];
  website: string;
  emblem: Photo;
  alumniCount: number;
}

export class School {
  id: number;
  name: string;
  dateStarted: Date;
  type: SchoolType;
  gender: string;

  detailsId?: number;
  about?: string;
  alias?: string;
  totalStudents: number;
  studentAlias?: string;
  accommodationTypes?: AccommodationType[];
  helpLines?: string;
  email?: string;
  motto?: string;
  mission?: string;
  vision?: string;
  anthem?: string;
  anthemAudio?: Audio;
  flag?: Photo;
  departments?: string[];
  website?: string;
  emblem?: Photo;
  alumniCount?: number;
  thumbnailUrl?: string;
  coverUrl?: string;
  photos?: Photo[];
  private _address?: Address = new Address();
  config: any;
  posts: any;


  constructor(private data?: SchoolInterface, public details?: SchoolDetailsInterface) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.dateStarted = data.dateStarted;
      this.address = data.address || this.address;
      this.type = data.type;
      this.gender = data.gender;
      this.photos = data.photos;
      this.thumbnailUrl = data.thumbnailUrl;
      this.coverUrl = data.thumbnailUrl;
    }

    if (details) {
      this.detailsId = details.id;
      this.about = details.about;
      this.alias = details.alias;
      this.totalStudents = details.totalStudents;
      this.accommodationTypes = details.accommodationTypes;
      this.helpLines = details.helpLines;
      this.motto = details.motto;
      this.mission = details.mission;
      this.vision = details.vision;
      this.anthem = details.anthem;
      this.anthemAudio = details.anthemAudio;
      this.flag = details.flag;
      this.departments = details.departments;
      this.website = details.website;
      this.emblem = details.emblem;
      this.email = details.email;
      this.alumniCount = details.alumniCount;
    }
  }

  public get detail(): SchoolDetailsInterface {
    return {
      id: this.detailsId,
      about: this.about,
      alias: this.alias,
      accommodationTypes: this.accommodationTypes,
      helpLines: this.helpLines,
      motto: this.motto,
      mission: this.mission,
      vision: this.vision,
      anthem: this.anthem,
      anthemAudio: this.anthemAudio,
      flag: this.flag,
      departments: this.departments,
      website: this.website,
      emblem: this.emblem,
      studentAlias: this.studentAlias,
      email: this.email,
      totalStudents: this.totalStudents,
      alumniCount: this.alumniCount
    };
  }

  public set detail(info: SchoolDetailsInterface) {
    this.detailsId = info.id;
    this.about = info.about;
    this.alias = info.alias;
    this.accommodationTypes = info.accommodationTypes;
    this.helpLines = info.helpLines;
    this.motto = info.motto;
    this.mission = info.mission;
    this.vision = info.vision;
    this.anthem = info.anthem;
    this.anthemAudio = info.anthemAudio;
    this.flag = info.flag;
    this.departments = info.departments;
    this.website = info.website;
    this.emblem = info.emblem;
    this.studentAlias = info.studentAlias;
    this.email = info.email;
    this.totalStudents = info.totalStudents;
    this.alumniCount = info.alumniCount;


  }

  public get info(): SchoolInterface {
    return {
      id: this.id,
      name: this.name,
      dateStarted: this.dateStarted,
      type: this.type,
      gender: this.gender,
      photos: this.photos,
      thumbnailUrl: this.thumbnailUrl,
      coverUrl: this.coverUrl
    };
  }

  public set info(school: SchoolInterface) {
    this.id = school.id;
    this.name = school.name;
    this.dateStarted = school.dateStarted;
    this.address = school.address;
    this.type = school.type;
    this.gender = school.gender;
    this.photos = school.photos;
  }

  public set address(address: Address) {
    this._address = address;
  }
  public get address() {
    return this._address;
  }

        /**
 * school search sequence
 * propery search-score
 * name      6
 * alias     5.8
 * helpLines 5.7
 * email     5.6
 * latLng    6.0
 *
 * dateStarted 4.1
 * studentAlias 4.2
 * anthem   4
 * address.street 4.3
 * address.suburb 4.3
 * address.city 4.3
 *
 *
 * address.state 3.9
 * address.country 3.9
 * address.postcode 3.5
 *
 * type     3.2
 * gender    3.1
 * motto     3.0
 * mission   3.0
 * vision    3.0
 *
 * about     2.5
 * website   2.0
 *
 *
 *
 * departments        1.5
 * accommodationTypes 1.5
 * totalStudents 1.2
 * alumniCount 1.0
 *
 *
 *  */
}
