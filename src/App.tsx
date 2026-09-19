import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { DesktopEditorialLayout } from './components/DesktopEditorialLayout';
import { Header } from './components/Header';
import { Intro } from './pages/Intro';
import { Home } from './pages/Home';
import { ModeSelection } from './pages/ModeSelection';
import { DemoMode } from './pages/DemoMode';
import { Interpreter } from './pages/Interpreter';
import { SentenceBuilder } from './pages/SentenceBuilder';
import { SpeechOutput } from './pages/SpeechOutput';
import { SpeechToText } from './pages/SpeechToText';
import { UncertainState } from './pages/UncertainState';
import { Success } from './pages/Success';
import { Settings } from './pages/Settings';
import { DEMO_SCENARIOS } from './data/demoScenarios';

export type ScreenType =
  | 'intro'
  | 'home'
  | 'mode_selection'
  | 'demo_mode'
  | 'interpreter'
  | 'sentence_builder'
  | 'speech_output'
  | 'speech_to_text'
  | 'uncertain'
  | 'success'
  | 'settings';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('intro');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('hospital');
  const [collectedSigns, setCollectedSigns] = useState<string[]>([]);
  const [finalDeliveredMessage, setFinalDeliveredMessage] = useState<string>(
    DEMO_SCENARIOS.hospital.finalSentence
  );

  // Quick jump directly to a scenario from the judge desktop shortcuts
  const handleSelectScenarioShortcut = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCollectedSigns([]);
    setCurrentScreen('interpreter');
  };

  const handleTriggerUncertainShortcut = () => {
    setCurrentScreen('uncertain');
  };

  const handleResetFlow = () => {
    setCollectedSigns([]);
    setActiveScenarioId('hospital');
    setCurrentScreen('home');
  };

  // Flow handlers
  const handleStartExperience = () => {
    setCurrentScreen('home');
  };

  const handleStartInterpreting = () => {
    setCurrentScreen('mode_selection');
  };

  const handleTryDemo = () => {
    setCurrentScreen('demo_mode');
  };

  const handleSelectSignToSpeech = () => {
    setCurrentScreen('demo_mode');
  };

  const handleSelectSpeechToText = () => {
    setCurrentScreen('speech_to_text');
  };

  const handleSelectScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCollectedSigns([]);
    setCurrentScreen('interpreter');
  };

  const handleAddSignToSentence = (sign: string) => {
    setCollectedSigns((prev) => (prev.includes(sign) ? prev : [...prev, sign]));
  };

  const handleCompleteSentence = (signs: string[]) => {
    setCollectedSigns(signs);
    setCurrentScreen('sentence_builder');
  };

  const handleSpeakMessage = (sentence: string) => {
    setFinalDeliveredMessage(sentence);
    setCurrentScreen('speech_output');
  };

  const handleFinishDelivery = () => {
    setCurrentScreen('success');
  };

  const handleStartAgain = () => {
    setCollectedSigns([]);
    setCurrentScreen('demo_mode');
  };

  const handleBackToHome = () => {
    setCollectedSigns([]);
    setCurrentScreen('home');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const getActiveScenario = () => {
    return DEMO_SCENARIOS[activeScenarioId] || DEMO_SCENARIOS.hospital;
  };

  // Render active screen inside the phone frame
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'intro':
        return <Intro onStart={handleStartExperience} />;

      case 'home':
        return (
          <>
            <Header onSettings={handleOpenSettings} />
            <Home
              onStartInterpreting={handleStartInterpreting}
              onTryDemo={handleTryDemo}
            />
          </>
        );

      case 'mode_selection':
        return (
          <>
            <Header
              title="CHANNELS"
              onBack={() => setCurrentScreen('home')}
              onSettings={handleOpenSettings}
            />
            <ModeSelection
              onSelectSignToSpeech={handleSelectSignToSpeech}
              onSelectSpeechToText={handleSelectSpeechToText}
            />
          </>
        );

      case 'demo_mode':
        return (
          <>
            <Header
              title="SCENARIOS"
              onBack={() => setCurrentScreen('mode_selection')}
              onSettings={handleOpenSettings}
            />
            <DemoMode onSelectScenario={handleSelectScenario} />
          </>
        );

      case 'interpreter':
        return (
          <>
            <Header
              title="INTERPRETER"
              scenarioName={getActiveScenario().title}
              onBack={() => setCurrentScreen('demo_mode')}
              onSettings={handleOpenSettings}
            />
            <Interpreter
              scenarioId={activeScenarioId}
              collectedSigns={collectedSigns}
              onAddSignToSentence={handleAddSignToSentence}
              onCompleteSentence={handleCompleteSentence}
              onTriggerUncertainState={() => setCurrentScreen('uncertain')}
            />
          </>
        );

      case 'sentence_builder':
        return (
          <>
            <Header
              title="BUILDER"
              scenarioName={getActiveScenario().title}
              onBack={() => setCurrentScreen('interpreter')}
              onSettings={handleOpenSettings}
            />
            <SentenceBuilder
              scenarioId={activeScenarioId}
              collectedSigns={collectedSigns}
              onAddMoreSigns={() => setCurrentScreen('interpreter')}
              onClearSigns={() => setCollectedSigns([])}
              onSpeakMessage={handleSpeakMessage}
            />
          </>
        );

      case 'speech_output':
        return (
          <>
            <Header
              title="SPEECH"
              scenarioName={getActiveScenario().title}
              onBack={() => setCurrentScreen('sentence_builder')}
              onSettings={handleOpenSettings}
            />
            <SpeechOutput
              messageText={finalDeliveredMessage}
              onFinishDelivery={handleFinishDelivery}
            />
          </>
        );

      case 'speech_to_text':
        return (
          <>
            <Header
              title="SPEECH → TEXT"
              onBack={() => setCurrentScreen('mode_selection')}
              onSettings={handleOpenSettings}
            />
            <SpeechToText onBackToHome={handleBackToHome} />
          </>
        );

      case 'uncertain':
        return (
          <>
            <Header
              title="SAFETY GATE"
              onBack={() => setCurrentScreen('interpreter')}
              onSettings={handleOpenSettings}
            />
            <UncertainState
              signName={getActiveScenario().lowConfidenceSign?.sign || 'WATER'}
              confidence={getActiveScenario().lowConfidenceSign?.confidence || 58}
              onTryAgain={() => setCurrentScreen('interpreter')}
              onContinueAnyway={() => {
                handleAddSignToSentence(getActiveScenario().lowConfidenceSign?.sign || 'WATER');
                setCurrentScreen('sentence_builder');
              }}
            />
          </>
        );

      case 'success':
        return (
          <>
            <Header onSettings={handleOpenSettings} />
            <Success
              deliveredMessage={finalDeliveredMessage}
              onStartAgain={handleStartAgain}
              onBackToHome={handleBackToHome}
            />
          </>
        );

      case 'settings':
        return <Settings onBack={() => setCurrentScreen('home')} />;

      default:
        return <Home onStartInterpreting={handleStartInterpreting} onTryDemo={handleTryDemo} />;
    }
  };

  return (
    <DesktopEditorialLayout
      activeScenarioId={activeScenarioId}
      onSelectScenarioShortcut={handleSelectScenarioShortcut}
      onTriggerUncertainShortcut={handleTriggerUncertainShortcut}
      onResetFlow={handleResetFlow}
      currentScreenName={currentScreen.toUpperCase()}
    >
      <PhoneFrame>
        {renderScreenContent()}
      </PhoneFrame>
    </DesktopEditorialLayout>
  );
};

export default App;
