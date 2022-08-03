import { DateTime } from "luxon";

export interface PostI {
  id: string;
  title: string;
  created: string;
}

export interface TimelinePost extends Omit<PostI, "created"> {
  created: DateTime;
}

export const today: PostI = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
};

export const thisWeek: PostI = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ days: 5 }).toISO(),
};

export const thisMonth: PostI = {
  id: "3",
  title: "This Month",
  created: DateTime.now().minus({ weeks: 3 }).toISO(),
};
