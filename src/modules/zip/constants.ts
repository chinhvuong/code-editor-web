// Compression methods
export const COMPRESSION_METHOD = {
  DEFLATE: 0x08,
  STORE: 0x00,
  AES: 0x63
};
// Signatures for various parts of the ZIP file
export const LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
export const SPLIT_ZIP_FILE_SIGNATURE = 0x08074b50;
export const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
export const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;

// Lengths of various ZIP file sections
export const END_OF_CENTRAL_DIR_LENGTH = 22;

// Extra field types
export const EXTRAFIELD_TYPE_NTFS = 0x000a;
export const EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;

// Bit flags and attributes
export const DESCRIPTOR_BYTES_LENGTH = 0x10;

// Versions
export const VERSION_DEFLATE = 0x14;
export const VERSION_ZIP64 = 0x2d;
export const VERSION_AES = 0x33;

// Directory separator
export const DIRECTORY_SIGNATURE = '/';

// Date range for ZIP file
export const MAX_DATE = new Date(2107, 11, 31);
export const MIN_DATE = new Date(1980, 0, 1);

// Undefined value and types
export const UNDEFINED_VALUE = undefined;
export const UNDEFINED_TYPE = 'undefined';
export const FUNCTION_TYPE = 'function';

// Regular expression for binary file types
export const BINARY_FILE_TYPES =
  /\.(jpeg|jpg|png|gif|bmp|mp3|wav|flac|mp4|avi|mkv|pdf|docx|xlsx|pptx|zip|rar|tar|exe|dll|sqlite|db|bin|ico)$/i;

// External permission values for files and folders
export const EXTERNAL_PERMISSION_FILE = 2176057344; // rwx
export const EXTERNAL_PERMISSION_FOLDER = 1107099648; // rwx

// CRC32 generator polynomial
export const GENERATOR_POLYNOMIAL_CRC32 = 0xedb88320;

export const MIME_TYPE: { [key: string]: string } = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  webp: 'image/webp',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  tar: 'application/x-tar',
  exe: 'application/octet-stream',
  dll: 'application/octet-stream',
  sqlite: 'application/x-sqlite3',
  db: 'application/octet-stream',
  json: 'application/json',
  xml: 'application/xml',
  yaml: 'application/x-yaml',
  txt: 'text/plain',
  csv: 'text/csv',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jsx: 'text/jsx',
  ts: 'application/typescript',
  tsx: 'text/tsx',
  md: 'text/markdown',
  rtf: 'application/rtf',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  eot: 'application/vnd.ms-fontobject',
  otf: 'font/otf'
  // Add more mappings as needed
};
