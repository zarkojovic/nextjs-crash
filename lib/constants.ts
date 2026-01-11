export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "JavaScript Conference 2024",
    slug: "js-conf-2024",
    location: "San Francisco, CA",
    date: "2024-09-15",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "React Summit 2024",
    slug: "react-summit-2024",
    location: "New York, NY",
    date: "2024-10-20",
    time: "10:30 AM",
  },
  {
    image: "/images/event3.png",
    title: "Vue.js Amsterdam 2024",
    slug: "vuejs-amsterdam-2024",
    location: "Amsterdam, Netherlands",
    date: "2024-11-05",
    time: "10:00 AM",
  },
  {
    image: "/images/event4.png",
    title: "Angular Connect 2024",
    slug: "angular-connect-2024",
    location: "London, UK",
    date: "2024-12-10",
    time: "09:30 AM",
  },
  {
    image: "/images/event5.png",
    title: "Full Stack Fest 2024",
    slug: "full-stack-fest-2024",
    location: "Barcelona, Spain",
    date: "2024-11-25",
    time: "11:00 AM",
  },
  {
    image: "/images/event6.png",
    title: "DevOps World 2024",
    slug: "devops-world-2024",
    location: "Berlin, Germany",
    date: "2024-10-15",
    time: "09:00 AM",
  },
];
