import { NextResponse } from 'next/server';
import { connectToMongo } from '@/lib/mongo';

const collection = 'registration';

type Params = {
  params: { number: string };
};
/**
 * For getting a single document
 */
export async function GET(_request: Request, { params }: Params) {
  console.log({ params });
  const { client } = await connectToMongo();
  try {
    const response = await client.db().collection(collection).findOne({
      registrationNumber: params.number,
    });
    return NextResponse.json({
      message: 'success',
      response,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
/**
 * For updating a single document
 */

export async function PUT(request: Request, { params }: Params) {
  const { client } = await connectToMongo();
  try {
    const body = await request.json();
    const response = client
      .db()
      .collection(collection)
      .updateOne(
        { registrationNumber: params.number },
        {
          $set: {
            paymentScreenshot: body.paymentScreenshot,
            paymentStatus: body.paymentStatus,
          },
          $currentDate: { lastModified: true },
        }
      );

    return NextResponse.json({
      message: 'success',
      response,
      body,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

/**
 * For deleting a single document
 */
export async function DELETE(request: Request, { params }: Params) {
  const { client } = await connectToMongo();
  try {
    const response = client
      .db()
      .collection(collection)
      .deleteOne({ registrationNumber: params.number });
    return NextResponse.json({
      message: 'success',
      response,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
