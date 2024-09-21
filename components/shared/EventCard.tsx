import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Event } from "@/app/models/event";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {

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
        return `${jsDate.toLocaleTimeString([], options)}`;
      };

  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt={event.title}
        className="object-cover"
        height="200px"
        src="https://nextui.org/images/hero-card.jpeg"
        // src={event.imageUrl || "/default-event-image.jpg"} // Add a default image in case event has no image
        width="100%"
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{event.title}</p>
        <p className="text-tiny text-white/80">
          Date: {formatDate(event.date)}
        </p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
