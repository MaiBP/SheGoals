"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Textarea,
  DatePicker,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { now, DateValue, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { auth } from "@/app/(auth)/firebase/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";


const eventCategories = [
  { key: "game", label: "Game" },
  { key: "tournament", label: "Tournament" },
  { key: "meeting", label: "Meeting Players" },
  { key: "tryouts", label: "Tryouts" },
  { key: "club_event", label: "Club Event" },
];


const CreateEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [location, setLocation] = useState("");
  const [organizerId, setOrganizerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
   const [category, setCategory] = useState<string>(""); 
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setOrganizerId(user.uid); // Set organizer ID if user is logged in
      } else {
        setOrganizerId(null); // No user logged in
        router.push("/sign-in"); // Redirect to sign-in if no user
      }
      setLoading(false); // Stop loading after checking auth state
    });

    return () => unsubscribe();
  }, [router]);

  // Date and time formatter with the user's local time zone
  const dateFormatter = useDateFormatter({
    dateStyle: "full",
    timeStyle: "short",
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organizerId) {
      console.error("Organizer ID is missing. User must be logged in.");
      return;
    }

    // Convert DateValue to JavaScript Date
    const eventDate = date.toDate(getLocalTimeZone());

    const eventData = {
      title,
      description,
      date: eventDate,
      location,
      category,
      organizerId, // Include the organizerId in the event data
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        // Event created successfully, redirect to My Events
        router.push("/my-events");
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state while checking authentication
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6">Create Event</h1>
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <Input
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <DatePicker
            className="text-default-500 text-sm"
            label="Event Date"
            variant="bordered"
            value={date}
            onChange={setDate}
            hideTimeZone={false}
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            isRequired
          />
          <p className="text-default-500 text-sm">
            Selected date and time:{" "}
            {dateFormatter.format(date.toDate(getLocalTimeZone()))} (
            {getLocalTimeZone()})
          </p>

          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                {category
                  ? eventCategories.find((c) => c.key === category)?.label
                  : "Select Category"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Event Category"
              items={eventCategories}
              onAction={(key) => setCategory(String(key))} // Cast key to string
            >
              {(item) => (
                <DropdownItem key={item.key}>{item.label}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          {/* <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="game">Game</option>
            <option value="tournament">Tournament</option>
            <option value="meeting">Meeting Players</option>
            <option value="tryouts">Tryouts</option>
            <option value="club event">Club Event</option>
          </select> */}

          <div className="mb-4" />
          <Button type="submit" color="primary">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
