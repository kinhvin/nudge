import Link from "next/link";

const highlights = [
  {
    value: "15m window",
    label: "Due-time matching",
    detail: "Checks reminders around each fire time without running a persistent server.",
  },
  {
    value: "1 command",
    label: "Mark done",
    detail: "Reply with your done command in Discord to log completion for today.",
  },
  {
    value: "0 idle cost",
    label: "Runtime model",
    detail: "GitHub Actions + Go + Postgres keeps infrastructure light and predictable.",
  },
];

const steps = [
  {
    title: "Define your habit rules",
    copy: "Set active days and one or more fire times. nudge evaluates due reminders on each run.",
  },
  {
    title: "Hourly runner checks due habits",
    copy: "A scheduled GitHub Actions job starts the Go binary and queries reminders that are currently due.",
  },
  {
    title: "Reminder lands in Discord",
    copy: "The webhook message is sent directly to the user with the habit name and a clear call to action.",
  },
  {
    title: "Completion history stays clean",
    copy: "A unique daily completion record prevents duplicate marks and gives you a reliable day-by-day log.",
  },
];

const featureCards = [
  {
    title: "Multi-time reminders",
    text: "Give each habit multiple fire times per day and keep weekly schedule control.",
  },
  {
    title: "Discord-first workflow",
    text: "Users stay in the app they already use and still close the loop quickly.",
  },
  {
    title: "Completion guardrails",
    text: "Database uniqueness constraints prevent double-marking and keep data trustworthy.",
  },
  {
    title: "Operational simplicity",
    text: "Stateless Go runner means no long-lived worker fleet and fewer moving parts.",
  },
  {
    title: "Human-readable logs",
    text: "The runtime flow can be inspected from cron trigger through notification delivery.",
  },
  {
    title: "Ready for expansion",
    text: "Current model supports adding channels and richer analytics without changing core flow.",
  },
];

const stack = [
  {
    title: "GitHub Actions",
    subtitle: "Scheduled execution",
    note: "Runs hourly with an optional manual trigger for quick validation.",
  },
  {
    title: "Go Binary",
    subtitle: "Reminder selection",
    note: "Queries active reminders, checks completion status, and dispatches notifications.",
  },
  {
    title: "Postgres (Supabase)",
    subtitle: "Source of truth",
    note: "Stores reminders, users, and unique daily completions for accuracy.",
  },
  {
    title: "Discord Webhook",
    subtitle: "User delivery",
    note: "Sends direct, actionable messages that map to each due habit.",
  },
];

const heatmapColumns = [
  [3, 2, 3, 1, 0, 2, 3],
  [2, 2, 1, 0, 2, 2, 3],
  [3, 3, 2, 1, 2, 1, 2],
  [1, 2, 2, 3, 1, 0, 2],
  [2, 1, 3, 2, 2, 1, 3],
  [0, 2, 2, 1, 3, 2, 2],
  [2, 3, 3, 2, 1, 2, 3],
  [3, 2, 2, 1, 2, 3, 1],
  [2, 1, 0, 2, 3, 2, 2],
  [3, 2, 1, 2, 2, 3, 3],
];

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function heatColor(level: number) {
  if (level === 0) return "var(--color-bg-soft)";
  if (level === 1) return "rgba(47, 191, 74, 0.35)";
  if (level === 2) return "rgba(47, 191, 74, 0.65)";
  return "var(--color-brand)";
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <header className="sticky top-0 z-20 border-b border-[var(--color-line)] bg-[rgba(245,243,238,0.85)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="#home" className="font-mono text-sm font-semibold tracking-wide text-[var(--color-ink)]">
            nudge_
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[var(--color-ink-soft)] md:flex">
            <Link href="#how-it-works" className="hover:text-[var(--color-ink)]">
              how it works
            </Link>
            <Link href="#features" className="hover:text-[var(--color-ink)]">
              features
            </Link>
            <Link href="#architecture" className="hover:text-[var(--color-ink)]">
              architecture
            </Link>
          </nav>
          <a
            href="https://github.com/kinhvin/nudge"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--color-ink)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)]"
          >
            view repo
          </a>
        </div>
      </header>

      <section id="home" className="scroll-mt-28 px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <p className="inline-flex items-center rounded-full border border-[var(--color-card-line)] bg-[var(--color-surface)] px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
              Discord-first habit reminders
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
              Consistency that leaves a paper trail.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-ink-soft)] sm:text-xl">
              nudge pings you when habits are due, tracks completions per day, and keeps the runtime model simple
              enough to trust in production.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/kinhvin/nudge"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0d160f] hover:bg-[var(--color-brand-deep)] hover:text-[#f5fef7]"
              >
                Build from source
              </a>
              <Link
                href="#how-it-works"
                className="rounded-full border border-[var(--color-card-line)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              >
                Explore flow
              </Link>
            </div>
          </div>

          <aside className="card-surface rounded-3xl p-6 sm:p-7">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--color-line)] pb-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
                runtime sample
              </h2>
              <span className="font-mono text-xs text-[var(--color-brand-deep)]">08:00 run</span>
            </div>
            <pre className="overflow-auto rounded-2xl border border-[var(--color-line)] bg-[#10150f] p-4 font-mono text-[11px] leading-6 text-[#d8e5d9] sm:text-xs">
              <code>{`[08:00:01] cron fired
[08:00:03] querying due reminders
[08:00:03] found 2 reminders
[08:00:04] discord webhook -> morning workout
[08:08:47] completion logged (user: kinhvin)
[08:08:47] done for today`}</code>
            </pre>
            <p className="mt-4 text-sm leading-6 text-[var(--color-ink-soft)]">
              End-to-end behavior is intentionally readable: schedule, selection, delivery, completion.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-divider px-5 py-10 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="card-surface rounded-2xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section-divider scroll-mt-28 px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)]">How It Works</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Tight feedback loop, small operational surface.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <article key={step.title} className="card-surface rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ink)] font-mono text-xs font-semibold text-[var(--color-surface)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">{step.title}</h3>
                </div>
                <p className="text-sm leading-7 text-[var(--color-ink-soft)]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-divider scroll-mt-28 px-5 py-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)]">Completion View</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              See behavior over weeks, not just today.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-ink-soft)]">
              This heatmap-style summary makes streak quality visible. Bright cells mean faster completion, muted cells
              show slower response, and empty cells reveal misses.
            </p>
            <div className="mt-8 card-surface inline-flex items-center gap-4 rounded-2xl px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">Legend</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((level) => (
                  <span
                    key={level}
                    className="h-3 w-3 rounded-[3px] border border-black/5"
                    style={{ background: heatColor(level) }}
                    aria-hidden
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-ink-soft)]">missed to fast completion</span>
            </div>
          </div>

          <div className="card-surface rounded-3xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">Habit: Morning Workout</p>
              <p className="font-mono text-xs text-[var(--color-brand-deep)]">10 weeks</p>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div className="flex flex-col justify-between py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
                {dayLabels.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {heatmapColumns.map((col, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    {col.map((value, i) => (
                      <span
                        key={i}
                        className="h-4 w-4 rounded-[4px] border border-black/5"
                        style={{ background: heatColor(value) }}
                        aria-label={`Week ${index + 1}, ${dayLabels[i]} level ${value}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => (
            <article key={feature.title} className="card-surface rounded-2xl p-6">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="architecture" className="section-divider scroll-mt-28 px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)]">Architecture</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Built for clarity before scale.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stack.map((item) => (
              <article key={item.title} className="card-surface rounded-2xl p-5">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-brand-deep)]">{item.subtitle}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">{item.note}</p>
              </article>
            ))}
          </div>

          <div className="card-surface mt-8 rounded-2xl p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">Core Query</p>
            <pre className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[#f1efe7] p-4 font-mono text-xs leading-6 text-[#222723]">
              <code>{`SELECT r.id, r.title, r.user_id, u.discord_id
FROM reminders r
JOIN users u ON u.id = r.user_id
WHERE r.active = true
  AND $1 = ANY(r.days_of_week)
  AND EXISTS (
    SELECT 1 FROM unnest(r.fire_times) AS ft
    WHERE ft BETWEEN NOW()::time - interval '15 minutes'
                AND NOW()::time + interval '15 minutes'
  );`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section id="signup" className="section-divider px-5 py-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-[var(--color-card-line)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-soft)] lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)]">Build Your Frontend Next</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              This gives you a landing base you can evolve into app screens.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-ink-soft)]">
              From here, next UI steps are auth pages, reminder CRUD forms, and a real completion dashboard wired to your backend APIs.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/kinhvin/nudge"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-surface)] hover:bg-black"
            >
              open github project
            </a>
            <Link
              href="#home"
              className="rounded-full border border-[var(--color-card-line)] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)] hover:border-[var(--color-ink)]"
            >
              back to top
            </Link>
          </div>
        </div>
      </section>

      <footer className="section-divider px-5 py-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 text-sm text-[var(--color-ink-soft)] sm:flex-row sm:items-center">
          <p>nudge_ frontend concept</p>
          <p className="font-mono text-xs">Next.js + Tailwind v4</p>
        </div>
      </footer>
    </main>
  );
}
