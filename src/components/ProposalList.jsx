 import React, { useState } from 'react';
import ProposalCard from './ProposalCard';
import EmptyState from './EmptyState';
import { Search, Filter } from 'lucide-react';

/**
 * ProposalList Component (PRD 7.4 & FR-04)
 * Menampilkan kumpulan kartu proposal atau EmptyState jika kosong.
 *
 * Props:
 * - proposals: Array<Proposal> (daftar proposal yang tersimpan)
 * - onPreview: function (callback untuk membuka pratinjau)
 * - onDelete: function (callback untuk menghapus proposal)
 * - onNewProposalClick: function (opsional, untuk navigasi ke form saat kosong)
 */
export default function ProposalList({
  proposals = [],
  onPreview,
  onDelete,
  onNewProposalClick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Conditional Rendering: if proposals array is empty (PRD 7.6 & 10.6)
  if (!proposals || proposals.length === 0) {
    return (
      <EmptyState
        entityName="proposal"
        onActionClick={onNewProposalClick}
      />
    );
  }

  // Filter proposals based on query & status
  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.judulKegiatan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.namaOrganisasi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.penanggungJawab?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      p.status?.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="proposal-list-wrapper">
      {/* Search & Filter Toolbar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
            placeholder="Cari judul proker, himpunan, atau PJ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={15} color="var(--text-secondary)" />
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '130px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Semua Status</option>
            <option value="LENGKAP">Lengkap</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {filteredProposals.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Tidak ada proposal yang sesuai dengan pencarian "{searchQuery}".
        </div>
      ) : (
        <div className="proposal-cards-grid">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onPreview={onPreview}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
