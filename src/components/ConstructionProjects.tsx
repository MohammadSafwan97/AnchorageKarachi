import { useState } from 'react';
import { Search, Plus, MapPin, Users, Calendar } from 'lucide-react';

/* ---------------- DATA ---------------- */

const mockProjects = [
  {
    id: 'AK-PROJ-001',
    name: 'Anchorage Karachi – Main Gate',
    location: 'Anchorage Karachi',
    progress: 100,
    status: 'Completed',
    teamSize: 28,
    startDate: '2023-02-01',
    endDate: '2024-09-30',
  },
  {
    id: 'AK-PROJ-002',
    name: 'Anchorage Karachi – Main Boulevard',
    location: 'Anchorage Karachi',
    progress: 58,
    status: 'Ongoing',
    teamSize: 40,
    startDate: '2024-01-10',
    endDate: '2025-05-31',
  },

 
];

/* ---------------- COMPONENT ---------------- */

export function ConstructionProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' || project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-900 mb-2 text-xl font-semibold">
            Construction Projects
          </h1>
          <p className="text-slate-600">
            Monitor and manage all construction projects
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project name, location, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-900"
          >
            <option>All</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-slate-900 font-medium mb-1">
                  {project.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.teamSize} members
                  </span>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  project.status === 'Completed'
                    ? 'bg-teal-50 text-teal-700'
                    : project.status === 'Ongoing'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Progress</span>
                <span className="text-slate-900">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-900 to-teal-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Start: {project.startDate}
              </span>
              {project.endDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  End: {project.endDate}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 text-sm">
                View Details
              </button>
              <button className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm">
                Edit Project
              </button>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Project ID: {project.id}
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal (unchanged UI) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b">
              <h2 className="text-slate-900 font-medium">Create New Project</h2>
            </div>
            <div className="p-6 space-y-4">
              <input
                placeholder="Project Name"
                className="w-full px-4 py-3 border rounded-lg text-slate-900"
              />
              <textarea
                placeholder="Project Description"
                rows={4}
                className="w-full px-4 py-3 border rounded-lg text-slate-900"
              />
            </div>
            <div className="p-6 border-t flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border rounded-lg text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
