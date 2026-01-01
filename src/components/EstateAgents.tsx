import { useState } from 'react';
import { Search, Plus, Mail, Phone, Building2, MapPin, CheckCircle } from 'lucide-react';

interface EstateAgent {
  id: string;
  name: string;
  licenseNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  officeAddress: string;
  city: string;
  activeCases: number;
  completedCases: number;
  status: 'Active' | 'Suspended' | 'Inactive';
  registrationDate: string;
}

const mockAgents: EstateAgent[] = [
  { id: 'EA-001', name: 'Prime Estate Services', licenseNumber: 'LIC-2020-0156', contactPerson: 'Mr. Rashid Khan', email: 'info@primeestateservices.pk', phone: '+92 321 1234567', officeAddress: 'Plot 45, DHA Phase 6', city: 'Karachi', activeCases: 12, completedCases: 48, status: 'Active', registrationDate: '2020-03-15' },
  { id: 'EA-002', name: 'Trust Property Advisors', licenseNumber: 'LIC-2019-0089', contactPerson: 'Mrs. Sana Arif', email: 'contact@trustproperty.pk', phone: '+92 300 2345678', officeAddress: 'Blue Area, Main Boulevard', city: 'Islamabad', activeCases: 8, completedCases: 62, status: 'Active', registrationDate: '2019-08-20' },
  { id: 'EA-003', name: 'Elite Realty Group', licenseNumber: 'LIC-2021-0234', contactPerson: 'Mr. Ahmed Ali', email: 'info@eliterealty.pk', phone: '+92 333 3456789', officeAddress: 'F-10 Markaz, 3rd Floor', city: 'Islamabad', activeCases: 6, completedCases: 28, status: 'Active', registrationDate: '2021-01-10' },
  { id: 'EA-004', name: 'Navy Housing Associates', licenseNumber: 'LIC-2018-0045', contactPerson: 'Commodore (R) Tariq Mahmood', email: 'navyhousing@associates.pk', phone: '+92 321 4567890', officeAddress: 'Saddar, Naval Complex', city: 'Karachi', activeCases: 15, completedCases: 85, status: 'Active', registrationDate: '2018-06-05' },
  { id: 'EA-005', name: 'Gwadar Properties Ltd', licenseNumber: 'LIC-2022-0312', contactPerson: 'Ms. Ayesha Baloch', email: 'info@gwadarproperties.pk', phone: '+92 300 5678901', officeAddress: 'New Town, Main Road', city: 'Gwadar', activeCases: 4, completedCases: 12, status: 'Active', registrationDate: '2022-04-18' },
  { id: 'EA-006', name: 'Karachi Land Services', licenseNumber: 'LIC-2017-0123', contactPerson: 'Mr. Bilal Hussain', email: 'kls@landservices.pk', phone: '+92 333 6789012', officeAddress: 'Clifton Block 5', city: 'Karachi', activeCases: 0, completedCases: 42, status: 'Suspended', registrationDate: '2017-11-22' },
];

export function EstateAgents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'All' || agent.city === filterCity;
    const matchesStatus = filterStatus === 'All' || agent.status === filterStatus;
    return matchesSearch && matchesCity && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-900 mb-2">Registered Estate Agents</h1>
          <p className="text-slate-600">Manage estate agents working with Anchorage</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Register New Agent
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, license number, or contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Cities</option>
              <option>Karachi</option>
              <option>Islamabad</option>
              <option>Gwadar</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-slate-900 mb-1">{agent.name}</h3>
                  <p className="text-sm text-slate-600">{agent.contactPerson}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                agent.status === 'Active' ? 'bg-teal-50 text-teal-700' :
                agent.status === 'Suspended' ? 'bg-amber-50 text-amber-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">License:</span> {agent.licenseNumber}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{agent.officeAddress}, {agent.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate">{agent.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                {agent.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-xs text-slate-600 mb-1">Active Cases</div>
                <div className="text-blue-900">{agent.activeCases}</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-3">
                <div className="text-xs text-slate-600 mb-1">Completed</div>
                <div className="text-teal-900">{agent.completedCases}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Registered: {agent.registrationDate} • ID: {agent.id}
            </div>

            <button className="w-full mt-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Register New Estate Agent</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">License Number</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Contact Person Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">City</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900">
                    <option>Select City</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                    <option>Gwadar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Office Address</label>
                <textarea rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Registration Date</label>
                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Register Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
