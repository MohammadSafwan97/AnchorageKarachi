import { useState } from 'react';
import {
  Plus,
  Eye,
  MapPin,
  Calendar,
  FileCheck,
  Search,
  FileText,
} from 'lucide-react';

/* ---------------- MOCK DATA ---------------- */

const initialPALs = [
  {
    id: '1',
    palNumber: 'PAL-2024-0156',
    caseId: 'TC-2024-1248',
    propertyLocation: 'Gwadar',
    issueDate: '2024-12-15',
    status: 'Issued',
    applicantName: 'Ahmed Hassan',
  },
  {
    id: '2',
    palNumber: 'PAL-2024-0155',
    caseId: 'TC-2024-1245',
    propertyLocation: 'Karachi',
    issueDate: '2024-12-10',
    status: 'Pending',
    applicantName: 'Sara Malik',
  },
  {
    id: '3',
    palNumber: 'PAL-2024-0154',
    caseId: 'TC-2024-1243',
    propertyLocation: 'PN Farms',
    issueDate: '2024-12-08',
    status: 'Issued',
    applicantName: 'Hina Tariq',
  },
];

/* ---------------- COMPONENT ---------------- */

export function PALManagement() {
  const [pals, setPALs] = useState(initialPALs);
  const [selectedPAL, setSelectedPAL] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');

  const [formData, setFormData] = useState({
    palNumber: '',
    caseId: '',
    applicantName: '',
    propertyLocation: '',
    issueDate: '',
    status: 'Issued',
  });

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredPALs = pals.filter(pal => {
    const matchesSearch =
      pal.palNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pal.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pal.applicantName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filterLocation === 'All' ||
      pal.propertyLocation === filterLocation;

    return matchesSearch && matchesLocation;
  });

  /* ---------------- SUMMARY ---------------- */

  const total = filteredPALs.length;
  const issued = filteredPALs.filter(p => p.status === 'Issued').length;
  const pending = filteredPALs.filter(p => p.status === 'Pending').length;

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const savePAL = () => {
    setPALs(prev => [
      ...prev,
      { id: Date.now().toString(), ...formData },
    ]);
    setShowAddModal(false);
    setFormData({
      palNumber: '',
      caseId: '',
      applicantName: '',
      propertyLocation: '',
      issueDate: '',
      status: 'Issued',
    });
  };

  return (
    <div className="p-8 text-slate-900">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-1">PAL Management</h1>
          <p className="text-slate-600">
            Total PALs: <strong>{pals.length}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-5 py-2 border rounded-lg text-slate-700"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add New PAL
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search PAL / Case ID / Applicant"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-slate-900"
          />
        </div>

        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          className="px-4 py-2 border rounded-lg text-slate-900"
        >
          <option>All</option>
          <option>Gwadar</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>PN Farms</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              {[
                'PAL Number',
                'Case ID',
                'Applicant',
                'Location',
                'Issue Date',
                'Status',
                'Actions',
              ].map(h => (
                <th key={h} className="px-6 py-4 text-left text-slate-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPALs.map(pal => (
              <tr key={pal.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  {pal.palNumber}
                </td>
                <td className="px-6 py-4">{pal.caseId}</td>
                <td className="px-6 py-4">{pal.applicantName}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {pal.propertyLocation}
                </td>
                <td className="px-6 py-4 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {pal.issueDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      pal.status === 'Issued'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {pal.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedPAL(pal)}
                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REPORT MODAL */}
      {showReport && (
        <Modal title="PAL Report" onClose={() => setShowReport(false)}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Summary label="Total PALs" value={total} />
            <Summary label="Issued" value={issued} />
            <Summary label="Pending" value={pending} />
          </div>

          <table className="w-full border text-sm">
            <thead className="bg-slate-100">
              <tr>
                {['PAL', 'Case', 'Applicant', 'Location', 'Status'].map(h => (
                  <th key={h} className="border px-3 py-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPALs.map(p => (
                <tr key={p.id}>
                  <td className="border px-3 py-2">{p.palNumber}</td>
                  <td className="border px-3 py-2">{p.caseId}</td>
                  <td className="border px-3 py-2">{p.applicantName}</td>
                  <td className="border px-3 py-2">{p.propertyLocation}</td>
                  <td className="border px-3 py-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}

      {/* VIEW MODAL */}
      {selectedPAL && (
        <Modal title="PAL Details" onClose={() => setSelectedPAL(null)}>
          <Detail label="PAL Number" value={selectedPAL.palNumber} />
          <Detail label="Case ID" value={selectedPAL.caseId} />
          <Detail label="Applicant" value={selectedPAL.applicantName} />
          <Detail label="Location" value={selectedPAL.propertyLocation} />
          <Detail label="Issue Date" value={selectedPAL.issueDate} />
          <Detail label="Status" value={selectedPAL.status} />
        </Modal>
      )}

      {/* ADD PAL MODAL */}
      {showAddModal && (
        <Modal title="Add New PAL" onClose={() => setShowAddModal(false)}>
          <Input label="PAL Number" value={formData.palNumber} onChange={v => handleChange('palNumber', v)} />
          <Input label="Case ID" value={formData.caseId} onChange={v => handleChange('caseId', v)} />
          <Input label="Applicant Name" value={formData.applicantName} onChange={v => handleChange('applicantName', v)} />
          <Input label="Property Location" value={formData.propertyLocation} onChange={v => handleChange('propertyLocation', v)} />
          <Input type="date" label="Issue Date" value={formData.issueDate} onChange={v => handleChange('issueDate', v)} />

          <select
            value={formData.status}
            onChange={e => handleChange('status', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Issued</option>
            <option>Pending</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button onClick={savePAL} className="px-4 py-2 bg-blue-900 text-white rounded-lg">
              Save PAL
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="text-sm">
      <span className="text-slate-500">{label}:</span>{' '}
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
