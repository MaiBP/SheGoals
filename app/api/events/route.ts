import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/(auth)/firebase/firebaseConfig";
import { collection, query, where, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { auth } from "@/app/(auth)/firebase/firebaseConfig";
import { createEvent } from "./createEvent";

// POST request for creating an event
export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json();
    await createEvent(eventData);
    return NextResponse.json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

// GET request for fetching events
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID not provided" }, { status: 401 });
  }

  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("organizerId", "==", userId));
    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
