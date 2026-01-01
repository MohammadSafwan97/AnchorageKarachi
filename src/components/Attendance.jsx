import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Printer,
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const initialAttendance = [
  {
    employeeId: 'EMP-009',
    employeeName: 'Safwan',
    department: 'Administration (LDC)',
    status: 'Present',
    checkIn: '09:05 AM',
    checkOut: '05:30 PM',
  },
  {
    employeeId: 'EMP-010',
    employeeName: 'Shahzeb',
    department: 'Data Entry Operator (DEO)',
    status: 'Present',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
  },
  {
    employeeId: 'EMP-011',
    employeeName: 'Shahzeb',
    department: 'Transfer Office (TOR)',
    status: 'Present',
    checkIn: '09:20 AM',
  },
  {
    employeeId: 'EMP-012',
    employeeName: 'Sammar',
    department: 'Data Entry Office (DEO)',
    status: 'Absent',
  },
];

const attendanceStats = {
  present: 3,
  absent: 1,
  onLeave: 0,
  total: 4,
  attendanceRate: 75,
};

/* ---------------- COMPONENT ---------------- */

export function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedDate, setSelectedDate] = useState('2024-12-29');
  const [showReport, setShowReport] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  /* ---------- Late Logic (08:15 AM) ---------- */
  const isLate = (checkIn) => {
    if (!checkIn) return false;
    const [time, meridian] = checkIn.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (meridian === 'PM' && h !== 12) h += 12;
    if (meridian === 'AM' && h === 12) h = 0;
    return h > 8 || (h === 8 && m > 15);
  };

  const present = attendance.filter(a => a.status === 'Present');
  const absent = attendance.filter(a => a.status === 'Absent');
  const late = present.filter(a => isLate(a.checkIn));

  /* ---------- SAVE EDIT ---------- */
  const saveEdit = () => {
    setAttendance(prev =>
      prev.map(r =>
        r.employeeId === editRecord.employeeId ? editRecord : r
      )
    );
    setEditRecord(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Attendance Management</h1>
        <p className="text-slate-600">
          Track and manage daily employee attendance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Present Today" value={attendanceStats.present} icon={CheckCircle} color="teal" />
        <StatCard label="Absent Today" value={attendanceStats.absent} icon={XCircle} color="red" />
        <StatCard label="On Leave" value={attendanceStats.onLeave} icon={Clock} color="amber" />
        <StatCard label="Attendance Rate" value={`${attendanceStats.attendanceRate}%`} icon={Users} color="blue" />
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl border p-6 mb-6 flex items-center gap-4">
        <CalendarIcon className="w-5 h-5 text-slate-500" />
        <label className="text-slate-700">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg text-slate-900"
        />
        <button
          onClick={() => setShowReport(true)}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              {['Employee ID','Employee Name','Department','Check In','Check Out','Status','Actions']
                .map(h => (
                  <th key={h} className="px-6 py-4 text-left text-slate-700">
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {attendance.map((r) => (
              <tr key={r.employeeId} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-700">{r.employeeId}</td>
                <td className="px-6 py-4 text-slate-900">{r.employeeName}</td>
                <td className="px-6 py-4 text-slate-600">{r.department}</td>
                <td className="px-6 py-4 text-slate-600">{r.checkIn || '-'}</td>
                <td className="px-6 py-4 text-slate-600">{r.checkOut || '-'}</td>
                <td className="px-6 py-4 text-slate-700">{r.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setEditRecord({ ...r })}
                    className="px-4 py-2 text-sm border text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-slate-900">
            <h2 className="mb-4">Edit Attendance</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm">Status</label>
                <select
                  value={editRecord.status}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, status: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Leave</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Check In</label>
                <input
                  value={editRecord.checkIn || ''}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, checkIn: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm">Check Out</label>
                <input
                  value={editRecord.checkOut || ''}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, checkOut: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditRecord(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL (unchanged) */}
     {/* REPORT MODAL */}
{showReport && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-slate-900 rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Attendance Report — {selectedDate}
        </h2>
        <button onClick={() => setShowReport(false)}>✕</button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Summary label="Total Employees" value={attendance.length} />
        <Summary label="Present" value={present.length} />
        <Summary label="Absent" value={absent.length} />
        <Summary label="Late Arrivals" value={late.length} />
      </div>

     

      {/* ABSENT */}
      {absent.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-slate-900 font-semibold">
            Absent Employees
          </h3>
          <table className="w-full border rounded-lg">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-4 py-2 text-left">Employee ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Department</th>
              </tr>
            </thead>
            <tbody>
              {absent.map(emp => (
                <tr key={emp.employeeId}>
                  <td className="border px-4 py-2">{emp.employeeId}</td>
                  <td className="border px-4 py-2">{emp.employeeName}</td>
                  <td className="border px-4 py-2">{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LEAVE */}
      {attendance.filter(a => a.status === 'Leave').length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-slate-900 font-semibold">
            Employees on Leave
          </h3>
          <table className="w-full border rounded-lg">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-4 py-2 text-left">Employee ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Department</th>
              </tr>
            </thead>
            <tbody>
              {attendance
                .filter(a => a.status === 'Leave')
                .map(emp => (
                  <tr key={emp.employeeId}>
                    <td className="border px-4 py-2">{emp.employeeId}</td>
                    <td className="border px-4 py-2">{emp.employeeName}</td>
                    <td className="border px-4 py-2">{emp.department}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LATE */}
      {late.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-slate-900 font-semibold">
            Late Arrivals
          </h3>
          <table className="w-full border rounded-lg">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-4 py-2 text-left">Employee ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Department</th>
                <th className="border px-4 py-2 text-left">Check In</th>
              </tr>
            </thead>
            <tbody>
              {late.map(emp => (
                <tr key={emp.employeeId}>
                  <td className="border px-4 py-2">{emp.employeeId}</td>
                  <td className="border px-4 py-2">{emp.employeeName}</td>
                  <td className="border px-4 py-2">{emp.department}</td>
                  <td className="border px-4 py-2">{emp.checkIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowReport(false)}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className={`w-10 h-10 bg-${color}-600 rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-slate-600 text-sm">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}
