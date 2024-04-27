# Zip Module

## Overview

The **Zip Module** is an internal TypeScript library used in our project to handle ZIP file operations. It consists of two main classes: `ZipReader` for reading ZIP files and `ZipWriter` for creating ZIP files.

## Usage

### ZipReader

#### Example: Reading a ZIP File and Retrieving files

```typescript
import { ZipReader } from 'modules/zip';

// Create an instance of ZipReader
const zipReader = new ZipReader();

// Read a ZIP file and get the file tree without contents
const zipData: Uint8Array = /* Your ZIP file data */;
const fileTree = zipReader.readFileTree(zipData);

// Iterate through file tree
for (const path in fileTree) {
  console.log(`File: ${path}`);
}

const iterator = zipReader.readFileTreeWithContents(byteData);
let rs = iterator.next();
while (!rs.done) {
    if (rs.value) {
        // add file node to state
    }
    rs = iterator.next();
}
```

### ZipWriter

#### Example: Generating and Downloading a ZIP File

```typescript
import { ZipWriter } from 'modules/zip';

// Create an instance of ZipWriter
const zipWriter = new ZipWriter('name.zip');

// Add file entries
const fileNodes: IFileNode[] = [
  { path: 'file.txt', content: 'Hello, World!' }
  // Add more files as needed
];

// Generate and download the ZIP file
zipWriter.generateFromFileNodes(fileNodes);
```
