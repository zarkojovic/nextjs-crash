import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import React from "react";
import { events } from "@/lib/constants";

const Page = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-center mt-20">
        Welcome to DevEvent
      </h1>
      <p className="text-center mt-4 text-lg">
        Discover and share developer events worldwide.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event, index) => (
            <li key={index}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
