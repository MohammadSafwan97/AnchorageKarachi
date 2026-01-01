import { User, Lock, Bell, Shield, Database, Users } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage system preferences and user permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-900 rounded-lg">
                <User className="w-5 h-5" />
                <span>Profile Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
                <span>User Roles</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Lock className="w-5 h-5" />
                <span>Security</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Database className="w-5 h-5" />
                <span>Data Management</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Shield className="w-5 h-5" />
                <span>Access Control</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@anchorage.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+92 300 1234567"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* User Role Management */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">User Role Management</h2>
            <div className="space-y-4">
              {['Administrator', 'Property Manager', 'Legal Officer', 'HR Manager', 'Finance Officer', 'Construction Manager'].map((role) => (
                <div key={role} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="text-slate-900">{role}</div>
                    <div className="text-sm text-slate-500">Full access to all modules</div>
                  </div>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm">
                    Edit Permissions
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'Email notifications for new transfer cases', checked: true },
                { label: 'SMS alerts for urgent approvals', checked: true },
                { label: 'Weekly attendance summary reports', checked: true },
                { label: 'Monthly project progress updates', checked: false },
                { label: 'System maintenance notifications', checked: true },
              ].map((pref, index) => (
                <label key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    defaultChecked={pref.checked}
                    className="w-5 h-5 text-blue-900 border-slate-300 rounded focus:ring-2 focus:ring-blue-900"
                  />
                  <span className="text-slate-700">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
