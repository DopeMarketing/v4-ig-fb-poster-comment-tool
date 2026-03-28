export default function DashboardPage() {
  // TODO: Fetch user metrics, recent comments, and notifications from Supabase
  // TODO: Implement real-time updates for new comments

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your social media engagement and responses</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Responses Sent</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="w-6 h-6 bg-yellow-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-6 h-6 bg-red-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Negative Sentiment</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New comment on Instagram post</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Auto-response sent to Facebook comment</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Negative sentiment detected</p>
                  <p className="text-xs text-gray-500">12 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="/comments" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium">View Comments</p>
              </a>
              <a href="/responses" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium">Manage Templates</p>
              </a>
              <a href="/integrations" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium">Add Account</p>
              </a>
              <a href="/reports" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium">View Reports</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}