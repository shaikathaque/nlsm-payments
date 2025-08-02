# NLSM Payments

A monorepo for Next Level Academy's payment and athlete management system, featuring a Next.js frontend and Supabase backend with bKash payment integration and automated email notifications.

---

## Features

- **Athlete Payment Portal**: Collects payments via bKash.
- **Automated Emails**: Sends payment receipts and athlete progress reports.
- **Supabase Backend**: Handles data, triggers, and edge functions.
- **Multi-branch Support**: Payments and reports for multiple academy locations.

---

## Project Structure

- `frontend/` – Next.js 14 app (React, Tailwind, shadcn/ui)
- `backend/` – Supabase project (SQL, Edge Functions)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd nlsm-payments
```

### 2. Start Supabase Locally

Install the [Supabase CLI](https://supabase.com/docs/guides/cli) if you haven't already:

```bash
npm install -g supabase
```

Start the local Supabase stack (from the `backend/` directory):

```bash
cd backend
supabase start
```

This will start the local database, API, and Supabase Studio. Follow the CLI output for local URLs and credentials.

### 3. Frontend Setup

In a new terminal, install dependencies and start the frontend:

```bash
cd frontend
yarn install
yarn dev
```

- Add bKash API credentials and Supabase keys to `.env` (see below).
- Visit [http://localhost:3000](http://localhost:3000).

### 4. Deploy Edge Functions (Optional for Local Dev)

If you want to test edge functions locally or after making changes, deploy them:

```bash
cd backend
supabase functions deploy --no-verify-jwt
```

---

## Environment Variables

**Frontend `.env`** (create in `frontend/`):

```
BKASH_USERNAME=...
BKASH_PASSWORD=...
BKASH_APP_KEY=...
BKASH_APP_SECRET_KEY=...
BKASH_API_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Backend Secrets** (set via Supabase CLI or SQL):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (for email sending)

See `backend/README.md` for details on setting secrets.

---

## Useful Commands

- **Start Supabase Locally**:  
  `supabase start`
- **Deploy Edge Functions**:  
  `supabase functions deploy --no-verify-jwt`
- **Set Supabase Secrets**:  
  `supabase secrets set --env-file .env`

---

## License

MIT 


## Common Errors When setting up a new Database

### Need to enable database webhooks 
When creating a new project, need to enable webhooks.

Otherwise, will get the error:
`ERROR: schema "supabase_functions" does not exist (SQLSTATE 3F000)`
