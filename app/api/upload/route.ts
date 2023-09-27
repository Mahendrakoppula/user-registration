// export const maxDuration = 5;
// This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { connectToMongo, fileExists } from '@/lib/mongo';

export async function POST(req: Request) {
  const { bucket } = await connectToMongo();
  // get the form data
  // const body = await req.json();
  const data = await req.formData();

  // console.log(data);
  // map through all the entries
  for (const entry of Array.from(data.entries())) {
    // console.log({ entry });
    const [filename, value] = entry as [string, File];
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == 'object';

    if (isFile) {
      const blob = value as Blob;
      // const lowerCaseName = blob.name.toLowerCase().replace(/\s+/g, '-');
      // const filename = encodeURIComponent(lowerCaseName);
      const existing = await fileExists(filename);
      if (existing) {
        // If file already exists, let's skip it.
        // If you want a different behavior such as override, modify this part.
        continue;
      }

      //conver the blob to stream
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        // make sure to add content type so that it will be easier to set later.
        contentType: blob.type,
        // metadata: req.body, //add your metadata here if any
      });

      // pipe the readable stream to a writeable stream to save it to the database
      await stream.pipe(uploadStream);
    }
  }

  // return the response after all the entries have been processed.
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    message: 'Files uploaded successfully',
  });
}
