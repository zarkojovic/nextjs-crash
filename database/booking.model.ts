import { Document, model, models, Schema, Types } from "mongoose";
import Event from "./event.model";
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // Simple email regex for validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", async function () {
  const booking = this as IBooking;

  if (booking.isModified("eventId") || booking.isNew) {
    const eventExists = await Event.findById(booking.eventId).select("_id");

    if (!eventExists) {
      const error = new Error("Associated event does not exist");
      error.name = "ValidationError";
      throw error;
    }
  }
});

BookingSchema.index({ eventId: 1 });

BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

BookingSchema.index({ email: 1 });

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
