# Code Editor

## Features

1. **File Upload:**

   - Users can upload ZIP files, either through a conventional file input
   - The uploaded ZIP file's contents are displayed in a tree structure on the left.

2. **File Tree:**

   - The left File tree displays the contents of the uploaded ZIP file.
   - Extend file tree functionality to support adding files or folders.

3. **File Editing:**

   - Clicking a file in the tree opens it in the Monaco editor.
   - Binary files, including images, are displayed directly on the screen.
   - Editable text files are shown in the editor.

4. **Undo/Redo Functionality:**

   - The Monaco editor provides undo/redo functionality.
   - Users can use `ctrl(cmd)+z` and `ctrl(cmd)+shift+z` for undo and redo operations.

5. **Download Modified ZIP:**

   - Users can download the modified ZIP file after making changes.

6. **Own Zip library:**
   - Handling Zip file without built in library.
7. **Using web worker:**
   - Handling Zip file using web worker.

## How to Run

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm run dev`.

## Project Structure

The project is organized into several key directories, each serving a specific purpose:

### `src/components`

This directory contains reusable React components that are primarily concerned with rendering UI elements. Key components include:

### `src/containers`

Containers represent higher-level components that may combine multiple presentational components from the `components` directory. They handle the logic and state management for specific sections of the application.

### `src/constants`

This directory holds constant values used throughout the application, including file signatures, compression methods, and external permissions.

### `src/layout`

The `layout` directory contains components responsible for defining the overall layout and structure of the application.

### `src/modules`

Modules encapsulate self-contained functionalities or features. Example: [zip](src/modules/zip) module

### `src/pages`

Pages represent high-level views of the application and typically correspond to distinct routes. Each page may utilize components and containers to compose its UI.

### `src/state`

This directory manages the state of the application, incorporating Redux or other state management solutions. It includes actions, reducers, and selectors to handle global state.

### `src/utils`

The `utils` directory houses utility functions for handling common operations, such as file-related tasks, ZIP file manipulation, and other general-purpose functions.

### `src/test`

This directory contains unit tests and end-to-end tests to ensure the reliability and correctness of the application.

## Future Development

### Optimizations for Large Files

- Implement optimizations to handle ZIP files with a very large number of small files (> 10,000).
- Explore ways to enhance performance and responsiveness in scenarios with extensive file structures.

### File Tree Management

- Extend file tree functionality to support delete, modify files or folders.
- Enable users to organize and manipulate the file tree, providing a more dynamic editing experience.

### Testing

- Develop comprehensive unit tests for individual components to ensure robustness and reliability.
- Implement end-to-end (E2E) tests for critical workflows such as ZIP file upload, editing, and download.

### Monaco Editor Enhancements

- Explore additional features provided by the Monaco Editor, such as:
  - Support for a multi-model editor: Auto-completion for content in files with multiple open tabs.
  - Enhanced syntax highlighting based on file extension.
  - Theme support to allow users to customize the editor's appearance.
  - Auto-completion support for improved coding experience.

### Collaboration Features

- Investigate the possibility of introducing collaborative editing features, allowing multiple users to edit the same ZIP file simultaneously.
- Explore real-time syncing mechanisms to ensure seamless collaboration.

### Accessibility Improvements

- Enhance accessibility features to ensure a more inclusive user experience.
- Implement keyboard navigation and compatibility with screen readers for users with disabilities.

### Theming Support

- Introduce theming support to allow users to customize the visual appearance of the application.
- Provide a selection of predefined themes and the ability to create custom themes.

### Internationalization (i18n)

- Implement internationalization to support multiple languages.
- Allow users to switch between different language options for a more globally accessible application.

### Integration with Cloud Storage

- Explore integration with cloud storage services to allow users to directly edit ZIP files stored in cloud platforms.
- Provide seamless synchronization and collaboration features when working with cloud-stored files.
