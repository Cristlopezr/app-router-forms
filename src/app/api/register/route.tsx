import { NextRequest, NextResponse } from 'next/server';
import { schema } from '@/app/registrationSchema';

//Route hanlders
export async function POST(req: NextRequest) {
    const data = await req.json();
    const parsed = schema.safeParse(data);

    if (parsed.success) {
        //Add data to the database
        return NextResponse.json({ message: 'User registered', user: parsed.data });
    } else {
        return NextResponse.json({ message: 'Invalid data', error: parsed.error }, { status: 400 });
    }
}
