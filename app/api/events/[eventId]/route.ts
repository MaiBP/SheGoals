import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/(auth)/firebase/firebaseConfig";
import { deleteDoc,updateDoc, doc } from "firebase/firestore";




// DELETE request for deleting an event
export async function DELETE(req: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const eventId = params.eventId;
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef); // Delete the event
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
// PATCH request for updating an event
export async function PATCH(req: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const eventId = params.eventId;
    const eventData = await req.json();
    const eventRef = doc(db, "events", eventId);
    
    await updateDoc(eventRef, eventData); // Update event document with new data

    return NextResponse.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}