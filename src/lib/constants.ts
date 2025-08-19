import type { Task } from "../types/task";
export const TASKS: Task[] = [
  // FOUNDATION
  {
    id: "foundation-scratchpad",
    title: "Write down 3 problems you care about",
    category: "Foundation",
  },
  {
    id: "foundation-validate",
    title: "Talk to 5–10 people who feel that pain",
    category: "Foundation",
  },
  {
    id: "foundation-icp",
    title: "Write a quick description of your ideal user (ICP)",
    category: "Foundation",
  },
  {
    id: "foundation-positioning",
    title: "Write 1–2 lines explaining what your product does and why",
    category: "Foundation",
  },

  //   BUILD
  {
    id: "product-mvp",
    title: "Build just enough to solve one real problem (MVP)",
    category: "Build",
  },
  {
    id: "product-onboarding",
    title: "Add a simple onboarding flow (1–2 steps is fine)",
    category: "Build",
  },
  {
    id: "product-empty-errors",
    title: "Handle empty states, errors, and loading screens",
    category: "Build",
  },
  {
    id: "payments-stripe",
    title: "Set up Stripe",
    category: "Build",
  },
  {
    id: "legal-pages",
    title: "Add Privacy Policy and Terms (you need these)",
    category: "Build",
  },
  {
    id: "tech-hosting",
    title: "Deploy your app",
    category: "Build",
  },
  {
    id: "tech-analytics",
    title: "Set up basic product analytics",
    category: "Build",
  },

  // LAUNCH
  {
    id: "launch-waitlist",
    title: "Ask the early users you talked to to try it with a free trial",
    category: "Launch",
  },
  {
    id: "post-feedback",
    title: "Collect feedback (email, DMs, calls)",
    category: "Post-Launch",
  },
  {
    id: "post-tweaks",
    title: "Fix obvious issues and ship a few improvements",
    category: "Post-Launch",
  },

  // Step 7: Public launch
  {
    id: "launch-announce",
    title: "Post your launch on Twitter/X and indie communities",
    category: "Launch",
  },
  {
    id: "launch-directory",
    title: "List your product on directories",
    category: "Launch",
  },

  // POST LAUNCH
  {
    id: "post-testimonials",
    title: "Ask happy users for short testimonials",
    category: "Post-Launch",
  },
  {
    id: "post-roadmap",
    title: "Share what's coming next",
    category: "Post-Launch",
  },
  {
    id: "post-referrals",
    title: "Add a basic invite or referral system (optional)",
    category: "Post-Launch",
  },
];

export const STORAGE_KEY = "shiplist:v1";
