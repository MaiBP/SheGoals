import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Event } from "@/app/models/event";

interface EventCardProps {
  event: Event;
  onDelete: () => void;
  onEdit: () => void;
}

const EventCard = ({ event, onDelete, onEdit }: EventCardProps) => {
  const defaultImageUrl =
    "https://img.freepik.com/premium-photo/capture-excitement-energy-women-soccer-football-ai-generated_705708-30006.jpg";

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
    <Card isFooterBlurred radius="lg" className="relative border-none">
      <div className="relative">
        {/* Icons for Edit and Delete */}
        <div className="absolute top-2 right-2 flex space-x-2 z-20">
          <button
            onClick={onEdit}
            aria-label="Edit event"
            className="text-white bg-white/50 p-1 rounded-full hover:bg-gray-200"
          >
            <img src="/icons/pencil.svg" alt="Edit" width={24} height={24} />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete event"
            className="text-white bg-white/50 p-1 rounded-full hover:bg-gray-200"
          >
            <img src="/icons/trash.svg" alt="Delete" width={24} height={24} />
          </button>
        </div>

        {/* Event Image */}
        <Image
          alt={event.title}
          className="object-cover"
          height="200px"
          src={event.imageUrl || defaultImageUrl}
          width="100%"
        />
      </div>

      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div>
          <p className="text-tiny text-white/80">{event.title}</p>
          <p className="text-tiny text-white/80">
            Date: {formatDate(event.date)}
          </p>
        </div>
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
