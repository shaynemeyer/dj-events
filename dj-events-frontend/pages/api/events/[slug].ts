// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "./data.json";
type Event = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: string;
};

type ApiResponse = Event | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const djEvent = events.filter((evt) => evt.slug === req.query.slug)[0];

  if (req.method === "GET") {
    res.status(200).json(djEvent);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed!` });
  }
}
