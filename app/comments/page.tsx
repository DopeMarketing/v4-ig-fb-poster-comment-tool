'use client'

import { useState } from 'react'

export default function CommentsPage() {
  const [filter, setFilter] = useState('all')
  const [selectedComments, setSelectedComments] = useState<string[]>([])

  // TODO: Fetch comments data from Supabase with real-time subscriptions
  // TODO: Implement sentiment analysis filtering
  // TODO: Add bulk response functionality

  const mockComments = [
    {
      id: '1',
      platform: 'instagram',
      author: 'user123',
      content: 'Love this product! When will it be available?',
      sentiment: 'positive',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      platform: 'facebook',
      author: 'customer456',
      content: 'Terrible customer service, very disappointed',
      sentiment: 'negative',
      timestamp: '4 hours ago',
      status: 'urgent'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Comment Management</h1>
            <p className="text-gray-600">Monitor and respond to comments across your social accounts</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Bulk Actions
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="all">All Platforms</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">All Sentiments</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="responded">Responded</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Feed */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Comments ({mockComments.length})</h3>
                  <div className="flex space-x-2">
                    <button className="text-sm text-gray-600 hover:text-gray-900">Mark as Read</button>
                    <button className="text-sm text-gray-600 hover:text-gray-900">Auto-Respond</button>
                  </div>
                </div>
              </div>
              <div className="divide-y">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedComments.includes(comment.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedComments([...selectedComments, comment.id])
                            } else {
                              setSelectedComments(selectedComments.filter(id => id !== comment.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              comment.platform === 'instagram' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {comment.platform}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              comment.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                              comment.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {comment.sentiment}
                            </span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">@{comment.author}</p>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Respond
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}