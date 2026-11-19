import { Router, type IRouter } from "express";
import { GenerateContentBody, GenerateContentResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const AI_CONTENT: Record<string, (name: string, category: string, context?: string) => { content: string; items?: string[] }> = {
  description: (name, category) => ({
    content: `${name} is a premier ${category} business dedicated to delivering exceptional quality and service. We combine industry expertise with personalized attention to create memorable experiences for every customer. Our team of professionals is committed to exceeding your expectations through innovative solutions and unwavering dedication to excellence.`,
  }),
  slogans: (name, category) => ({
    content: `Here are compelling slogans for ${name}:`,
    items: [
      `${name} — Where Excellence Meets You`,
      `Your Trusted ${category} Partner`,
      `${name}: Quality You Can Count On`,
      `Experience the ${name} Difference`,
      `${category} Reimagined — ${name}`,
    ],
  }),
  faq: (name, category) => ({
    content: `Frequently Asked Questions for ${name}:`,
    items: [
      `What services does ${name} offer? — We provide comprehensive ${category} services tailored to your specific needs and budget.`,
      `How do I book an appointment? — You can book through our website, call us, or send a WhatsApp message for instant confirmation.`,
      `What are your business hours? — We're open Monday to Saturday, 9 AM to 7 PM. Emergency services available 24/7.`,
      `Do you offer home visits or delivery? — Yes, we offer convenient at-home services and delivery options for select services.`,
      `What payment methods do you accept? — We accept cash, UPI, debit/credit cards, and all major digital payment platforms.`,
      `Is there a satisfaction guarantee? — Absolutely. Your satisfaction is our top priority and we offer a 100% satisfaction guarantee.`,
    ],
  }),
  services: (name, category) => ({
    content: `Core services offered by ${name}:`,
    items: [
      `Premium ${category} Consultation — Personalized assessment and expert recommendations`,
      `Essential ${category} Package — Our most popular service bundle for regular customers`,
      `Express ${category} Service — Quick, efficient service for your busy schedule`,
      `${category} Maintenance Plan — Regular upkeep and preventive care subscription`,
      `Custom ${category} Solution — Fully tailored service designed around your unique needs`,
      `Emergency ${category} Support — Priority assistance when you need it most`,
    ],
  }),
  pricing: (_name, category) => ({
    content: `Transparent pricing for all ${category} services:`,
    items: [
      `Basic Package — ₹999 | Essential services for new customers. Includes consultation and basic service.`,
      `Standard Package — ₹2,499 | Our most popular plan. Full service suite with priority scheduling.`,
      `Premium Package — ₹4,999 | Comprehensive service with VIP treatment and monthly maintenance.`,
      `Enterprise Plan — Custom pricing | For businesses and high-volume clients. Contact us for a quote.`,
      `Annual Membership — ₹14,999 | Save 30% with yearly commitment. Includes all standard services.`,
    ],
  }),
  testimonials: (name, _category) => ({
    content: `Customer testimonials for ${name}:`,
    items: [
      `"Absolutely fantastic experience! The team at ${name} went above and beyond. Highly recommend to anyone looking for top-quality service." — Priya Sharma, ★★★★★`,
      `"I've tried many similar businesses but ${name} stands out for its professionalism and attention to detail. Will definitely be coming back!" — Rahul Mehta, ★★★★★`,
      `"The best decision I made was choosing ${name}. Affordable, reliable, and always delivers on time. My go-to choice!" — Ananya Patel, ★★★★★`,
      `"Outstanding service from start to finish. The staff is friendly, knowledgeable, and truly cares about customer satisfaction." — Vikram Singh, ★★★★☆`,
    ],
  }),
  about: (name, category) => ({
    content: `About ${name}\n\nFounded with a passion for excellence, ${name} has been serving the community as a trusted ${category} business. Our journey began with a simple mission: to provide exceptional service that makes a real difference in people's lives.\n\nOur team of experienced professionals brings decades of combined expertise to every project. We believe in building lasting relationships with our clients based on trust, transparency, and consistent results.\n\nAt ${name}, we're not just a business — we're your neighbors, your partners in success, and your dedicated service experts. We invest in the latest technology and continuously train our team to ensure you always receive the best possible experience.\n\nJoin thousands of satisfied customers who have made ${name} their preferred ${category} provider.`,
  }),
  seoKeywords: (_name, category) => ({
    content: `Top SEO keywords for your ${category} business:`,
    items: [
      `best ${category.toLowerCase()} near me`,
      `${category.toLowerCase()} services`,
      `affordable ${category.toLowerCase()}`,
      `professional ${category.toLowerCase()} experts`,
      `top rated ${category.toLowerCase()}`,
      `${category.toLowerCase()} booking online`,
      `emergency ${category.toLowerCase()} service`,
      `local ${category.toLowerCase()} business`,
      `${category.toLowerCase()} specialists`,
      `trusted ${category.toLowerCase()} provider`,
    ],
  }),
  metaTitle: (name, category) => ({
    content: `${name} — Best ${category} Services | Book Online Today`,
  }),
  metaDescription: (name, category) => ({
    content: `Looking for the best ${category} services? ${name} offers professional, affordable, and reliable ${category} solutions. Book your appointment online today and experience the difference. Serving customers with excellence since day one.`,
  }),
  hashtags: (_name, category) => ({
    content: `Popular hashtags for your ${category} business:`,
    items: [
      `#${category.replace(/\s+/g, "")}`,
      `#${category.replace(/\s+/g, "")}Services`,
      `#LocalBusiness`,
      `#SmallBusiness`,
      `#BusinessOwner`,
      `#ProfessionalServices`,
      `#QualityService`,
      `#BookOnline`,
      `#CustomerFirst`,
      `#TrustedExperts`,
    ],
  }),
  blogArticle: (name, category) => ({
    content: `5 Reasons Why ${name} is the Best ${category} Choice in Your Area\n\nWhen it comes to ${category} services, choosing the right provider can make all the difference. Here's why ${name} consistently ranks as the top choice for discerning customers:\n\n1. Unmatched Expertise\nOur team brings years of specialized experience in ${category} services. We've handled everything from routine maintenance to complex custom requirements, always delivering results that exceed expectations.\n\n2. Transparent Pricing\nNo hidden fees, no surprise charges. At ${name}, we believe in complete transparency. You'll always know exactly what you're paying for before any work begins.\n\n3. Cutting-Edge Technology\nWe invest in the latest tools and techniques to ensure you receive the most efficient and effective ${category} solutions available today.\n\n4. Exceptional Customer Service\nOur dedicated support team is available to address your questions and concerns. We're not satisfied until you are.\n\n5. Proven Track Record\nWith hundreds of satisfied customers and glowing reviews, our results speak for themselves. Join the ${name} family today and experience the difference quality makes.`,
  }),
};

router.post("/ai/generate", async (req, res): Promise<void> => {
  const parsed = GenerateContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { type, businessName, category, context } = parsed.data;

  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const generator = AI_CONTENT[type];
  if (!generator) {
    res.status(400).json({ error: "Unknown content type" });
    return;
  }

  const result = generator(businessName, category, context ?? undefined);
  res.json(GenerateContentResponse.parse({ type, ...result }));
});

export default router;
