import React from 'react';
import { FileText, LayoutDashboard, PlusCircle, ListOrdered } from 'lucide-react';


/**
 * AppHeader Component (PRD 7.1)
 * Menampilkan nama aplikasi, navigasi utama, dan identitas Telkom University.
 *
 * Props:
 * - appName: string (nama aplikasi)
 * - menuItems: Array<{ id: string, label: string, icon?: any }> (daftar menu navigasi)
 * - activeMenu: string (id menu yang aktif)
 * - onSelectMenu: function (callback saat menu diklik)
 */
export default function AppHeader({
  appName = 'ProkerFlow',
  menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tambah', label: 'Buat Proposal' },
    { id: 'daftar', label: 'Daftar Proposal' }
  ],
  activeMenu = 'dashboard',
  onSelectMenu
}) {
  const getIcon = (id) => {
    switch (id) {
      case 'dashboard':
        return <LayoutDashboard size={16} />;
      case 'tambah':
        return <PlusCircle size={16} />;
      case 'daftar':
        return <ListOrdered size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <header className="header-wrapper">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-logo-icon">
            <FileText size={22} />
          </div>
          <div className="brand-meta">
            <div className="brand-title">
              {appName}
              <span className="brand-badge">Telkom University</span>
            </div>
            <span className="brand-subtitle">
              Generator Proposal Program Kerja Himpunan Mahasiswa
            </span>
          </div>
        </div>

        <nav className="header-nav" aria-label="Navigasi Utama">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectMenu && onSelectMenu(item.id)}
              >
                {item.icon || getIcon(item.id)}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="nav-count-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
