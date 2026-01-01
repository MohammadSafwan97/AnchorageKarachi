import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, FileText, Users, Construction } from 'lucide-react';

const transferCaseTrends = [
  { month: 'Jul', cases: 18 },
  { month: 'Aug', cases: 22 },
  { month: 'Sep', cases: 28 },
  { month: 'Oct', cases: 25 },
  { month: 'Nov', cases: 32 },
  { month: 'Dec', cases: 38 },
];

const palPaoConversion = [
  { month: 'Jul', PAL: 12, PAO: 8 },
  { month: 'Aug', PAL: 15, PAO: 11 },
  { month: 'Sep', PAL: 18, PAO: 13 },
  { month: 'Oct', PAL: 16, PAO: 12 },
  { month: 'Nov', PAL: 21, PAO: 15 },
  { month: 'Dec', PAL: 24, PAO: 18 },
];

const locationDistribution = [
  { name: 'Gwadar', value: 42, color: '#0f766e' },
  { name: 'Karachi', value: 38, color: '#1e40af' },
  { name: 'Islamabad', value: 20, color: '#7c3aed' },
];

const attendanceData = [
  { month: 'Jul', rate: 92 },
  { month: 'Aug', rate: 89 },
  { month: 'Sep', rate: 94 },
  { month: 'Oct', rate: 91 },
  { month: 'Nov', rate: 88 },
  { month: 'Dec', rate: 87.5 },
];

export function Reports() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600">Visual insights and data analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-slate-600 text-sm mb-1">Total Cases (2024)</div>
          <div className="text-slate-900">248</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-slate-600 text-sm mb-1">PAL to PAO Conversion</div>
          <div className="text-slate-900">75%</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-slate-600 text-sm mb-1">Avg. Attendance Rate</div>
          <div className="text-slate-900">90.3%</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Construction className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-slate-600 text-sm mb-1">Projects Completed</div>
          <div className="text-slate-900">12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Transfer Case Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-slate-900 mb-6">Transfer Case Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transferCaseTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#0f766e"
                strokeWidth={3}
                dot={{ fill: '#0f766e', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PAL to PAO Conversion */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-slate-900 mb-6">PAL  Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={palPaoConversion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="PAL" fill="#0f766e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="PAO" fill="#1e40af" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-slate-900 mb-6">Cases by Location</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {locationDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {locationDistribution.map((location) => (
              <div key={location.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: location.color }} />
                <span className="text-sm text-slate-600">{location.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-slate-900 mb-6">Employee Attendance Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ fill: '#7c3aed', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-slate-900 mb-4">Export Reports</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all">
            Export All Data (PDF)
          </button>
          <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Export Transfer Cases (Excel)
          </button>
          <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Export Attendance (Excel)
          </button>
          <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Export Projects (Excel)
          </button>
        </div>
      </div>
    </div>
  );
}
