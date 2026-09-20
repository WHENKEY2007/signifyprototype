import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { DesktopEditorialLayout } from './components/DesktopEditorialLayout';
import { BottomNav, NavTab } from './components/BottomNav';
import { Home } from './pages/Home';
import { SignMode } from './pages/SignMode';
import { SpeakMode } from './pages/SpeakMode';
import { ConversationMode, ConversationMessage } from './pages/ConversationMode';
import { HelpMode } from './pages/HelpMode';
import { Settings } from './pages/Settings';

export type ScreenType =
  | 'home'
  | 'sign'
  | 'speak'
  | 'conversation'
  | 'help'
  | 'settings';

const INITIAL_MESSAGES: ConversationMessage[] = [
  {
    id: 'msg-1',
    sender: 'signer',
    text: 'Hello',
    sign: 'HELLO',
    timestamp: Date.now() - 60000,
  },
  {
    id: 'msg-2',
    sender: 'speaker',
    text: 'Nice to meet you!',
    timestamp: Date.now() - 40000,
  },
  {
    id: 'msg-3',
    sender: 'signer',
    text: 'Where are you going?',
    timestamp: Date.now() - 20000,
  },
];

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [messages, setMessages] = useState<ConversationMessage[]>(INITIAL_MESSAGES);
  const [preferredSign, setPreferredSign] = useState<string | undefined>(undefined);
  const [forceUncertain, setForceUncertain] = useState<boolean>(false);

  // Message Handler for Conversation
  const handleAddMessage = (sender: 'signer' | 'speaker', text: string, sign?: string) => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      sign,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleClearConversation = () => {
    setMessages([]);
  };

  // Flow Navigation Handlers
  const handleSelectSign = (signKey?: string) => {
    setPreferredSign(signKey);
    setForceUncertain(false);
    setCurrentScreen('sign');
  };

  const handleSelectSpeak = () => {
    setCurrentScreen('speak');
  };

  const handleSelectConversation = () => {
    setCurrentScreen('conversation');
  };

  const handleSelectHelp = () => {
    setCurrentScreen('help');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackToHome = () => {
    setForceUncertain(false);
    setPreferredSign(undefined);
    setCurrentScreen('home');
  };

  // Add recognized sign / spoken text into live conversation
  const handleAddToConversation = (text: string) => {
    handleAddMessage(currentScreen === 'sign' ? 'signer' : 'speaker', text);
    setCurrentScreen('conversation');
  };

  // Desktop shortcuts
  const handleDesktopSelectDemoSign = (signKey: string) => {
    handleSelectSign(signKey);
  };

  const handleDesktopTriggerUncertain = () => {
    setForceUncertain(true);
    setCurrentScreen('sign');
  };

  const handleDesktopResetDemo = () => {
    setMessages(INITIAL_MESSAGES);
    setForceUncertain(false);
    setPreferredSign(undefined);
    setCurrentScreen('home');
  };

  const handleDesktopNavigateTab = (tab: NavTab) => {
    setCurrentScreen(tab);
  };

  // Current active bottom nav tab
  const getActiveTab = (): NavTab => {
    if (currentScreen === 'home') return 'home';
    if (currentScreen === 'sign') return 'sign';
    if (currentScreen === 'conversation') return 'conversation';
    if (currentScreen === 'help') return 'help';
    return 'home';
  };

  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'sign') {
      handleSelectSign();
    } else {
      setCurrentScreen(tab);
    }
  };

  // Render Screen Content inside the phone frame
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            onSelectSign={() => handleSelectSign()}
            onSelectSpeak={handleSelectSpeak}
            onSelectConversation={handleSelectConversation}
            onSelectHelp={handleSelectHelp}
            onSettings={handleOpenSettings}
          />
        );

      case 'sign':
        return (
          <SignMode
            onBack={handleBackToHome}
            onAddToConversation={handleAddToConversation}
            preferredSign={preferredSign}
            forceUncertain={forceUncertain}
          />
        );

      case 'speak':
        return (
          <SpeakMode
            onBack={handleBackToHome}
            onAddToConversation={handleAddToConversation}
          />
        );

      case 'conversation':
        return (
          <ConversationMode
            messages={messages}
            onAddMessage={handleAddMessage}
            onClearConversation={handleClearConversation}
          />
        );

      case 'help':
        return <HelpMode onBack={handleBackToHome} />;

      case 'settings':
        return <Settings onBack={handleBackToHome} />;

      default:
        return (
          <Home
            onSelectSign={() => handleSelectSign()}
            onSelectSpeak={handleSelectSpeak}
            onSelectConversation={handleSelectConversation}
            onSelectHelp={handleSelectHelp}
          />
        );
    }
  };

  const showBottomNav =
    currentScreen === 'home' ||
    currentScreen === 'sign' ||
    currentScreen === 'conversation' ||
    currentScreen === 'help';

  return (
    <DesktopEditorialLayout
      activeScreen={currentScreen.toUpperCase()}
      onNavigateTab={handleDesktopNavigateTab}
      onSelectDemoSign={handleDesktopSelectDemoSign}
      onTriggerUncertain={handleDesktopTriggerUncertain}
      onResetDemo={handleDesktopResetDemo}
    >
      <PhoneFrame>
        <div className="flex-1 w-full flex flex-col justify-between overflow-hidden bg-black text-white">
          {renderScreenContent()}
          {showBottomNav && (
            <BottomNav activeTab={getActiveTab()} onSelectTab={handleSelectTab} />
          )}
        </div>
      </PhoneFrame>
    </DesktopEditorialLayout>
  );
};

export default App;
