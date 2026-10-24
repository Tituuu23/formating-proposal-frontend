import React from 'react';
import { Calendar, MapPin, User, Eye, Trash2, Coins, Building2 } from 'lucide-react';

/**
 * ProposalCard Component (PRD 7.5 & FR-05)
 * Menampilkan ringkasan informasi utama satu proposal dalam bentuk kartu.
 *
 * Props:
 * - proposal: object (data proposal dengan id, judulKegiatan, namaOrganisasi, penanggungJawab, dll.)
 * - onPreview: function (callback untuk membuka pratinjau dokumen proposal)
 * - onDelete: function (callback untuk menghapus proposal)
 */
export default function ProposalCard({ proposal, onPreview, onDelete }) {
  if (!proposal) return null;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const isLengkap = proposal.status?.toLowerCase() === 'lengkap';

  const handleDelete = () => {
    if (window.confirm(`Hapus proposal "${proposal.judulKegiatan}"?`)) {
      if (onDelete) onDelete(proposal.id);
    }
  };

  return (
    <article className="proposal-card animate-fade-in" aria-label={`Proposal ${proposal.judulKegiatan}`}>
      <div className="card-header-row">
        <span className="card-org-tag">
          <Building2 size={13} />
          {proposal.namaOrganisasi || 'Himpunan Mahasiswa'}
        </span>
        <span className={`status-badge ${isLengkap ? 'lengkap' : 'draft'}`}>
          <span className="status-dot"></span>
          {proposal.status || 'Draft'}
        </span>
      </div>

      <h4 className="card-title" title={proposal.judulKegiatan}>
        {proposal.judulKegiatan}
      </h4>

      <div className="card-meta-grid">
        <div className="card-meta-item">
          <Calendar size={14} />
          <span>{formatDate(proposal.tanggalKegiatan)}</span>
        </div>
        <div className="card-meta-item">
          <User size={14} />
          <span title={`PJ: ${proposal.penanggungJawab}`}>
            {proposal.penanggungJawab || 'Belum diisi'}
          </span>
        </div>
        <div className="card-meta-item">
          <MapPin size={14} />
          <span title={proposal.lokasi}>{proposal.lokasi || 'Belum diisi'}</span>
        </div>
        <div className="card-meta-budget">
          <Coins size={14} />
          <span>{formatRupiah(proposal.anggaran)}</span>
        </div>
      </div>

      <div className="card-footer-actions">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => onPreview && onPreview(proposal)}
          title="Pratinjau dokumen proposal siap cetak"
        >
          <Eye size={15} />
          <span>Pratinjau Dokumen</span>
        </button>

        <button
          type="button"
          className="btn btn-danger-ghost btn-sm"
          onClick={handleDelete}
          title="Hapus proposal ini"
          aria-label={`Hapus proposal ${proposal.judulKegiatan}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
