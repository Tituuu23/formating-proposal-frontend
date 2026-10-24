import React, { useState } from 'react';
import AppHeader from './components/AppHeader';
import SummaryCards from './components/SummaryCards';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import ProposalPreview from './components/ProposalPreview';
import { PlusCircle, FileText } from 'lucide-react';

/**
 * Initial sample proker proposals for Telkom University student associations
 */
const INITIAL_PROPOSALS = [
  {
    id: 'prop-sample-01',
    judulKegiatan: 'TechFest Telkom 2026: AI & Robotics Exhibition',
    namaOrganisasi: 'HIMA S1 Informatika Telkom University',
    penanggungJawab: 'Dimas Rizky Ramadhan (NIM 1301223049)',
    latarBelakang:
      'Perkembangan pesat kecerdasan buatan dan otomasi robotika menuntut mahasiswa untuk memiliki daya saing global. Melalui TechFest Telkom 2026, mahasiswa diberikan panggung apresiasi, kompetisi ide solutif, serta jejaring dengan praktisi industri.',
    tujuan:
      '1. Menyelenggarakan kompetisi inovasi AI tingkat nasional.\n2. Memamerkan prototipe teknologi karya mahasiswa Telkom University.\n3. Menghubungkan bakat mahasiswa dengan kebutuhan industri teknologi.',
    tanggalKegiatan: '2026-11-20',
    lokasi: 'Auditorium Gedung Damar & Telkom Convention Hall',
    anggaran: 15000000,
    status: 'Lengkap'
  },
  {
    id: 'prop-sample-02',
    judulKegiatan: 'Upgrading Organisasi & Leadership Training Himpunan',
    namaOrganisasi: 'BEM Fakultas Informatika Telkom University',
    penanggungJawab: 'Annisa Putri Maharani (NIM 1302220012)',
    latarBelakang:
      'Transisi kepengurusan memerlukan pembinaan kepemimpinan dan manajemen organisasi yang terstruktur agar seluruh pengurus memahami alur koordinasi dan tata kelola program kerja yang akuntabel.',
    tujuan:
      '1. Membangun sinergi dan solidaritas antardivisi kepengurusan.\n2. Memberikan pelatihan tata kelola administrasi dan penganggaran kegiatan.\n3. Menyusun roadmap pelaksanaan program kerja satu periode ke depan.',
    tanggalKegiatan: '2026-12-05',
    lokasi: 'Ruang Multimedia Gedung Tokong Nanas (GKU) & Zoom',
    anggaran: 8500000,
    status: 'Draft'
  }
];

export default function App() {
  // State array utama untuk daftar proposal (PRD 10.3)
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);

  // State untuk pratinjau dokumen (PRD 7.7)
  const [activePreviewProposal, setActivePreviewProposal] = useState(null);

  // State navigasi aktif: 'dashboard' | 'tambah' | 'daftar'
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Menambahkan proposal baru ke state array (PRD FR-03 & 10.3)
  const handleAddProposal = (newProposal) => {
    setProposals((prev) => [newProposal, ...prev]);
  };

  // Menghapus proposal berdasarkan ID unik (PRD FR-09)
  const handleDeleteProposal = (proposalId) => {
    setProposals((prev) => prev.filter((p) => p.id !== proposalId));
  };

  // Membuka pratinjau proposal (PRD FR-08)
  const handlePreviewProposal = (proposal) => {
    setActivePreviewProposal(proposal);
  };

  // Menutup pratinjau proposal
  const handleClosePreview = () => {
    setActivePreviewProposal(null);
  };

  // Perhitungan ringkasan untuk SummaryCards (PRD 7.2)
  const totalProposals = proposals.length;
  const draftCount = proposals.filter((p) => p.status?.toLowerCase() === 'draft').length;
  const completeCount = proposals.filter((p) => p.status?.toLowerCase() === 'lengkap').length;
  const totalBudget = proposals.reduce((acc, curr) => acc + (Number(curr.anggaran) || 0), 0);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tambah', label: 'Buat Proposal' },
    { id: 'daftar', label: 'Daftar Proposal', badge: totalProposals }
  ];

  return (
    <div className="app-container">
      {/* Header Aplikasi (PRD 7.1) */}
      <AppHeader
        appName="ProkerFlow"
        menuItems={menuItems}
        activeMenu={activeMenu}
        onSelectMenu={(menuId) => setActiveMenu(menuId)}
      />

      <main className="main-content">
        {/* Page Header */}
        <section className="hero-section">
          <p className="hero-tag">Telkom University — Generator Proposal Program Kerja</p>
          <h1 className="hero-title">
            Proposal Program Kerja <span>Himpunan Mahasiswa</span>
          </h1>
          <p className="hero-desc">
            Standarisasi format dokumen proposal organisasi mahasiswa. Masukkan informasi kegiatan, hitung estimasi anggaran, dan cetak dokumen resmi siap diajukan.
          </p>
        </section>

        {/* Ringkasan Data Proposal (PRD 7.2 & FR-01) */}
        <SummaryCards
          total={totalProposals}
          draftCount={draftCount}
          completeCount={completeCount}
          totalBudget={totalBudget}
        />

        {/* Konten Utama: Formulir & Daftar Proposal */}
        <div className="content-grid with-sidebar">
          {/* Kolom Kiri: Formulir Penambahan Proposal (PRD 7.3 & FR-02, FR-03) */}
          <section className="section-box" aria-labelledby="form-section-title">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-header-icon">
                  <PlusCircle size={18} />
                </div>
                <div>
                  <h2 id="form-section-title" className="section-title">
                    Buat Proposal Baru
                  </h2>
                  <span className="section-subtitle">
                    Isi detail kegiatan untuk generate proposal
                  </span>
                </div>
              </div>
            </div>

            <div className="section-body">
              <ProposalForm onAddProposal={handleAddProposal} />
            </div>
          </section>

          {/* Kolom Kanan: Daftar Proposal yang Tersimpan (PRD 7.4, 7.5, 7.6 & FR-04, FR-05, FR-06) */}
          <section className="section-box" aria-labelledby="list-section-title">
            <div className="section-header">
              <div className="section-header-left">
                <div className="section-header-icon">
                  <FileText size={18} />
                </div>
                <div>
                  <h2 id="list-section-title" className="section-title">
                    Daftar Proposal Program Kerja
                  </h2>
                  <span className="section-subtitle">
                    Menampilkan {totalProposals} proposal yang tersimpan dalam state
                  </span>
                </div>
              </div>
            </div>

            <div className="section-body">
              <ProposalList
                proposals={proposals}
                onPreview={handlePreviewProposal}
                onDelete={handleDeleteProposal}
                onNewProposalClick={() => {
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                  const judulInput = document.getElementById('judulKegiatan');
                  if (judulInput) judulInput.focus();
                }}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Pratinjau Dokumen Proposal (Modal Dialog) (PRD 7.7 & FR-08, FR-10) */}
      {activePreviewProposal && (
        <ProposalPreview
          proposal={activePreviewProposal}
          onClose={handleClosePreview}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div className="app-footer-content">
          <div>
            <strong>ProkerFlow</strong> &copy; {new Date().getFullYear()} — Telkom University Student Organization Proposal Generator
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Dibangun dengan React & Component-Driven Design
          </div>
        </div>
      </footer>
    </div>
  );
}
