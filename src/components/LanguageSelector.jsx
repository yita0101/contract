import React from 'react';
import { useTranslation } from 'react-i18next';
import '../LanguageSelector.css';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <select onChange={changeLanguage} value={i18n.language}>
        <option value="zh">中文</option>
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="ru">Русский</option>
        <option value="uk">Українська</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  );
}

export default LanguageSelector;