import { useState } from 'react';
import { Eye, MapPin } from 'lucide-react';
import ak from '../assets/ak.jpg';
/* ---------------- BASE64 IMAGE ---------------- */

const base64Image =
  '../assets/ak.jpg';

/* ---------------- MOCK GALLERY DATA ---------------- */

const galleryItems = [
  {
    id: 'AK-G-001',
    title: 'Anchorage Karachi – Main Entrance',
    description: 'Main gate view of Anchorage Karachi housing scheme.',
    category: 'Infrastructure',
    details: {
      sector: 'Main Gate',
      area: 'Anchorage Karachi',
    },
  },
  {
    id: 'AK-G-002',
    title: 'Residential Plots – Sector A',
    description: 'Developed residential plots in Sector A of Anchorage Karachi.',
    category: 'Plots',
    details: {
      sector: 'Sector A',
      area: '500 Sq Yds',
    },
  },
  {
    id: 'AK-G-003',
    title: 'Road Development',
    description: 'Internal road infrastructure development in Anchorage Karachi.',
    category: 'Development',
    details: {
      sector: 'All Sectors',
      area: 'Anchorage Karachi',
    },
  },
];

/* ---------------- COMPONENT ---------------- */

export function AnchorageKarachiGallery() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-1">
          Anchorage Karachi Gallery
        </h1>
        <p className="text-slate-600">
          Official image gallery and visual records of Anchorage Karachi land development
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
          >
            {/* Image */}
            <div className="relative h-48 bg-slate-100">
              <img
                src={ak}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 px-3 py-1 bg-white text-slate-700 rounded-full text-xs shadow">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <MapPin className="w-4 h-4" />
                Anchorage Karachi
              </div>

              <button
                onClick={() => setSelectedItem(item)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition text-sm"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden text-slate-900 shadow-2xl">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ×
              </button>
            </div>

            {/* Image */}
            <div className="h-64 bg-slate-100">
              <img
                src={base64Image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <p className="text-slate-700">
                {selectedItem.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Scheme" value="Anchorage Karachi" />
                <Detail label="Sector" value={selectedItem.details.sector} />
                <Detail label="Area" value={selectedItem.details.area} />
                <Detail label="Category" value={selectedItem.category} />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg hover:shadow-lg transition"
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

/* ---------------- SMALL COMPONENT ---------------- */

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}
