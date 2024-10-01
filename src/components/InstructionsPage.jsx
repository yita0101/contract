import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Instructions.css';

function InstructionsPage() {
  const { t } = useTranslation();

  return (
    <div className="instructions-page">
      <h1>{t('instructionsTitle')}</h1>
      <div className="instructions">
        <p className="warning">{t('warning')}</p>
        <ol>
          {t('instructions', { returnObjects: true }).map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <p className="note">{t('note')}</p>
      </div>
      <Link to="/" className="back-link">{t('backToMain')}</Link>
    </div>
  );
}

export default InstructionsPage;