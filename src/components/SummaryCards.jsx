import React from 'react';
import { Files, Clock, CheckCircle2, Coins } from 'lucide-react';

/**
 * SummaryCards Component (PRD 7.2)
 * Menampilkan ringkasan data proposal: total proposal, draft, dan lengkap.
 *
 * Props:
 * - total: number (jumlah seluruh proposal)
 * - draftCount: number (jumlah proposal berstatus draft)
 * - completeCount: number (jumlah proposal berstatus lengkap)
 * - totalBudget: number (opsional, estimasi total anggaran)
 */
export default function SummaryCards({
  total = 0,
  draftCount = 0,
  completeCount = 0,
  totalBudget = 0
}) {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
  };

  const cards = [
    {
      id: 'total',
      label: 'Total Proposal',
      value: total,
      hint: 'Semua proposal terdaftar',
      icon: <Files size={22} />,
      type: 'primary'
    },
    {
      id: 'draft',
      label: 'Status Draft',
      value: draftCount,
      hint: 'Perlu dilengkapi / disunting',
      icon: <Clock size={22} />,
      type: 'warning'
    },
    {
      id: 'complete',
      label: 'Status Lengkap',
      value: completeCount,
      hint: 'Siap diajukan & dicetak',
      icon: <CheckCircle2 size={22} />,
      type: 'success'
    },
    {
      id: 'budget',
      label: 'Estimasi Anggaran',
      value: formatRupiah(totalBudget),
      hint: 'Akumulasi seluruh proker',
      icon: <Coins size={22} />,
      type: 'budget'
    }
  ];

  return (
    <div className="summary-cards-grid" aria-label="Ringkasan Statistik Proposal">
      {cards.map((card) => (
        <div key={card.id} className="summary-card">
          <div className="summary-card-info">
            <span className="summary-card-label">{card.label}</span>
            <div className="summary-card-value">{card.value}</div>
            <span className="summary-card-hint">{card.hint}</span>
          </div>
          <div className={`summary-card-icon ${card.type}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
