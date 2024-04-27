
// zipWorker.js
import { ZipReader } from '@/modules/zip'; // Adjust according to your zip reading library

self.addEventListener("message", async (event: MessageEvent) => {
  const zipFile = event.data;
  const zipReader = new ZipReader(/^(?!.*node_modules\/).*$/);
  const byteData = await zipReader.getZipFileByteDataFromFile(zipFile);
  const iterator = zipReader.readFileTreeWithContents(byteData);

  const files = [];
  let rs = iterator.next();
  while (!rs.done) {
    if (rs.value) {
      files.push(rs.value);
      self.postMessage(rs.value);
    }
    rs = iterator.next();
  }

   // Send the results back to the main thread
})
// //This stringifies the whole function
// const codeToString = workerFunction.toString();
// //This brings out the code in the bracket in string
// const mainCode = codeToString.substring(codeToString.indexOf('{') + 1, codeToString.lastIndexOf('}'));
// //convert the code into a raw data
// const blob = new Blob([mainCode], { type: 'application/javascript' });
// //A url is made out of the blob object and we're good to go
// const zipWorker = URL.createObjectURL(blob);

// export default zipWorker
