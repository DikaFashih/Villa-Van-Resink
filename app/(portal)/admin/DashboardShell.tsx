"use client";

import { LucideIcon, LogOut } from "lucide-react";

interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface Props {
  portalLabel: string;
  roleLabel: string;
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  userName: string;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  portalLabel,
  roleLabel,
  navItems,
  activeTab,
  onTabChange,
  userName,
  onLogout,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-20 lg:flex">
      {/* Sidebar — desktop */}
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-[#23412D] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="font-heading text-lg">{portalLabel}</p>
          <span className="mt-1 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70">
            {roleLabel}
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                  active
                    ? "border-l-2 border-[#C9A66B] bg-white/10 font-medium"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.5} />
                <span className="flex-1">{item.label}</span>
                {!!item.badge && item.badge > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-medium text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="flex-1 truncate text-sm">{userName}</span>
            <button onClick={onLogout} className="text-white/60 hover:text-white" title="Keluar">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Nav — mobile, scroll horizontal di atas */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#8A6E4A]/20 bg-white px-4 py-3 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`relative flex flex-none items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs transition ${
                active ? "bg-[#23412D] text-white" : "bg-[#F7F2EA] text-[#23412D]"
              }`}
            >
              <Icon size={14} strokeWidth={1.5} />
              {item.label}
              {!!item.badge && item.badge > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={onLogout}
          className="ml-auto flex flex-none items-center gap-1 whitespace-nowrap rounded-full bg-red-50 px-3 py-2 text-xs text-red-600"
          title="Keluar"
        >
          <LogOut size={14} strokeWidth={1.5} />
          Keluar
        </button>
      </div>

      {/* Konten */}
      <div className="flex-1">
        <header className="hidden items-center justify-between border-b border-[#8A6E4A]/20 bg-white px-8 py-5 lg:flex">
          <p className="font-heading text-xl text-[#23412D]">
            {navItems.find((n) => n.key === activeTab)?.label}
          </p>
          <span className="text-sm text-neutral-500">{userName}</span>
        </header>

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
