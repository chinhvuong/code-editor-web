import { BINARY_FILE_TYPES, IMAGE_REGEX, VIDEO_REGEX } from '@/constants/regex';

export function getLanguageFromFile(fileName: string): string {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  if (!fileExtension) {
    return ''; // Unable to determine language without a file extension
  }

  switch (fileExtension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'java':
      return 'java';
    case 'py':
      return 'python';
    case 'rb':
      return 'ruby';
    case 'php':
      return 'php';
    // Add more cases for other file extensions as needed

    default:
      return ''; // Language not determined for this file extension
  }
}

export function getFileIcon(path: string) {
  if (IMAGE_REGEX.test(path)) {
    return '/icons/icon-image.svg';
  }

  if (VIDEO_REGEX.test(path)) {
    return '/icons/icon-image.svg'; // video
  }

  if (BINARY_FILE_TYPES.test(path)) {
    return '/icons/icon-image.svg'; // binary
  }

  return '/icons/icon-file-code.svg';
}
