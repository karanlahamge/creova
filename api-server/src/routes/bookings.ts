import { Router, type IRouter } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, bookingsTable, activityTable } from "@workspace/db";
import {
  ListBookingsParams,
  ListBookingsResponse,
  CreateBookingParams,
  CreateBookingBody,
  CreateBookingResponse,
  UpdateBookingParams,
  UpdateBookingBody,
  UpdateBookingResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/businesses/:id/bookings", async (req, res): Promise<void> => {
  const params = ListBookingsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const bookings = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.businessId, params.data.id))
    .orderBy(desc(bookingsTable.scheduledAt));
  res.json(ListBookingsResponse.parse(bookings));
});

router.post("/businesses/:id/bookings", async (req, res): Promise<void> => {
  const params = CreateBookingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [booking] = await db
    .insert(bookingsTable)
    .values({
      ...parsed.data,
      businessId: params.data.id,
      scheduledAt: new Date(parsed.data.scheduledAt),
    })
    .returning();
  // Log activity
  await db.insert(activityTable).values({
    businessId: params.data.id,
    type: "booking",
    message: `New booking from ${booking.customerName}${booking.service ? ` for ${booking.service}` : ""}`,
  });
  res.status(201).json(CreateBookingResponse.parse(booking));
});

router.patch("/businesses/:id/bookings/:bookingId", async (req, res): Promise<void> => {
  const params = UpdateBookingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const updateData: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.scheduledAt) {
    updateData.scheduledAt = new Date(parsed.data.scheduledAt);
  }
  const [booking] = await db
    .update(bookingsTable)
    .set(updateData)
    .where(and(eq(bookingsTable.id, params.data.bookingId), eq(bookingsTable.businessId, params.data.id)))
    .returning();
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  res.json(UpdateBookingResponse.parse(booking));
});

export default router;
