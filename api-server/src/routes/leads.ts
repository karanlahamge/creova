import { Router, type IRouter } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, leadsTable, activityTable } from "@workspace/db";
import {
  ListLeadsParams,
  ListLeadsResponse,
  CreateLeadParams,
  CreateLeadBody,
  CreateLeadResponse,
  UpdateLeadParams,
  UpdateLeadBody,
  UpdateLeadResponse,
  DeleteLeadParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/businesses/:id/leads", async (req, res): Promise<void> => {
  const params = ListLeadsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const leads = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.businessId, params.data.id))
    .orderBy(desc(leadsTable.createdAt));
  res.json(ListLeadsResponse.parse(leads));
});

router.post("/businesses/:id/leads", async (req, res): Promise<void> => {
  const params = CreateLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [lead] = await db
    .insert(leadsTable)
    .values({ ...parsed.data, businessId: params.data.id })
    .returning();
  // Log activity
  await db.insert(activityTable).values({
    businessId: params.data.id,
    type: "lead",
    message: `New lead from ${lead.name}`,
  });
  res.status(201).json(CreateLeadResponse.parse(lead));
});

router.patch("/businesses/:id/leads/:leadId", async (req, res): Promise<void> => {
  const params = UpdateLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [lead] = await db
    .update(leadsTable)
    .set(parsed.data)
    .where(and(eq(leadsTable.id, params.data.leadId), eq(leadsTable.businessId, params.data.id)))
    .returning();
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json(UpdateLeadResponse.parse(lead));
});

router.delete("/businesses/:id/leads/:leadId", async (req, res): Promise<void> => {
  const params = DeleteLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db
    .delete(leadsTable)
    .where(and(eq(leadsTable.id, params.data.leadId), eq(leadsTable.businessId, params.data.id)));
  res.sendStatus(204);
});

export default router;
