import { useState } from 'react';
import {
  Plus,
  Eye,
  Edit,
  MapPin,
  Search,
  FileText,
  Printer,
} from 'lucide-react';

/* ---------------- MOCK DATA ---------------- */

const initialCases = [
  {
    id: 'TC-2024-1248',
    propertyLocation: 'Gwadar',
    sellerName: 'Ahmed Hassan',
    purchaserName: 'Khalid Mehmood',
    status: 'Completed',
    palNo: 'PAL-2024-0156',
    letterNoDate: 'LTR-89 / 15-12-2024',
    ndcNo: 'NDC-55678',
    registrationNo: 'REG-2024-8899',
    cnic: '42101-1234567-1',
    phone: '0301-1234567',
    area: '500',
    remarks: 'All documents verified',
    documents: null, // ✅ PDF
  },
   {
    id: 'TC-2024-1248',
    propertyLocation: 'Karachi',
    sellerName: 'Naba Imran',
    purchaserName: 'Khalid Mehmood',
    status: 'Completed',
    palNo: 'PAL-2024-0156',
    letterNoDate: 'LTR-89 / 15-12-2024',
    ndcNo: 'NDC-55678',
    registrationNo: 'REG-2024-8899',
    cnic: '42101-1234567-1',
    phone: '0301-1234567',
    area: '500',
    remarks: 'All documents verified',
    documents: null, // ✅ PDF
  },
   {
    id: 'TC-2024-1248',
    propertyLocation: 'PN Farms',
    sellerName: 'Shahzeb',
    purchaserName: 'Khalid Mehmood',
    status: 'Completed',
    palNo: 'PAL-2024-0156',
    letterNoDate: 'LTR-89 / 15-12-2024',
    ndcNo: 'NDC-55678',
    registrationNo: 'REG-2024-8899',
    cnic: '42101-1234567-1',
    phone: '0301-1234567',
    area: '500',
    remarks: 'All documents verified',
    documents: null, // ✅ PDF
  },
   {
    id: 'TC-2024-1248',
    propertyLocation: 'Islamabad',
    sellerName: 'Ahmed Hassan',
    purchaserName: 'Khalid Mehmood',
    status: 'Completed',
    palNo: 'PAL-2024-0156',
    letterNoDate: 'LTR-89 / 15-12-2024',
    ndcNo: 'NDC-55678',
    registrationNo: 'REG-2024-8899',
    cnic: '42101-1234567-1',
    phone: '0301-1234567',
    area: '500',
    remarks: 'All documents verified',
    documents: null, // ✅ PDF
  },
   {
    id: 'TC-2024-1248',
    propertyLocation: 'Gwadar',
    sellerName: 'Ahmed Hassan',
    purchaserName: 'Khalid Mehmood',
    status: 'Completed',
    palNo: 'PAL-2024-0156',
    letterNoDate: 'LTR-89 / 15-12-2024',
    ndcNo: 'NDC-55678',
    registrationNo: 'REG-2024-8899',
    cnic: '42101-1234567-1',
    phone: '0301-1234567',
    area: '500',
    remarks: 'All documents verified',
    documents: null, // ✅ PDF
  },
];

/* ---------------- COMPONENT ---------------- */

export function TransferCases() {
  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  const [showReport, setShowReport] = useState(false);
  const [reportType, setReportType] = useState('summary');

  const emptyCase = {
    id: '',
    propertyLocation: '',
    sellerName: '',
    purchaserName: '',
    status: 'Completed',
    palNo: '',
    letterNoDate: '',
    ndcNo: '',
    registrationNo: '',
    cnic: '',
    phone: '',
    area: '',
    remarks: '',
    documents: null, // ✅ PDF
  };

  /* ---------- FILTER ---------- */

  const filteredCases = cases.filter(tc => {
    const matchesSearch =
      tc.id.toLowerCase().includes(search.toLowerCase()) ||
      tc.sellerName.toLowerCase().includes(search.toLowerCase()) ||
      tc.purchaserName.toLowerCase().includes(search.toLowerCase()) ||
      tc.palNo.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === 'All' || tc.propertyLocation === locationFilter;

    return matchesSearch && matchesLocation;
  });

  /* ---------- ACTIONS ---------- */

  const openModal = (tc, type) => {
    setSelectedCase({ ...tc });
    setMode(type);
  };

  const openAddCase = () => {
    setSelectedCase({ ...emptyCase });
    setMode('add');
  };

  const handleChange = (field, value) => {
    setSelectedCase(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setSelectedCase(prev => ({ ...prev, documents: file }));
  };

  const saveChanges = () => {
    if (mode === 'edit') {
      setCases(prev =>
        prev.map(tc => (tc.id === selectedCase.id ? selectedCase : tc))
      );
    }
    if (mode === 'add') {
      setCases(prev => [...prev, selectedCase]);
    }
    setSelectedCase(null);
    setMode(null);
  };

  return (
    <div className="p-8 text-slate-900">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Transfer Cases</h1>
          <p className="text-slate-600">Manage and track property transfer cases</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>

          <button
            onClick={openAddCase}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Case
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search Case / Seller / Purchaser / PAL"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg"
          />
        </div>

        <select
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Locations</option>
          <option value="Gwadar">Gwadar</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
          <option value="PN Farms">PN Farms</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              {['Case No','Location','Seller','Purchaser','Status','Actions'].map(h => (
                <th key={h} className="px-6 py-4 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(tc => (
              <tr key={tc.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4">{tc.id}</td>
                <td className="px-6 py-4 flex gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {tc.propertyLocation}
                </td>
                <td className="px-6 py-4">{tc.sellerName}</td>
                <td className="px-6 py-4">{tc.purchaserName}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">
                    {tc.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openModal(tc,'view')} className="p-2 hover:bg-blue-50 rounded-lg">
                    <Eye className="w-4 h-4 text-blue-900" />
                  </button>
                  <button onClick={() => openModal(tc,'edit')} className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit className="w-4 h-4 text-slate-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="font-semibold mb-4">
              {mode === 'view' ? 'View Case' : mode === 'edit' ? 'Edit Case' : 'Add New Case'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(emptyCase).filter(k => k !== 'remarks' && k !== 'documents').map(key => (
                <Input
                  key={key}
                  label={key}
                  value={selectedCase[key]}
                  disabled={mode === 'view'}
                  onChange={v => handleChange(key, v)}
                />
              ))}

              {/* ✅ PDF UPLOAD */}
              <div className="col-span-2">
                <label className="text-sm text-slate-600">Upload Scanned Documents (PDF)</label>
                {mode === 'view' ? (
                  <div className="mt-1 text-sm">
                    {selectedCase.documents ? selectedCase.documents.name : 'No document uploaded'}
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleFileChange(e.target.files[0])}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                )}
              </div>

              <div className="col-span-2">
                <label className="text-sm text-slate-600">Remarks</label>
                <textarea
                  disabled={mode === 'view'}
                  value={selectedCase.remarks}
                  onChange={e => handleChange('remarks', e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedCase(null)} className="border px-4 py-2 rounded-lg">
                Close
              </button>
              {mode !== 'view' && (
                <button onClick={saveChanges} className="bg-blue-900 text-white px-4 py-2 rounded-lg">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL (unchanged) */}
      {showReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Transfer Cases Report</h2>
              <button onClick={() => setShowReport(false)}>✕</button>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg mb-4"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm text-slate-600 capitalize">{label}</label>
      <input
        disabled={disabled}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}
