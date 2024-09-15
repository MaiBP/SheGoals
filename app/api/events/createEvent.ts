import { Event } from "@/app/models/event";
import { db } from "@/app/(auth)/firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";


export const createEvent = async (event: Event) => {
  try {
    // Convert date to Timestamp (from JavaScript Date)
    const eventDate = Timestamp.fromDate(new Date(event.date));

    const eventRef = await addDoc(collection(db, "events"), {
      title: event.title,
      description: event.description || '',
      organizerId: event.organizerId,
      date: eventDate,
      location: event.location,
      category: event.category,
      participants: event.participants || [],
      maxParticipants: event.maxParticipants || 0,
      status: event.status || 'upcoming',
      createdAt: Timestamp.now(),
    });
    console.log("Event created with ID:", eventRef.id);
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};
