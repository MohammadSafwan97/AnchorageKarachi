import { useState } from 'react';
import { Search, Upload, Eye, Download, Filter, Calendar, Shield } from 'lucide-react';

interface Certificate {
  id: string;
  certificateNumber: string;
  relatedCase: string;
  type: 'NDC' | 'NOC';
  issueDate: string;
  status: 'Active' | 'Expired' | 'Revoked';
  applicantName: string;
}

const mockCertificates: Certificate[] = [
  { id: '1', certificateNumber: 'NDC-2024-0045', relatedCase: 'TC-2024-1244', type: 'NDC', issueDate: '2024-12-18', status: 'Active', applicantName: 'Muhammad Raza' },
  { id: '2', certificateNumber: 'NOC-2024-0089', relatedCase: 'TC-2024-1243', type: 'NOC', issueDate: '2024-12-05', status: 'Active', applicantName: 'Ayesha Siddiqui' },
  { id: '3', certificateNumber: 'NDC-2024-0044', relatedCase: 'TC-2024-1238', type: 'NDC', issueDate: '2024-12-01', status: 'Active', applicantName: 'Kamran Sheikh' },
  { id: '4', certificateNumber: 'NOC-2024-0088', relatedCase: 'TC-2024-1235', type: 'NOC', issueDate: '2024-11-28', status: 'Active', applicantName: 'Nadia Hussain' },
  { id: '5', certificateNumber: 'NDC-2024-0043', relatedCase: 'TC-2024-1230', type: 'NDC', issueDate: '2024-11-15', status: 'Expired', applicantName: 'Tariq Mahmood' },
  { id: '6', certificateNumber: 'NOC-2024-0087', relatedCase: 'TC-2024-1228', type: 'NOC', issueDate: '2024-11-10', status: 'Revoked', applicantName: 'Sadia Iqbal' },
];

export function NDCNOCRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.relatedCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || cert.type === filterType;
    const matchesStatus = filterStatus === 'All' || cert.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-slate-900 mb-2">NDC / NOC Records</h1>
          <p className="text-slate-600">No Dues Certificate and No Objection Certificate management</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all">
          <Upload className="w-5 h-5" />
          Upload Certificate
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
                placeholder="Search by Certificate Number, Case ID, or Applicant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Types</option>
              <option>NDC</option>
              <option>NOC</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                cert.type === 'NDC' 
                  ? 'bg-gradient-to-br from-purple-100 to-purple-200' 
                  : 'bg-gradient-to-br from-emerald-100 to-emerald-200'
              }`}>
                <Shield className={`w-6 h-6 ${
                  cert.type === 'NDC' ? 'text-purple-700' : 'text-emerald-700'
                }`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                cert.type === 'NDC' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'bg-emerald-50 text-emerald-700'
              }`}>
                {cert.type}
              </span>
            </div>

            <h3 className="text-slate-900 mb-1">{cert.certificateNumber}</h3>
            <p className="text-sm text-slate-600 mb-4">{cert.applicantName}</p>

            <div className="space-y-2 mb-4">
              <div className="text-sm text-slate-600">
                <span className="text-slate-500">Related Case:</span> {cert.relatedCase}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                {cert.issueDate}
              </div>
              <div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs ${
                  cert.status === 'Active' ? 'bg-teal-50 text-teal-700' :
                  cert.status === 'Expired' ? 'bg-amber-50 text-amber-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {cert.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
