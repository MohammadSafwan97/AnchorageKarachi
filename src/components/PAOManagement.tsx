import { useState } from 'react';
import { Search, Plus, Eye, Filter, MapPin, Calendar, FileSpreadsheet } from 'lucide-react';

interface PAO {
  id: string;
  paoNumber: string;
  caseId: string;
  relatedPAL: string;
  propertyLocation: string;
  issueDate: string;
  status: 'Issued' | 'Finalized' | 'Cancelled';
  applicantName: string;
}

const mockPAOs: PAO[] = [
  { id: '1', paoNumber: 'PAO-2024-0089', caseId: 'TC-2024-1245', relatedPAL: 'PAL-2024-0155', propertyLocation: 'Karachi', issueDate: '2024-12-20', status: 'Issued', applicantName: 'Sara Malik' },
  { id: '2', paoNumber: 'PAO-2024-0088', caseId: 'TC-2024-1241', relatedPAL: 'PAL-2024-0153', propertyLocation: 'Gwadar', issueDate: '2024-12-18', status: 'Finalized', applicantName: 'Hina Tariq' },
  { id: '3', paoNumber: 'PAO-2024-0087', caseId: 'TC-2024-1238', relatedPAL: 'PAL-2024-0150', propertyLocation: 'Islamabad', issueDate: '2024-12-12', status: 'Issued', applicantName: 'Kamran Sheikh' },
  { id: '4', paoNumber: 'PAO-2024-0086', caseId: 'TC-2024-1235', relatedPAL: 'PAL-2024-0148', propertyLocation: 'Karachi', issueDate: '2024-12-08', status: 'Finalized', applicantName: 'Nadia Hussain' },
  { id: '5', paoNumber: 'PAO-2024-0085', caseId: 'TC-2024-1232', relatedPAL: 'PAL-2024-0145', propertyLocation: 'Gwadar', issueDate: '2024-11-30', status: 'Cancelled', applicantName: 'Faisal Ahmed' },
];

export function PAOManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewPAOModal, setShowNewPAOModal] = useState(false);

  const filteredPAOs = mockPAOs.filter(pao => {
    const matchesSearch = pao.paoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pao.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pao.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'All' || pao.propertyLocation === filterLocation;
    const matchesStatus = filterStatus === 'All' || pao.status === filterStatus;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-900 mb-2">PAO Management</h1>
          <p className="text-slate-600">Provisional Allotment Orders tracking and management</p>
        </div>
        <button
          onClick={() => setShowNewPAOModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Issue New PAO
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
                placeholder="Search by PAO Number, Case ID, or Applicant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-500" />
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Locations</option>
              <option>Gwadar</option>
              <option>Karachi</option>
              <option>Islamabad</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Status</option>
              <option>Issued</option>
              <option>Finalized</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* PAO Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-slate-700">PAO Number</th>
              <th className="px-6 py-4 text-left text-slate-700">Related Case ID</th>
              <th className="px-6 py-4 text-left text-slate-700">Associated PAL</th>
              <th className="px-6 py-4 text-left text-slate-700">Applicant Name</th>
              <th className="px-6 py-4 text-left text-slate-700">Property Location</th>
              <th className="px-6 py-4 text-left text-slate-700">Issue Date</th>
              <th className="px-6 py-4 text-left text-slate-700">Status</th>
              <th className="px-6 py-4 text-left text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPAOs.map((pao) => (
              <tr key={pao.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                    <span className="text-slate-900">{pao.paoNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">{pao.caseId}</td>
                <td className="px-6 py-4 text-slate-700">{pao.relatedPAL}</td>
                <td className="px-6 py-4 text-slate-700">{pao.applicantName}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {pao.propertyLocation}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {pao.issueDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs ${
                    pao.status === 'Issued' ? 'bg-blue-50 text-blue-700' :
                    pao.status === 'Finalized' ? 'bg-teal-50 text-teal-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {pao.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New PAO Modal */}
      {showNewPAOModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-slate-900">Issue New PAO</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Related Transfer Case</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-slate-900">
                  <option>Select Transfer Case</option>
                  <option>TC-2024-1248 - Ahmed Hassan</option>
                  <option>TC-2024-1247 - Fatima Khan</option>
                  <option>TC-2024-1246 - Imran Ali</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Associated PAL</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900">
                  <option>Select PAL</option>
                  <option>PAL-2024-0156 - Gwadar Property</option>
                  <option>PAL-2024-0155 - Karachi Property</option>
                  <option>PAL-2024-0154 - Islamabad Property</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Property Location</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900">
                    <option>Select Location</option>
                    <option>Gwadar</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Issue Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Approval Notes</label>
                <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="Enter approval notes and conditions..." />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Upload PAO Document</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-900 transition-colors cursor-pointer">
                  <p className="text-slate-600">Click to upload PAO document</p>
                  <p className="text-sm text-slate-500 mt-1">PDF format only</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowNewPAOModal(false)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewPAOModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Issue PAO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
