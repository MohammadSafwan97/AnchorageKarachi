import { useState } from 'react';
import {
  Plus,
  User,
  Edit,
  Phone,
  Search,
  FileText,
  Printer,
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const initialEmployees = [
  {
    uid: '1',
    id: 'P-101',
    name: 'M Safwan',
    designation: 'LDC',
    department: 'Administration',
    phone: '+92 300 1111111',
    joinDate: '2023-01-10',
    category: 'PN Civilian',
    cnic: '42101-1234567-1',
    bloodGroup: 'B+',
    nok: 'Father',
    nokPhone: '+92 300 9999999',
    snid: 'SNID-001',
  },
  {
    uid: '2',
    id: 'P-102',
    name: 'Shahzeb',
    designation: 'LDC',
    department: 'Administration',
    phone: '+92 300 2222222',
    joinDate: '2023-02-15',
    category: 'PN Civilian',
    cnic: '42101-2223334-2',
    bloodGroup: 'A+',
    nok: 'Father',
    nokPhone: '+92 300 8888888',
    snid: 'SNID-002',
  },
  {
    uid: '3',
    id: 'O-201',
    name: 'Owais',
    designation: 'LMGT',
    department: 'Land Management',
    phone: '+92 300 5555555',
    joinDate: '2022-06-01',
    category: 'Sailor',
    cnic: '42101-7654321-2',
    bloodGroup: 'O+',
    nok: 'Brother',
    nokPhone: '+92 321 8888888',
    snid: 'SNID-014',
  },
  {
    uid: '4',
    id: 'EMP-301',
    name: 'Sammar Abbas',
    designation: 'DEO',
    department: 'Data Entry',
    phone: '+92 333 2222222',
    joinDate: '2024-02-01',
    category: 'Contract Employee',
    cnic: '42101-9998887-3',
    bloodGroup: 'A+',
    nok: 'Mother',
    nokPhone: '+92 333 4444444',
    snid: 'SNID-021',
  },
];

/* ---------------- HELPERS ---------------- */

const getIdLabel = (category) => {
  switch (category) {
    case 'PN Civilian':
      return 'P No';
    case 'PN CPO':
      return 'P JO No';
    case 'Sailor':
      return 'O No';
    case 'Contract Employee':
      return 'EMP No';
    default:
      return 'ID';
  }
};

const tabCategoryMap = {
  uniform: ['PN CPO', 'Sailor'],
  civilian: ['PN Civilian'],
  contract: ['Contract Employee'],
};

/* ---------------- COMPONENT ---------------- */

export function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeTab, setActiveTab] = useState('uniform');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [mode, setMode] = useState('add');
  const [formData, setFormData] = useState({});

  /* ✅ PURE FILTER */
  const filteredEmployees = employees.filter((emp) => {
    const matchesTab = tabCategoryMap[activeTab].includes(emp.category);
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const grouped = {
    uniform: employees.filter(e => ['PN CPO', 'Sailor'].includes(e.category)),
    civilian: employees.filter(e => e.category === 'PN Civilian'),
    contract: employees.filter(e => e.category === 'Contract Employee'),
  };

  const openAdd = () => {
    setMode('add');
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setMode('edit');
    setFormData(emp);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (mode === 'edit') {
      setEmployees(prev =>
        prev.map(e => (e.uid === formData.uid ? formData : e))
      );
    } else {
      setEmployees(prev => [
        ...prev,
        { ...formData, uid: Date.now().toString() },
      ]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-8 text-slate-900">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">
          Employee Management – Anchorage Karachi
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg"
          >
            <FileText className="w-4 h-4" /> Generate Report
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          ['uniform', 'PN Uniform Personnel'],
          ['civilian', 'PN Civilians'],
          ['contract', 'Contract Employees'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === key
                ? 'bg-blue-900 text-white'
                : 'border text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, designation or ID..."
          className="w-full pl-9 pr-4 py-2 border rounded-lg"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(emp => (
          <div key={emp.uid} className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-3">
              <User className="w-8 h-8 text-blue-900" />
              <button onClick={() => openEdit(emp)}>
                <Edit className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <h3 className="font-medium">{emp.name}</h3>
            <p className="text-sm text-slate-600">{emp.designation}</p>
            <div className="text-sm mt-3 space-y-1">
              <div>{getIdLabel(emp.category)}: {emp.id}</div>
              <div>Category: {emp.category}</div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm">
              <Phone className="w-4 h-4" /> {emp.phone}
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6">
            <h2 className="font-semibold mb-4">
              {mode === 'edit' ? 'Edit Employee' : 'Add Employee'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                ['name','Full Name'],
                ['designation','Designation'],
                ['department','Department'],
                ['category','Category'],
                ['id', getIdLabel(formData.category)],
                ['cnic','CNIC'],
                ['bloodGroup','Blood Group'],
                ['phone','Phone'],
                ['snid','SNID No'],
                ['nok','Next of Kin'],
                ['nokPhone','NOK Phone'],
              ].map(([name, label]) => (
                <input
                  key={name}
                  name={name}
                  placeholder={label}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg"
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Employee Report</h2>
              <button onClick={() => setShowReport(false)}>✕</button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <Summary label="Total" value={employees.length} />
              <Summary label="Uniform" value={grouped.uniform.length} />
              <Summary label="Civilian" value={grouped.civilian.length} />
              <Summary label="Contract" value={grouped.contract.length} />
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg mb-4"
            >
              <Printer className="w-4 h-4" /> Print
            </button>

            <table className="w-full border">
              <thead className="bg-slate-100">
                <tr>
                  {['Name','Designation','Category','ID','Phone'].map(h => (
                    <th key={h} className="border px-3 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map(e => (
                  <tr key={e.uid}>
                    <td className="border px-3 py-2">{e.name}</td>
                    <td className="border px-3 py-2">{e.designation}</td>
                    <td className="border px-3 py-2">{e.category}</td>
                    <td className="border px-3 py-2">{e.id}</td>
                    <td className="border px-3 py-2">{e.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SMALL ---------------- */

function Summary({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
