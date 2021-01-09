export const MEDIA_TYPE = [
  'Photo', 'Video', 'Audio', 'Document', 'Website'
];

export enum MediaType {
  PHOTO = 0,
  VIDEO = 1,
  AUDIO = 2,
  DOCUMENT = 3,
  WEBSITE = 4
}

export enum PhotoType {
  profile = 0,
  cover = 1,
  flag = 2
}

export interface MediaInterface {
  id?: number;
  userId?: number;
  schoolId?: number;
  description?: string;
  fileName?: string;
  fileUrl?: string;
  // coverUrl?: string;
  thumbnailUrl?: string;
  dateCreated?: Date;
  type: MediaType;
}

export class Media implements MediaInterface {
  id: number;
  userId?: number;
  schoolId?: number;
  postId?: number;
  description?: string;
  fileName?: string;
  fileUrl: string;
  thumbnailUrl?: string;
  // coverUrl?: string;
  dateCreated?: Date;
  type: MediaType;

  /**
   *
   */
  constructor(private data?: MediaInterface) {
    Object.assign(this, data);
  }
}

export class Photo extends Media {
  /**
   *
   */
  coverImage?: boolean;
  profile?: boolean;
  flag?: boolean;


  constructor(data?: MediaInterface) {
    super(data);
  }

  get Info() {
    return {
      id: this.id,
      description: this.description,
      fileName: this.fileName,
      fileUrl: this.fileUrl,
      thumbnailUrl: this.thumbnailUrl,
      dateCreated: this.dateCreated,
      type: this.type,
      coverImage: this.coverImage,
      profile: this.profile,
      flag: this.flag
    };
  }
}
export class Video extends Media {
  /**
     *
     */
  posterUrl?: string;
  mimeType?: string;
  length?: number;

  constructor(data?: MediaInterface) {
    super(data);

  }
  get Info() {
    return {
      id: this.id,
      description: this.description,
      fileName: this.fileName,
      fileUrl: this.fileUrl,
      thumbnailUrl: this.thumbnailUrl,
      posterUrl: this.posterUrl,
      dateCreated: this.dateCreated,
      type: this.type,
      mimeType: this.mimeType
    };
  }
}
export class Audio extends Media {
  /**
     *
     */
  length?: number;
  mimeType?: string;

  constructor(data?: MediaInterface) {
    super(data);

  }
}
export class Document extends Media {
  /**
     *
     */
  constructor(data?: MediaInterface) {
    super(data);

  }
}
export class Website extends Media {
  /**
     *
     */
  constructor(data?: MediaInterface) {
    super(data);

  }
}

export interface IdentityPhoto {
  profile: Photo;
  cover: Photo;
  flag: Photo;
}

export class PostPhotoLink {
  id?: number;
  postId: number;
  photoId: number;
}
export class PostAudioLink {
  id?: number;
  postId: number;
  audioId: number;
}
export class PostVideoLink {
  id?: number;
  postId: number;
  videoId: number;
}
export class PostDocumentLink {
  id?: number;
  postId: number;
  documentId: number;
}
