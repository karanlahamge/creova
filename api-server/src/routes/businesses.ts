import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, businessesTable, leadsTable, bookingsTable, activityTable, businessStatsTable } from "@workspace/db";
import {
  CreateBusinessBody,
  CreateBusinessResponse,
  GetBusinessParams,
  GetBusinessResponse,
  UpdateBusinessParams,
  UpdateBusinessBody,
  UpdateBusinessResponse,
  DeleteBusinessParams,
  ListBusinessesResponse,
  GetBusinessStatsParams,
  GetBusinessStatsResponse,
  GetBusinessActivityParams,
  GetBusinessActivityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/businesses", async (_req, res): Promise<void> => {
  const businesses = await db.select().from(businessesTable).orderBy(desc(businessesTable.createdAt));
  res.json(ListBusinessesResponse.parse(businesses));
});

router.post("/businesses", async (req, res): Promise<void> => {
  const parsed = CreateBusinessBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [business] = await db.insert(businessesTable).values(parsed.data).returning();
  // Create default stats row
  await db.insert(businessStatsTable).values({
    businessId: business.id,
    websiteVisits: Math.floor(Math.random() * 500) + 50,
    totalMessages: Math.floor(Math.random() * 30) + 5,
    revenue: Math.floor(Math.random() * 5000) + 500,
    totalCustomers: Math.floor(Math.random() * 100) + 10,
    visitsChange: parseFloat((Math.random() * 30 - 5).toFixed(1)),
    bookingsChange: parseFloat((Math.random() * 25 - 5).toFixed(1)),
    leadsChange: parseFloat((Math.random() * 20 - 5).toFixed(1)),
    revenueChange: parseFloat((Math.random() * 15 - 5).toFixed(1)),
  }).onConflictDoNothing();
  res.status(201).json(CreateBusinessResponse.parse(business));
});

router.get("/businesses/:id", async (req, res): Promise<void> => {
  const params = GetBusinessParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, params.data.id));
  if (!business) {
    res.status(404).json({ error: "Business not found" });
    return;
  }
  res.json(GetBusinessResponse.parse(business));
});

router.patch("/businesses/:id", async (req, res): Promise<void> => {
  const params = UpdateBusinessParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateBusinessBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [business] = await db
    .update(businessesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(businessesTable.id, params.data.id))
    .returning();
  if (!business) {
    res.status(404).json({ error: "Business not found" });
    return;
  }
  res.json(UpdateBusinessResponse.parse(business));
});

router.delete("/businesses/:id", async (req, res): Promise<void> => {
  const params = DeleteBusinessParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(businessesTable).where(eq(businessesTable.id, params.data.id));
  res.sendStatus(204);
});

router.get("/businesses/:id/stats", async (req, res): Promise<void> => {
  const params = GetBusinessStatsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [stats] = await db.select().from(businessStatsTable).where(eq(businessStatsTable.businessId, params.data.id));
  const totalBookings = await db.$count(bookingsTable, eq(bookingsTable.businessId, params.data.id));
  const totalLeads = await db.$count(leadsTable, eq(leadsTable.businessId, params.data.id));

  const result = {
    websiteVisits: stats?.websiteVisits ?? 0,
    totalBookings,
    totalLeads,
    totalMessages: stats?.totalMessages ?? 0,
    revenue: stats?.revenue ?? 0,
    totalCustomers: stats?.totalCustomers ?? 0,
    visitsChange: stats?.visitsChange ?? 0,
    bookingsChange: stats?.bookingsChange ?? 0,
    leadsChange: stats?.leadsChange ?? 0,
    revenueChange: stats?.revenueChange ?? 0,
  };

  res.json(GetBusinessStatsResponse.parse(result));
});

router.get("/businesses/:id/activity", async (req, res): Promise<void> => {
  const params = GetBusinessActivityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const activity = await db
    .select()
    .from(activityTable)
    .where(eq(activityTable.businessId, params.data.id))
    .orderBy(desc(activityTable.createdAt))
    .limit(20);
  res.json(GetBusinessActivityResponse.parse(activity));
});

export default router;
