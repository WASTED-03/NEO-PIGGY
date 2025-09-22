export default function Home() {
  return (
    <div className="min-h-screen p-0">
      {/* Start building here */}
      <section className="relative overflow-hidden rounded-3xl glass">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10" />
        <div className="px-8 py-14 md:px-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
              Take control of your money, effortlessly.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300/90">
              A modernized PiggyMetrics: track accounts, manage budgets, analyze spending,
              and never miss a bill with smart notifications.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="/accounts" className="btn btn-primary">Open Dashboard</a>
              <a href="/statistics" className="btn btn-outline">View Analytics</a>
            </div>
          </div>
        </div>
        <div className="px-8 pb-10 md:px-14">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-sm uppercase tracking-wider text-gray-500">Accounts</div>
              <div className="mt-2 text-2xl font-semibold">All finances in one place</div>
              <p className="mt-3 text-gray-600 dark:text-gray-300/80">
                Create accounts, add transactions, and set savings goals.
              </p>
            </div>
            <div className="card">
              <div className="text-sm uppercase tracking-wider text-gray-500">Statistics</div>
              <div className="mt-2 text-2xl font-semibold">Insights that matter</div>
              <p className="mt-3 text-gray-600 dark:text-gray-300/80">
                Charts and summaries to understand your spending and income.
              </p>
            </div>
            <div className="card">
              <div className="text-sm uppercase tracking-wider text-gray-500">Notifications</div>
              <div className="mt-2 text-2xl font-semibold">Never miss a beat</div>
              <p className="mt-3 text-gray-600 dark:text-gray-300/80">
                Email reminders for bills, goals, and unusual activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold">Quick Add</h3>
          <form className="mt-4 grid gap-3">
            <label className="label">Amount</label>
            <input className="input" placeholder="0.00" />
            <label className="label">Category</label>
            <input className="input" placeholder="Groceries, Rent, Salary..." />
            <div className="flex gap-3">
              <button type="button" className="btn btn-primary">Add Expense</button>
              <button type="button" className="btn btn-outline">Add Income</button>
            </div>
          </form>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Goals</h3>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center justify-between">
              <span>Emergency Fund</span>
              <span className="text-sm text-gray-500">45% funded</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Vacation</span>
              <span className="text-sm text-gray-500">20% funded</span>
            </li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center justify-between">
              <span>Rent due</span>
              <span className="text-sm text-warning-600">5 days</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Internet bill</span>
              <span className="text-sm">12 days</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
