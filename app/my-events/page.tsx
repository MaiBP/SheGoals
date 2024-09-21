"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Event } from "@/app/models/event";
import { auth, onAuthStateChanged } from "@/app/(auth)/firebase/firebaseConfig";
import SignIn from "@/app/(auth)/pages/sign-in/page";
import EventCard from "@/components/shared/EventCard";

const MyEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication status
  const router = useRouter();
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
        fetchEvents(user.uid); // Pass the authenticated user's UID
      } else {
        setIsAuthenticated(false); // Not authenticated, show login modal
        setShowLoginModal(true);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  const fetchEvents = async (userId: string) => {
    try {
      const response = await fetch(`/api/events?userId=${userId}`, {
        method: "GET",
      });

      if (response.ok) {
        const eventsData = await response.json();
        setEvents(eventsData);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };




  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl mb-6">My Events</h1>

        {/* Create Event Button */}
        <div className="mb-6">
          <Link href="/my-events/create-event">
            <Button color="primary">Create Event</Button>
          </Link>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-gray-400">You have no events yet.</p>
          )}
        </div>

        {/* Login Modal */}
        {!isAuthenticated && showLoginModal && (
          <SignIn
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
