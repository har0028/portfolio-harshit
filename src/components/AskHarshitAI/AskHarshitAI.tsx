import React, { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { FlyingAssistantRobot } from '../3d/FlyingAssistantRobot';

export const AskHarshitAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Window Panel */}
      <ChatWindow
        isOpen={isOpen && !isMinimized}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsMinimized(true)}
      />

      {/* Futuristic 3D Flying Assistant Robot in bottom-right */}
      <FlyingAssistantRobot
        onClick={handleToggle}
        isChatOpen={isOpen && !isMinimized}
      />
    </>
  );
};
