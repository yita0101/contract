import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Instructions.css';

function InstructionsPage() {
  const { t } = useTranslation();

  const createMarkup = (text) => {
    return {__html: text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    )};
  };

  const renderInstruction = (instruction, index) => {
    if (instruction.startsWith('  ')) {
      // 这是子项
      return <li key={index} className="sub-item" dangerouslySetInnerHTML={createMarkup(instruction.trim())} />;
    } else if (!instruction.endsWith(':')) {
      // 这是普通项
      return <li key={index} dangerouslySetInnerHTML={createMarkup(instruction)} />;
    } else {
      // 这是子标题
      return <h3 key={index}>{instruction}</h3>;
    }
  };

  return (
    <div className="instructions-page">
      <h1>{t('instructionsTitle')}</h1>
      <div className="instructions">
        <ol>
          {t('instructions', { returnObjects: true }).map((instruction, index) => renderInstruction(instruction, index))}
        </ol>
        <p className="note">{t('note')}</p>
      </div>
      <Link to="/" className="back-link">{t('backToMain')}</Link>
    </div>
  );
}

export default InstructionsPage;
