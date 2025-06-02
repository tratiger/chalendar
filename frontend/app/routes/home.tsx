import type { Route } from "./+types/home";
import CalendarChatroom from "../components/calender-chatroom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chalendar" },
    { name: "description", content: "Welcome to chalendar!" },
  ];
}

export default function Home() {
  return <CalendarChatroom />;
}
