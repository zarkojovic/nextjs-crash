import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />

      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="Location Pin" width={14} height={14} />
        <p className="text-sm">{location}</p>
      </div>

      <h4 className="title">{title}</h4>
      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar Icon"
            width={14}
            height={14}
          />
          <p className="text-sm">{date}</p>
        </div>
        <div>
          <Image
            src="/icons/clock.svg"
            alt="Clock Icon"
            width={14}
            height={14}
          />
          <p className="text-sm">{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
