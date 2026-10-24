import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

/**
 * EmptyState Component (PRD 7.6 & FR-06)
 * Ditampilkan ketika belum terdapat data proposal.
 *
 * Props:
 * - entityName: string (nama entitas yang ditampilkan dalam pesan)
 * - onActionClick: function (opsional, aksi untuk memicu pembuatan data baru)
 */
export default function EmptyState({ entityName = 'proposal', onActionClick }) {
  return (
    <div className="empty-state-container" role="status" aria-live="polite">
      <div className="empty-state-icon-box">
        <FolderOpen size={30} />
      </div>
      <h3 className="empty-state-title">
        Belum ada data {entityName}
      </h3>
      <p className="empty-state-desc">
        Silakan isi formulir pembuatan proposal di sebelah kiri atau klik tombol di bawah untuk menambahkan rencana kegiatan himpunan mahasiswa pertama Anda.
      </p>
      {onActionClick && (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onActionClick}
        >
          <Plus size={16} />
          Buat Proposal Baru
        </button>
      )}
    </div>
  );
}
