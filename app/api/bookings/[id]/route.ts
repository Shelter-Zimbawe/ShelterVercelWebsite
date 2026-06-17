import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { hasAdminSession } from '@/lib/adminAuth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!await hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await sql`DELETE FROM bookings WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!await hasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();

    const [updatedBooking] = await sql`
      UPDATE bookings SET status = ${body.status} WHERE id = ${params.id} RETURNING *
    `;

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
