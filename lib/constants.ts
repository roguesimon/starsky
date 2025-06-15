export const DEVICE_PRESETS: DevicePreview[] = [
  { type: 'desktop', width: 1920, height: 1080, name: 'Desktop' },
  { type: 'desktop', width: 1440, height: 900, name: 'Laptop' },
  { type: 'tablet', width: 768, height: 1024, name: 'iPad' },
  { type: 'tablet', width: 834, height: 1194, name: 'iPad Pro' },
  { type: 'mobile', width: 375, height: 667, name: 'iPhone SE' },
  { type: 'mobile', width: 390, height: 844, name: 'iPhone 12' },
  { type: 'mobile', width: 414, height: 896, name: 'iPhone 11 Pro Max' },
];

export const TEMPLATE_CATEGORIES = [
  { id: 'landing', name: 'Landing Pages', icon: 'Globe' },
  { id: 'blog', name: 'Blogs', icon: 'BookOpen' },
  { id: 'saas', name: 'SaaS Apps', icon: 'Zap' },
  { id: 'dashboard', name: 'Dashboards', icon: 'BarChart3' },
  { id: 'component', name: 'Components', icon: 'Puzzle' },
];

export const SAMPLE_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Modern Landing Page',
    description: 'Clean, modern landing page with hero section, features, and CTA',
    category: 'landing',
    preview_image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
  <div class="min-h-screen">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Brand</h1>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" class="text-gray-600 hover:text-gray-900">Pricing</a>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Build Amazing Products
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create beautiful, responsive websites with our modern tools and templates.
        </p>
        <button class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
          Start Building
        </button>
      </div>
    </main>
  </div>
</body>
</html>`,
    tags: ['hero', 'navigation', 'cta'],
    is_premium: false,
  },
  {
    id: '2',
    name: 'SaaS Dashboard',
    description: 'Complete dashboard with sidebar, charts, and data tables',
    category: 'dashboard',
    preview_image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
  <div class="flex h-screen">
    <div class="w-64 bg-white shadow-sm">
      <div class="p-6">
        <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <nav class="mt-6">
        <a href="#" class="block px-6 py-3 text-gray-700 bg-gray-100">Overview</a>
        <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Analytics</a>
        <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Users</a>
        <a href="#" class="block px-6 py-3 text-gray-600 hover:bg-gray-50">Settings</a>
      </nav>
    </div>
    
    <div class="flex-1 p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
          <p class="text-3xl font-bold text-gray-900">12,345</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-sm font-medium text-gray-500">Revenue</h3>
          <p class="text-3xl font-bold text-gray-900">$45,678</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-sm font-medium text-gray-500">Growth</h3>
          <p class="text-3xl font-bold text-green-600">+12.5%</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    tags: ['dashboard', 'sidebar', 'charts', 'analytics'],
    is_premium: true,
  },
];