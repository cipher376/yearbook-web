export interface PhotoLocal {
    id: string;
    nativeURL: string;
    thumbnailNativeURL: string;
    resolvedURL?: string;
    thumbnailResolvedURL?: string;
    fileName: string;
    creationDate: Date;
    base64data?: string;
    data?: string;
    dataBuffer?: ArrayBuffer;
    description?: string;
}

export interface VideoLocal {
    id: string;
    nativeURL: string;
    posterNativeURL: string;
    resolvedURL?: string;
    posterResolvedURL?: string;
    fileName: string;
    creationDate: Date;
    base64data?: string;
    data?: string;
    dataBuffer?: ArrayBuffer;
    description?: string;
    length?: number; // in seconds

}

export interface AudioLocal {
    id: string;
    nativeURL: string;
    posterNativeURL?: string;
    resolvedURL?: string;
    posterResolvedURL?: string;
    fileName: string;
    creationDate: Date;
    base64data?: string;
    data?: string;
    dataBuffer?: ArrayBuffer;
    description?: string;
    length?: number; // in seconds
}