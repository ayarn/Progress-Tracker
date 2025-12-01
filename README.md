# LifeGrid Tracker

A powerful activity tracker web application that lets you monitor multiple projects and habits across months. Track DSA practice, projects, backend work, frontend development, and workouts all in one place with a beautiful, responsive interface.

## Features

- 📊 **Multi-Tracker System**: Track multiple activities simultaneously (DSA, Projects, Backend, Frontend, Workouts)
- 📅 **Month Grid View**: Visual calendar display with beautiful color-coded trackers
- 🔄 **Smooth Carousel Navigation**: Browse months with smooth scrolling and year selection
- 💾 **Supabase Integration**: Persistent data storage in the cloud
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Dark Theme**: Eye-friendly dark UI with Tailwind CSS
- ⬇️ **Export Data**: Download your activity data as CSV
- ⚡ **Real-time Sync**: Instant synchronization across sessions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Date Library**: date-fns
- **UI Icons**: lucide-react

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account (free tier works great)

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayarn/Progress-Tracker.git
cd Progress-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the following SQL in the Supabase SQL editor to create the required table:

```sql
-- Create activity_logs table
create table if not exists public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  tracker_id text not null,
  date date not null,
  created_at timestamptz default now()
);

-- Prevent duplicate entries per tracker + date
create unique index if not exists idx_activity_logs_tracker_date
  on public.activity_logs(tracker_id, date);

-- Enable Row Level Security (development: permissive policies)
alter table public.activity_logs enable row level security;

create policy anon_select on public.activity_logs for select using (true);
create policy anon_insert on public.activity_logs for insert with check (true);
create policy anon_delete on public.activity_logs for delete using (true);
```

4. Get your Supabase credentials from **Project Settings > API**:
   - Copy your **Project URL** (VITE_SUPABASE_URL)
   - Copy your **anon / public key** (VITE_SUPABASE_ANON_KEY)

### 4. Configure environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Security Note**: Never commit `.env` to version control. It's already in `.gitignore`.

### 5. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

1. **Mark an Activity**: Click on today's date cell in any tracker to mark it as complete
2. **Navigate**: Use arrow buttons or the year dropdown to browse different months
3. **View Progress**: See your activity grid at a glance with color-coded trackers
4. **Export Data**: Click "Export Data" in the top-right to download a CSV of all activities
5. **Persistent Storage**: All changes are automatically saved to Supabase

## Project Structure

```
src/
├── App.tsx                 # Main app component
├── index.tsx              # React entry point
├── index.css              # Global styles
├── types.ts               # TypeScript type definitions
├── components/
│   ├── ControlBar.tsx     # Header with logo and export button
│   ├── TrackerRow.tsx     # Individual tracker with carousel
│   └── MonthGrid.tsx      # Month calendar grid display
├── services/
│   ├── supabaseClient.ts  # Supabase client setup
│   └── trackerService.ts  # API calls for fetch/toggle activities
└── utils/
    └── dateUtils.ts       # Date formatting and calculation helpers
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tracker Types

| Tracker  | Color             | Purpose                               |
| -------- | ----------------- | ------------------------------------- |
| DSA      | Orange (#f97316)  | Data Structures & Algorithms practice |
| Project  | Emerald (#10b981) | Project work                          |
| Backend  | Blue (#3b82f6)    | Backend development                   |
| Frontend | Purple (#a855f7)  | Frontend development                  |
| Workout  | Red (#ef4444)     | Physical fitness                      |

## Database Schema

**Table**: `activity_logs`

| Column     | Type        | Description                                                |
| ---------- | ----------- | ---------------------------------------------------------- |
| id         | uuid        | Primary key                                                |
| tracker_id | text        | Type of tracker (dsa, project, backend, frontend, workout) |
| date       | date        | Activity date (YYYY-MM-DD format)                          |
| created_at | timestamptz | Timestamp when record was created                          |

## Troubleshooting

### Supabase not connecting?

- Check that `.env` file exists with correct credentials
- Verify RLS policies are set (see SQL above)
- Check browser console for error messages
- If Supabase is unavailable, the app falls back to LocalStorage

### Data not persisting?

- Open browser DevTools → Network tab and check Supabase API responses
- Verify the `activity_logs` table exists in your Supabase project
- Check that RLS policies allow inserts/deletes

### Port 5173 already in use?

```bash
npm run dev -- --port 3000
```

## Future Enhancements

- [ ] User authentication
- [ ] Custom tracker creation
- [ ] Data visualization charts
- [ ] Weekly/yearly views
- [ ] Activity notes and descriptions
- [ ] Mobile app (React Native)

## License

MIT License - feel free to use this project for personal or commercial use.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ by [ayarn](https://github.com/ayarn)
