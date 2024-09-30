// api/events/updateEvent.ts
import { db } from "@/app/(auth)/firebase/firebaseConfig";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { Event } from "@/app/models/event";

// Function to update an event in Firestore
export const updateEvent = async (event: Event) => {
  try {
    const eventRef = doc(db, "events", event.id!); // Reference to the event document

    // Update the event document with new data
    await updateDoc(eventRef, {
      title: event.title,
      description: event.description || '',
      date: Timestamp.fromDate(new Date(event.date)),
      location: event.location,
      category: event.category,
      maxParticipants: event.maxParticipants || 0,
      status: event.status || 'upcoming',
      imageUrl: event.imageUrl || '',
      updatedAt: Timestamp.now(),
    });

    console.log(`Event with ID ${event.id} updated successfully.`);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
