"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Event } from "@/app/models/event";
import { auth, onAuthStateChanged } from "@/app/(auth)/firebase/firebaseConfig";
import SignIn from "@/app/(auth)/pages/sign-in/page";

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

  // const formatDate = (date: any) => {
  //   const jsDate = new Date(date.seconds * 1000); // Convert Firestore Timestamp to JS Date
  //   console.log(new Date());
  //   // console.log(jsDate.toLocaleTimeString().slice(0, -3));
  //   return `${jsDate.toLocaleDateString()} ${jsDate
  //     .toLocaleTimeString()
  //     .slice(0, -3)}`;
  // };

  const formatDate = (date: any) => {
    const jsDate = new Date(date.seconds * 1000); // Convert Firestore Timestamp to JS Date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 24-hour format; set to `true` for 12-hour format
    };
    return `${jsDate.toLocaleTimeString([],options )}`;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl mb-4">My Events</h1>

        {/* Create Event Button */}
        <div className="mb-6">
          <Link href="/my-events/create-event">
            <Button color="primary">Create Event</Button>
          </Link>
        </div>

        {/* Events List */}
        <div className="bg-gray-800 p-6 rounded-lg">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="mb-4">
                <h2 className="text-white text-xl">{event.title}</h2>
                <p className="text-gray-400">{event.description}</p>
                <p className="text-gray-400">
                  Date: {formatDate(event.date)}
                
                </p>
              </div>
            ))
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
