import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
      maxlength: [500, "Overview cannot exceed 500 characters"],
    },

    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      enum: ["online", "offline", "hybrid"],
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Agenda must have at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "There must be at least one tag",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// pre save hook for generating slug from title and data normalization
EventSchema.pre("save", async function () {
  const event = this as IEvent;

  if (event.isModified("title") || event.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified("date")) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified("time")) {
    event.time = normalizeTime(event.time);
  }
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

function normalizeDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date.toISOString().split("T")[0]; // Return date in YYYY-MM-DD format
}

function normalizeTime(timeStr: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i;
  const match = timeStr.trim().match(timeRegex);
  if (!match) {
    throw new Error("Invalid time format");
  }
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];
  if (period) {
    // convert to 24-hour format
    if (period.toUpperCase() === "PM" && hours < 12) {
      hours += 12;
    }
    if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
  }
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time value");
  }
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

EventSchema.index({ slug: 1 }, { unique: true });

EventSchema.index({ date: 1, mode: 1 });

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
