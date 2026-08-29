export interface QuickReply {
  label: string;
  answer: string;
  actions?: boolean;
}

export const quickReplies: QuickReply[] = [
  {
    label: "Are you available?",
    answer:
      "Yes — I'm open to remote senior and lead roles across European and African time zones. I reply to every message within a day.",
  },
  {
    label: "What are you looking for?",
    answer:
      "Senior and lead engineering roles where I own the hard problems end to end — encryption, real-time chat, payments, and shipping things that actually reach people.",
  },
  {
    label: "Where are you based?",
    answer: "Kigali, Rwanda (UTC+2). Remote, with solid daily overlap for both Europe and Africa.",
  },
  {
    label: "How do I reach you?",
    answer: "Easiest is email — I'll get back within a day. Or find me here:",
    actions: true,
  },
];

export const WORK_HOURS = { start: 8, end: 20 };
export const PARTICLE_WORDS = ["LET'S", "TALK"];

export const CONTACT = {
  email: "ashganwiki@gmail.com",
  github: "https://github.com/ashggan",
  githubLabel: "GitHub",
  linkedin: "https://www.linkedin.com/in/ashgan-mustafa/",
};
