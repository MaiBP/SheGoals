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
import { CameraIcon } from "@/components/icons/CamaraIcon";
import { now, DateValue, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { auth, storage } from "@/app/(auth)/firebase/firebaseConfig"; // Import Firebase auth
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
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

  // // Handle file upload to Firebase Storage
  // const handleFileUpload = async () => {
  //   if (imageFile) {
  //     const storageRef = ref(storage, `event-images/${imageFile.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, imageFile);
  //     return new Promise<string>((resolve, reject) => {
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {},
  //         (error) => {
  //           reject(error);
  //         },
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
  //         }
  //       );
  //     });
  //   }
  //   return null;
  // };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const uploadImageToStorage = async () => {
      if (image) {
        const imageRef = ref(storage, `event-images/${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      }
      return null;
    };


  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organizerId) {
      console.error("Organizer ID is missing. User must be logged in.");
      return;
    }
    // Upload the image first, if an image is selected
    let imageDownloadUrl = "";
    if (image) {
      imageDownloadUrl = (await uploadImageToStorage()) ?? "";
      setImageUrl(imageDownloadUrl);
    }

    // Convert DateValue to JavaScript Date
    const eventDate = date.toDate(getLocalTimeZone());
    // const imageUrl = await handleFileUpload();
    const eventData = {
      title,
      description,
      date: eventDate,
      location,
      category,
      organizerId, // Include the organizerId in the event data
      imageUrl: imageDownloadUrl,
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
              onAction={(key) => setCategory(String(key))}
            >
              {(item) => (
                <DropdownItem key={item.key}>{item.label}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <div className="pl-2" />
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide the default input
            id="imageUpload"
          />
          {/* Button to trigger the file input */}
          <label htmlFor="imageUpload">
            <Button as="span" variant="bordered" endContent={<CameraIcon />}>
              {image ? image.name : "Upload Image"}
            </Button>
          </label>

          <div className="mb-2" />
          <Button type="submit" color="primary">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
