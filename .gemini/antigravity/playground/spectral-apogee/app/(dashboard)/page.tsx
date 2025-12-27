/**
 * Dashboard Page
 * 
 * Main dashboard with KPI widgets and overview.
 * Will be implemented in Phase 7.
 */

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold">Welcome to GearGuard</h2>
                <p className="mt-1 text-blue-100">
                    Your maintenance management dashboard
                </p>
            </div>

            {/* Placeholder KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Critical Equipment */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                        Critical Equipment
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-red-700 dark:text-red-300">
                        5 Units
                    </p>
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        Health &lt; 30%
                    </p>
                </div>

                {/* Technician Load */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Technician Load
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-blue-700 dark:text-blue-300">
                        85% Utilized
                    </p>
                    <p className="mt-1 text-sm text-blue-500 dark:text-blue-400">
                        Assign Carefully
                    </p>
                </div>

                {/* Open Requests */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        Open Requests
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-amber-700 dark:text-amber-300">
                        12 Pending
                    </p>
                    <p className="mt-1 text-sm text-amber-500 dark:text-amber-400">
                        3 Overdue
                    </p>
                </div>
            </div>

            {/* Placeholder Content */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Dashboard widgets will be implemented in Phase 7.
                </p>
            </div>
        </div>
    );
}

