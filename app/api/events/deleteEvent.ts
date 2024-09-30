// api/events/deleteEvent.ts
import { db } from "@/app/(auth)/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

// Function to delete an event from Firestore
export const deleteEvent = async (eventId: string) => {
  try {
    const eventRef = doc(db, "events", eventId); // Reference to the event document
    await deleteDoc(eventRef); // Delete the document
    console.log(`Event with ID ${eventId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error; // Re-throw the error for handling on the frontend
  }
};
