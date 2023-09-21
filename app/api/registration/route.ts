import { NextResponse } from 'next/server';
import { connectToMongo } from '@/lib/mongo';

const collection = 'registration';
/**
 * For getting all documents
 */
export async function GET() {
  const { client } = await connectToMongo();
  const response = await client.db().collection(collection).find().toArray();
  return NextResponse.json(response);
}
/**
 * For getting a single document
 */
export async function POST(request: Request) {
  const { client } = await connectToMongo();
  try {
    const body = await request.json();
    const response = client.db().collection(collection).insertOne(body);
    const result = await response;
    console.log(result);
    const payload = {
      message: 'success',
      ...body,
    };
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(error);
  }
}
