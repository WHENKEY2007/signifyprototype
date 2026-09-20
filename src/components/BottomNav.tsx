import React from 'react';
import { Home, Camera, MessageSquare, HelpCircle } from 'lucide-react';

export type NavTab = 'home' | 'sign' | 'conversation' | 'help';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    {
      id: 'home' as NavTab,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'sign' as NavTab,
      label: 'Sign',
      icon: Camera,
    },
    {
      id: 'conversation' as NavTab,
      label: 'Conversation',
      icon: MessageSquare,
    },
    {
      id: 'help' as NavTab,
      label: 'Help',
      icon: HelpCircle,
    },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="w-full bg-black/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2 flex items-center justify-around z-30 select-none shadow-lg flex-shrink-0"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            aria-selected={isActive}
            role="tab"
            className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl transition-all ${
              isActive
                ? 'text-brand-gold font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-brand-gold text-black shadow-[0_0_12px_rgba(255,208,0,0.4)] scale-105'
                  : 'text-neutral-400 hover:bg-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] mt-1 font-mono tracking-tight uppercase">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
