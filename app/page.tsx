export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Manage Instagram & Facebook Comments Like a Pro
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            AI-powered comment management, sentiment analysis, and automated responses for your social media accounts.
          </p>
          <div className="space-x-4">
            <a href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Start Free Trial
            </a>
            <a href="/features" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Responses</h3>
              <p className="text-gray-600">Generate smart replies automatically based on comment context and sentiment.</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sentiment Analysis</h3>
              <p className="text-gray-600">Identify negative feedback instantly and prioritize your responses.</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Brand Monitoring</h3>
              <p className="text-gray-600">Track mentions and hashtags across Instagram and Facebook.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">$29<span className="text-lg text-gray-600">/month</span></p>
              <ul className="text-left space-y-2 mb-8">
                <li>✓ 2 Social Accounts</li>
                <li>✓ 1,000 Comments/month</li>
                <li>✓ Basic Analytics</li>
              </ul>
              <a href="/signup" className="block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Get Started</a>
            </div>
            <div className="bg-white p-8 rounded-lg border border-blue-500">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">$99<span className="text-lg text-gray-600">/month</span></p>
              <ul className="text-left space-y-2 mb-8">
                <li>✓ 10 Social Accounts</li>
                <li>✓ Unlimited Comments</li>
                <li>✓ Advanced Analytics</li>
                <li>✓ Slack Integration</li>
              </ul>
              <a href="/signup" className="block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media Management?</h2>
          <p className="text-xl mb-8">Join thousands of businesses using our platform to engage better with their audience.</p>
          <a href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Start Your Free Trial
          </a>
        </div>
      </section>
    </div>
  )
}