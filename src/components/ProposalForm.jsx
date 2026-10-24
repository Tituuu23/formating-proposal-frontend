import React, { useState } from 'react';
import { PlusCircle, RotateCcw, FileText, AlertCircle } from 'lucide-react';

/**
 * ProposalForm Component (PRD 7.3 & FR-02, FR-03, FR-07)
 * Formulir controlled component untuk memasukkan data program kerja himpunan mahasiswa.
 *
 * Props:
 * - onAddProposal: function (callback saat proposal berhasil divalidasi & ditambahkan)
 * - initialData: object (opsional, data awal untuk edit / preset)
 */
export default function ProposalForm({ onAddProposal, initialData }) {
  const initialFormState = {
    judulKegiatan: initialData?.judulKegiatan || '',
    namaOrganisasi: initialData?.namaOrganisasi || 'HMSE Telkom University',
    penanggungJawab: initialData?.penanggungJawab || '',
    latarBelakang: initialData?.latarBelakang || '',
    tujuan: initialData?.tujuan || '',
    tanggalKegiatan: initialData?.tanggalKegiatan || '',
    lokasi: initialData?.lokasi || '',
    anggaran: initialData?.anggaran || '',
    status: initialData?.status || 'Draft'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.judulKegiatan.trim()) {
      newErrors.judulKegiatan = 'Nama program kerja / kegiatan wajib diisi';
    }
    if (!formData.namaOrganisasi.trim()) {
      newErrors.namaOrganisasi = 'Nama himpunan atau organisasi wajib diisi';
    }
    if (!formData.penanggungJawab.trim()) {
      newErrors.penanggungJawab = 'Penanggung jawab kegiatan wajib diisi';
    }
    if (!formData.latarBelakang.trim()) {
      newErrors.latarBelakang = 'Latar belakang kegiatan wajib diisi';
    }
    if (!formData.tujuan.trim()) {
      newErrors.tujuan = 'Tujuan kegiatan wajib diisi';
    }
    if (!formData.tanggalKegiatan) {
      newErrors.tanggalKegiatan = 'Tanggal pelaksanaan wajib dipilih';
    }
    if (!formData.lokasi.trim()) {
      newErrors.lokasi = 'Lokasi pelaksanaan wajib diisi';
    }
    if (formData.anggaran === '' || Number(formData.anggaran) < 0) {
      newErrors.anggaran = 'Estimasi anggaran harus diisi dengan angka valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSubmitFeedback({
        type: 'error',
        message: 'Mohon lengkapi semua kolom yang wajib diisi.'
      });
      return;
    }

    const newProposal = {
      id: `prop-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      judulKegiatan: formData.judulKegiatan.trim(),
      namaOrganisasi: formData.namaOrganisasi.trim(),
      penanggungJawab: formData.penanggungJawab.trim(),
      latarBelakang: formData.latarBelakang.trim(),
      tujuan: formData.tujuan.trim(),
      tanggalKegiatan: formData.tanggalKegiatan,
      lokasi: formData.lokasi.trim(),
      anggaran: Number(formData.anggaran) || 0,
      status: formData.status
    };

    if (onAddProposal) {
      onAddProposal(newProposal);
    }

    // Reset form after successful submission
    setFormData({
      judulKegiatan: '',
      namaOrganisasi: 'HIMA IF Telkom University',
      penanggungJawab: '',
      latarBelakang: '',
      tujuan: '',
      tanggalKegiatan: '',
      lokasi: '',
      anggaran: '',
      status: 'Draft'
    });
    setErrors({});
    setSubmitFeedback({
      type: 'success',
      message: `Proposal "${newProposal.judulKegiatan}" berhasil ditambahkan!`
    });

    setTimeout(() => {
      setSubmitFeedback(null);
    }, 4000);
  };

  const handleReset = () => {
    setFormData({
      judulKegiatan: '',
      namaOrganisasi: 'HIMA IF Telkom University',
      penanggungJawab: '',
      latarBelakang: '',
      tujuan: '',
      tanggalKegiatan: '',
      lokasi: '',
      anggaran: '',
      status: 'Draft'
    });
    setErrors({});
    setSubmitFeedback(null);
  };

  // Helper to load realistic Telkom University example
  const handleLoadSample = () => {
    setFormData({
      judulKegiatan: 'Telkom Informatics Olympiad & Tech Expo 2026',
      namaOrganisasi: 'HIMA S1 Informatika Telkom University',
      penanggungJawab: 'Muhammad Arya Pratama (NIM 1301230045)',
      latarBelakang:
        'Perkembangan pesat kecerdasan buatan dan rekayasa perangkat lunak menuntut mahasiswa untuk memiliki kompetensi teknis dan kemampuan berpikir komputasional yang tinggi. Kegiatan ini diselenggarakan sebagai wadah kompetisi dan unjuk karya inovasi teknologi mahasiswa Telkom University dan nasional.',
      tujuan:
        '1. Meningkatkan keterampilan pemecahan masalah dan pemrograman kompetitif mahasiswa.\n2. Memperkenalkan inovasi riset dan prototipe karya mahasiswa ke industri teknologi.\n3. Mempererat kolaborasi antarhimpunan mahasiswa rumpun School of Computing.',
      tanggalKegiatan: '2026-11-14',
      lokasi: 'Gedung Damar Auditorium & BTP Telkom University',
      anggaran: 18500000,
      status: 'Lengkap'
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid" noValidate>
      {submitFeedback && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: submitFeedback.type === 'success' ? 'var(--success-bg)' : 'var(--danger-bg)',
            color: submitFeedback.type === 'success' ? '#34D399' : '#F87171',
            border: `1px solid ${submitFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
          }}
        >
          <AlertCircle size={16} />
          <span>{submitFeedback.message}</span>
        </div>
      )}

      {/* Baris Judul & Organisasi */}
      <div className="form-group">
        <label className="form-label" htmlFor="judulKegiatan">
          <span>Judul Program Kerja / Kegiatan<span className="form-required">*</span></span>
        </label>
        <input
          id="judulKegiatan"
          name="judulKegiatan"
          type="text"
          className={`form-input ${errors.judulKegiatan ? 'has-error' : ''}`}
          placeholder="Contoh: Workshop Cloud Computing & Web3"
          value={formData.judulKegiatan}
          onChange={handleChange}
        />
        {errors.judulKegiatan && (
          <span className="form-error-msg">{errors.judulKegiatan}</span>
        )}
      </div>

      <div className="form-row two-cols">
        <div className="form-group">
          <label className="form-label" htmlFor="namaOrganisasi">
            <span>Nama Himpunan / Organisasi<span className="form-required">*</span></span>
          </label>
          <input
            id="namaOrganisasi"
            name="namaOrganisasi"
            type="text"
            className={`form-input ${errors.namaOrganisasi ? 'has-error' : ''}`}
            placeholder="Contoh: HIMA IF Telkom University"
            value={formData.namaOrganisasi}
            onChange={handleChange}
          />
          {errors.namaOrganisasi && (
            <span className="form-error-msg">{errors.namaOrganisasi}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="penanggungJawab">
            <span>Penanggung Jawab (PJ)<span className="form-required">*</span></span>
          </label>
          <input
            id="penanggungJawab"
            name="penanggungJawab"
            type="text"
            className={`form-input ${errors.penanggungJawab ? 'has-error' : ''}`}
            placeholder="Nama & NIM Penanggung Jawab"
            value={formData.penanggungJawab}
            onChange={handleChange}
          />
          {errors.penanggungJawab && (
            <span className="form-error-msg">{errors.penanggungJawab}</span>
          )}
        </div>
      </div>

      {/* Latar Belakang */}
      <div className="form-group">
        <label className="form-label" htmlFor="latarBelakang">
          <span>Latar Belakang Kegiatan<span className="form-required">*</span></span>
        </label>
        <textarea
          id="latarBelakang"
          name="latarBelakang"
          className={`form-textarea ${errors.latarBelakang ? 'has-error' : ''}`}
          placeholder="Uraikan urgensi, konteks, dan landasan pelaksanaan program kerja..."
          rows={3}
          value={formData.latarBelakang}
          onChange={handleChange}
        />
        {errors.latarBelakang && (
          <span className="form-error-msg">{errors.latarBelakang}</span>
        )}
      </div>

      {/* Tujuan Kegiatan */}
      <div className="form-group">
        <label className="form-label" htmlFor="tujuan">
          <span>Tujuan Kegiatan<span className="form-required">*</span></span>
        </label>
        <textarea
          id="tujuan"
          name="tujuan"
          className={`form-textarea ${errors.tujuan ? 'has-error' : ''}`}
          placeholder="Tuliskan poin-poin target dan luaran yang ingin dicapai..."
          rows={3}
          value={formData.tujuan}
          onChange={handleChange}
        />
        {errors.tujuan && (
          <span className="form-error-msg">{errors.tujuan}</span>
        )}
      </div>

      {/* Waktu & Lokasi */}
      <div className="form-row two-cols">
        <div className="form-group">
          <label className="form-label" htmlFor="tanggalKegiatan">
            <span>Tanggal Pelaksanaan<span className="form-required">*</span></span>
          </label>
          <input
            id="tanggalKegiatan"
            name="tanggalKegiatan"
            type="date"
            className={`form-input ${errors.tanggalKegiatan ? 'has-error' : ''}`}
            value={formData.tanggalKegiatan}
            onChange={handleChange}
          />
          {errors.tanggalKegiatan && (
            <span className="form-error-msg">{errors.tanggalKegiatan}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="lokasi">
            <span>Lokasi Pelaksanaan<span className="form-required">*</span></span>
          </label>
          <input
            id="lokasi"
            name="lokasi"
            type="text"
            className={`form-input ${errors.lokasi ? 'has-error' : ''}`}
            placeholder="Contoh: Gedung Pelangi / Zoom Meeting"
            value={formData.lokasi}
            onChange={handleChange}
          />
          {errors.lokasi && (
            <span className="form-error-msg">{errors.lokasi}</span>
          )}
        </div>
      </div>

      {/* Anggaran & Status */}
      <div className="form-row two-cols">
        <div className="form-group">
          <label className="form-label" htmlFor="anggaran">
            <span>Perkiraan Anggaran (Rp)<span className="form-required">*</span></span>
          </label>
          <input
            id="anggaran"
            name="anggaran"
            type="number"
            min="0"
            step="50000"
            className={`form-input ${errors.anggaran ? 'has-error' : ''}`}
            placeholder="Contoh: 7500000"
            value={formData.anggaran}
            onChange={handleChange}
          />
          {errors.anggaran && (
            <span className="form-error-msg">{errors.anggaran}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">
            <span>Status Proposal</span>
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft (Dalam Penyusunan)</option>
            <option value="Lengkap">Lengkap (Siap Cetak / Ajukan)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleLoadSample}
            title="Muat contoh format proposal Telkom University"
          >
            <FileText size={14} />
            Muat Contoh
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleReset}
            title="Kosongkan formulir"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          <PlusCircle size={16} />
          Tambah Proposal
        </button>
      </div>
    </form>
  );
}
