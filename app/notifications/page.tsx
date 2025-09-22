"use client";

import { useState } from "react";

type NotificationPref = {
  id: string;
  label: string;
  enabled: boolean;
  schedule: string;
};

export default function NotificationsPage(): JSX.Element {
  const [prefs, setPrefs] = useState<NotificationPref[]>([
    { id: "1", label: "Bill reminders", enabled: true, schedule: "Weekly" },
    { id: "2", label: "Savings goal updates", enabled: true, schedule: "Monthly" },
    { id: "3", label: "Unusual activity alerts", enabled: false, schedule: "Instant" },
  ]);

  const toggle = (id: string): void =>
    setPrefs((ps) => ps.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <div className="mt-4 divide-y divide-gray-200/70 dark:divide-gray-800">
          {prefs.map((p) => (
            <div key={p.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">{p.label}</div>
                <div className="text-sm text-gray-500">Schedule: {p.schedule}</div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="input w-36"
                  value={p.schedule}
                  onChange={(e) =>
                    setPrefs((ps) =>
                      ps.map((x) => (x.id === p.id ? { ...x, schedule: e.target.value } : x))
                    )
                  }
                >
                  <option>Instant</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <button
                  className={p.enabled ? "btn btn-primary" : "btn btn-outline"}
                  onClick={() => toggle(p.id)}
                >
                  {p.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Email Preview</h2>
        <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-500">
            From: PiggyMetrics • Subject: Your weekly financial summary
          </div>
          <div className="px-5 py-6">
            <p className="mb-2">Hi Jane,</p>
            <p className="mb-2">
              Here's your weekly summary: expenses $2,150, income $4,700. You're on track to hit your
              Emergency Fund goal by June. Keep it up!
            </p>
            <p className="mt-6 text-sm text-gray-500">You can manage your preferences in Settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
