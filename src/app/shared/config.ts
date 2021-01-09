/****API Configurations */

/*****
 * REMOTE API SERVER
 */
export const API_HOST = `http://yearbook-api.devtek-limited.tech:`;

export const API_PORT = 8085;
export const API_ROOT_URL = `http://yearbook-api.devtek-limited.tech:${API_PORT}`;

export const SOCKET_PORT = 8085;
export const SOCKET_ROOT_URL = `http://yearbook-socket.devtek-limited.tech:${SOCKET_PORT}`;


/****
 * LOCAL API SERVER
 */
// export const API_HOST = `http://localhost:`;
// export const API_PORT = 3001; // comment out to use remote
// export const API_ROOT_URL = `${API_HOST}${API_PORT || 80}`; // comment out to user remote


// export const SOCKET_PORT = 3000;
// export const SOCKET_ROOT_URL = `${API_HOST}${SOCKET_PORT }`;


/***
 * Default images for users and schools without profile photo
 */
export const NO_SCHOOL_PHOTO = `${API_ROOT_URL}/media/download/No_School.svg`;
export const NO_COMMENT_PHOTO = `${API_ROOT_URL}/media/download/No_Comment.svg`;
export const NO_IMAGE_PHOTO = `${API_ROOT_URL}/media/download/No_Images.svg`;
export const NO_MUSIC_PHOTO = `${API_ROOT_URL}/media/download/No_Music.svg`;
export const NO_VIDEO_PHOTO = `${API_ROOT_URL}/media/download/No_Video.svg`;

export const SCHOOL_LOCATION_POINTER = `${API_ROOT_URL}/media/download/school_location_pointer.png`;
export const SCHOOL_DEFAULT_PHOTO_URL = `${API_ROOT_URL}/media/download/school_default.png`;
export const NO_SCHOOL_COVER_PHOTO_URL = `${API_ROOT_URL}/media/download/school_cover.svg`;
export const USER_DEFAULT_PHOTO_URL = `${API_ROOT_URL}/media/download/user_default.svg`;
export const CREST_DEFAULT_PHOTO_URL = `${API_ROOT_URL}/media/download/school_crest.svg`;
export const USER_DEFAULT_COVER_URL = `${API_ROOT_URL}/media/download/default_user_cover.svg`;
export const USER_LOCATION_POINTER = `${API_ROOT_URL}/media/download/user_location_pointer.png`;


export const SERVER_UPLOAD_PATH = '/media/upload/';
export const SERVER_DOWNLOAD_PATH = '/media/download/';
export const UPLOAD_URL = API_ROOT_URL + SERVER_UPLOAD_PATH;
export const DOWNLOAD_CONTAINER = API_ROOT_URL + SERVER_DOWNLOAD_PATH;

export const DEFAULT_AUDIO_COVER = API_ROOT_URL + SERVER_DOWNLOAD_PATH + 'audio_cover.jpg';
export const DEFAULT_AUDIO_ICON = API_ROOT_URL + SERVER_DOWNLOAD_PATH + 'audioIcon.jpg';

export const DEFAULT_DOCUMENT_COVER = API_ROOT_URL + SERVER_DOWNLOAD_PATH + 'document_cover.png';

export const APP_VERSION = '0.0.1 ALPHA';

