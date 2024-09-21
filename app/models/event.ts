// models/event.ts

export interface Event {
  id?: string;                // Firestore auto-generated ID
  title: string;               // Event name/title
  description?: string;        // Event description
  organizerId: string;         // User ID of the event organizer
  date: Date;                  // Date and time of the event
  location: string;            // Location of the event (physical or online)
  participants?: string[];     // List of participant user IDs
  maxParticipants?: number;    // Max number of participants allowed
  status: 'upcoming' | 'completed' | 'canceled'; // Event status
  category: EventCategory;     // Category of the event (game, tournament, etc.)
  createdAt: Date;             // Event creation timestamp
  updatedAt?: Date;            // Event last updated timestamp
  imageUrl?: string;
}

// Defining event categories
export type EventCategory =
  | 'game'
  | 'tournament'
  | 'meetings'
  | 'tryouts'
  | 'club event'
 

