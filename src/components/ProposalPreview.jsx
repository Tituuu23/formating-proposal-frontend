import React, { useEffect, useRef } from 'react';
import { Printer, X, FileCheck, CheckCircle2 } from 'lucide-react';

/**
 * ProposalPreview Component (PRD 7.7 & FR-08, FR-10)
 * Menampilkan pratinjau dokumen proposal kegiatan formal Telkom University
 * dan menyediakan fitur cetak / unduh PDF via dialog native modern.
 *
 * Props:
 * - proposal: object (data proposal yang akan ditampilkan)
 * - onClose: function (callback untuk menutup dialog pratinjau)
 */
export default function ProposalPreview({ proposal, onClose }) {
  const dialogRef = useRef(null);

  // Buka dialog saat komponen dimount atau proposal berganti
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Fallback jika showModal sudah aktif
      }
    }

    // Modern Web Guidance: Fallback untuk browser yang belum mendukung closedby="any"
    const handleBackdropClick = (event) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        handleClose();
      }
    };

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [proposal]);

  if (!proposal) return null;

  const handleClose = () => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    if (onClose) {
      onClose();
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="preview-dialog"
      {...{ closedby: 'any' }}
      aria-labelledby="preview-doc-title"
      onClose={handleClose}
    >
      <div className="preview-modal-shell">
        {/* Modal Toolbar (hidden saat print) */}
        <div className="preview-modal-header">
          <div className="preview-modal-title">
            <FileCheck size={20} color="var(--accent)" />
            <span>Pratinjau Dokumen Proposal Resmi</span>
          </div>

          <div className="preview-header-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer size={15} />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleClose}
              title="Tutup pratinjau"
              aria-label="Tutup pratinjau"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Document Body (printable paper) */}
        <div className="preview-modal-body">
          <article className="document-paper" id="printable-proposal">
            {/* KOP Surat Dokumen Telkom University */}
            <div className="doc-kop">
              <div className="doc-kop-logo">
                TELKOM
                <br />
                UNIV
              </div>
              <div className="doc-kop-text">
                <div className="doc-kop-instansi">
                  ORGANISASI KEMAHASISWAAN TELKOM UNIVERSITY
                </div>
                <div className="doc-kop-org">
                  {proposal.namaOrganisasi || 'HIMPUNAN MAHASISWA'}
                </div>
                <div className="doc-kop-address">
                  Jl. Telekomunikasi No. 1, Terusan Buahbatu, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                </div>
              </div>
            </div>

            {/* Judul Dokumen */}
            <div className="doc-title-block">
              <h2 className="doc-title-main" id="preview-doc-title">
                PROPOSAL PROGRAM KERJA
              </h2>
              <div className="doc-title-sub">
                "{proposal.judulKegiatan}"
              </div>
            </div>

            {/* Ringkasan Identitas Dokumen */}
            <section className="doc-section">
              <h3 className="doc-section-heading">I. IDENTITAS KEGIATAN</h3>
              <table className="doc-info-table">
                <tbody>
                  <tr>
                    <td className="label-col">Nama Kegiatan</td>
                    <td className="colon-col">:</td>
                    <td><strong>{proposal.judulKegiatan}</strong></td>
                  </tr>
                  <tr>
                    <td className="label-col">Himpunan Penyelenggara</td>
                    <td className="colon-col">:</td>
                    <td>{proposal.namaOrganisasi}</td>
                  </tr>
                  <tr>
                    <td className="label-col">Penanggung Jawab</td>
                    <td className="colon-col">:</td>
                    <td>{proposal.penanggungJawab}</td>
                  </tr>
                  <tr>
                    <td className="label-col">Hari / Tanggal</td>
                    <td className="colon-col">:</td>
                    <td>{formatDate(proposal.tanggalKegiatan)}</td>
                  </tr>
                  <tr>
                    <td className="label-col">Tempat / Lokasi</td>
                    <td className="colon-col">:</td>
                    <td>{proposal.lokasi}</td>
                  </tr>
                  <tr>
                    <td className="label-col">Estimasi Kebutuhan Anggaran</td>
                    <td className="colon-col">:</td>
                    <td><strong>{formatRupiah(proposal.anggaran)}</strong></td>
                  </tr>
                  <tr>
                    <td className="label-col">Status Berkas</td>
                    <td className="colon-col">:</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} color="#059669" />
                        {proposal.status || 'Draft'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Bab II: Latar Belakang */}
            <section className="doc-section">
              <h3 className="doc-section-heading">II. LATAR BELAKANG</h3>
              <div className="doc-section-content" style={{ whiteSpace: 'pre-line' }}>
                {proposal.latarBelakang}
              </div>
            </section>

            {/* Bab III: Tujuan Kegiatan */}
            <section className="doc-section">
              <h3 className="doc-section-heading">III. TUJUAN KEGIATAN</h3>
              <div className="doc-section-content" style={{ whiteSpace: 'pre-line' }}>
                {proposal.tujuan}
              </div>
            </section>

            {/* Bab IV: Rencana Anggaran Biaya */}
            <section className="doc-section">
              <h3 className="doc-section-heading">IV. RENCANA ANGGARAN BIAYA (RAB)</h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                Estimasi total alokasi dana operasional yang dibutuhkan untuk menyukseskan program kerja ini adalah sebesar:
              </p>
              <div
                style={{
                  background: '#F3F4F6',
                  padding: '1rem',
                  borderRadius: '4px',
                  fontWeight: '700',
                  fontSize: '1.15rem',
                  textAlign: 'center',
                  border: '1px solid #D1D5DB'
                }}
              >
                TOTAL ANGGARAN: {formatRupiah(proposal.anggaran)}
              </div>
            </section>

            {/* Bab V: Penutup */}
            <section className="doc-section">
              <h3 className="doc-section-heading">V. PENUTUP</h3>
              <p className="doc-section-content">
                Demikian proposal kegiatan ini kami susun sebagai pedoman operasional dan pertimbangan persetujuan pelaksanaan program kerja. Besar harapan kami agar program kerja ini dapat terlaksana dengan lancar, memberikan manfaat nyata bagi seluruh mahasiswa dan memajukan almamater Telkom University. Atas perhatian, dukungan, dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.
              </p>
            </section>

            {/* Lembar Pengesahan */}
            <div className="doc-signatures">
              <div>
                <div className="doc-sign-role">
                  Ketua Pelaksana / Penanggung Jawab
                </div>
                <div className="doc-sign-name">
                  {proposal.penanggungJawab}
                </div>
                <div className="doc-sign-id">
                  {proposal.namaOrganisasi}
                </div>
              </div>

              <div>
                <div className="doc-sign-role">
                  Mengetahui,<br />Ketua Himpunan Mahasiswa
                </div>
                <div className="doc-sign-name">
                  ( _______________________ )
                </div>
                <div className="doc-sign-id">
                  NIM. ........................................
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </dialog>
  );
}
