# Gemma

Job application form built with Next.js, Tailwind CSS, and Supabase.

The form collects a full name, country, Discord username, email, phone number, CV, and a brief description. On submit, the CV is uploaded to the private `resumes` storage bucket, and the text details are inserted into the `applicants` table only after that upload succeeds.

## Setup

1. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
2. In the Supabase SQL editor, run `supabase/schema.sql`.
3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
