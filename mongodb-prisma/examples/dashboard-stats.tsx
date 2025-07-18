import { getProductStats } from "../actions/products"
import { getBlogStats } from "../actions/blog"
import { getInquiryStats } from "../actions/inquiries"
import { getUserStats } from "../actions/users"

export default async function DashboardStats() {
  // Fetch all stats in parallel
  const [productStats, blogStats, inquiryStats, userStats] = await Promise.all([
    getProductStats(),
    getBlogStats(),
    getInquiryStats(),
    getUserStats()
  ])
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Products Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Products</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-medium">{productStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-medium">{productStats.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Featured</span>
              <span className="font-medium">{productStats.featured}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Out of Stock</span>
              <span className="font-medium">{productStats.outOfStock}</span>
            </div>
          </div>
        </div>
        
        {/* Blog Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Blog</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-medium">{blogStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Published</span>
              <span className="font-medium">{blogStats.published}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Drafts</span>
              <span className="font-medium">{blogStats.drafts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Categories</span>
              <span className="font-medium">{blogStats.categories}</span>
            </div>
          </div>
        </div>
        
        {/* Inquiries Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Inquiries</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Inquiries</span>
              <span className="font-medium">{inquiryStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New</span>
              <span className="font-medium text-yellow-600">{inquiryStats.new}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">In Progress</span>
              <span className="font-medium text-blue-600">{inquiryStats.inProgress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-green-600">{inquiryStats.completed}</span>
            </div>
          </div>
        </div>
        
        {/* Users Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Users</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-medium">{userStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admins</span>
              <span className="font-medium">{userStats.admins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Editors</span>
              <span className="font-medium">{userStats.editors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New This Month</span>
              <span className="font-medium">{userStats.newThisMonth}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-medium mb-4">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {productStats.categories.map(category => (
            <div key={category.category} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">{category.category}</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-gray-200 rounded-full flex-1">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ 
                      width: `${Math.round((category.count / productStats.total) * 100)}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inquiry Types */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Inquiry Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inquiryStats.types.map(type => (
            <div key={type.type} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-1">{type.type.replace('_', ' ')}</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 bg-gray-200 rounded-full flex-1">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ 
                      width: `${Math.round((type.count / inquiryStats.total) * 100)}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{type.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}