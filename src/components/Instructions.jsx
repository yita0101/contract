import React from 'react';
import { useTranslation } from 'react-i18next';
import './Instructions.css';

function Instructions() {
  const { t } = useTranslation();

  return (
    <div className="instructions">
      <h2>{t('instructionsTitle')}</h2>
      <p className="warning">{t('warning')}</p>
      <ol>
        {t('instructions', { returnObjects: true }).map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <p className="note">{t('note')}</p>
    </div>
  );
}

export default Instructions;