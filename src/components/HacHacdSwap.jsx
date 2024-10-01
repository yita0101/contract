import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './HacHacdSwap.css';
import init,{hacash_transfer} from "hacash_web_api"

function HacHacdSwap() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    address1: '',
    hacdInput1: '',
    hacAmount1: '',
    address2: '',
    hacdInput2: '',
    hacAmount2: '',
    paymentAddress: '',
    exchangeRate: '',
    transactionTimeLimit: ''
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    // 填充测试数据
    setFormData({
      address1: "1JtxZv81czJfTKMvyBZWWYtuhaMmcHF3J8",
      hacdInput1: "YIYBAB,YAYBAB",
      hacAmount1: "1:248",
      address2: "14tDZi1bK3UJ8BbdGZK9ayopcT5zuMep9W",
      hacdInput2: "SYSBAY",
      hacAmount2: "2:248",
      paymentAddress: "18FqRgsV52ZLVZ7bng8Tsxh3EqzmCehZj1",
      exchangeRate: "1:245",
      transactionTimeLimit: "1727597901"
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHacHacdSwapTransaction(formData);
  };

  const createHacHacdSwapTransaction = async (data) => {
    console.log('创建HAC和HACD原子互换交易', data);
    try {
      await init(); // 确保 WASM 模块已初始化

      // 设置默认值
      const defaultFee = "ㄜ1:245"; // 默认手续费
      const defaultTimeLimit = 0; // 默认1小时后过期

      const result = await hacash_transfer(
        data.address1||"",
        data.hacdInput1||"",
        data.hacAmount1||"",
        data.address2||"",
        data.hacdInput2||"",
        data.hacAmount2||"",
        data.paymentAddress || data.address1, // 如果未填写支付地址，使用地址一
        data.exchangeRate || defaultFee, // 如果未填写兑换率（手续费），使用默认值
        BigInt(data.transactionTimeLimit || defaultTimeLimit) // 如果未填写时间限制，使用默认值
      );

      let resultJson = JSON.parse(result)
      if(resultJson.code == 1){
        setResult(resultJson.data)
        console.log(resultJson);
      }else{
        alert(resultJson.message)
      }

    } catch (error) {
      console.error('交易创建失败:', error);
      // 这里可以添加错误提示
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('复制成功');
    }, (err) => {
      console.error('复制失败: ', err);
    });
  };

  return (
    <div className="hac-hacd-swap">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleInputChange}
          placeholder={t('address1')}
        />
        <input
          type="text"
          name="hacdInput1"
          value={formData.hacdInput1}
          onChange={handleInputChange}
          placeholder={t('hacdInput1')}
        />
        <input
          type="text"
          name="hacAmount1"
          value={formData.hacAmount1}
          onChange={handleInputChange}
          placeholder={t('hacAmount1')}
        />
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleInputChange}
          placeholder={t('address2')}
        />
        <input
          type="text"
          name="hacdInput2"
          value={formData.hacdInput2}
          onChange={handleInputChange}
          placeholder={t('hacdInput2')}
        />
        <input
          type="text"
          name="hacAmount2"
          value={formData.hacAmount2}
          onChange={handleInputChange}
          placeholder={t('hacAmount2')}
        />
        <input
          type="text"
          name="paymentAddress"
          value={formData.paymentAddress}
          onChange={handleInputChange}
          placeholder={t('paymentAddress')}
        />
        <input
          type="text"
          name="exchangeRate"
          value={formData.exchangeRate}
          onChange={handleInputChange}
          placeholder={t('exchangeRate')}
        />
        <input
          type="text"
          name="transactionTimeLimit"
          value={formData.transactionTimeLimit}
          onChange={handleInputChange}
          placeholder={t('transactionTimeLimit')}
        />
        <button type="submit">{t('submitButton')}</button>
      </form>

      {result && (
        <div className="result-container">
          <h2>{t('successTitle')}</h2>
          <p>{t('successDescription')}</p>
          
          <div className="button-group">
            <button onClick={() => copyToClipboard(result.txbody)}>{t('copyTxbody')}</button>
            <button onClick={() => copyToClipboard(result.txhash)}>{t('copyTxhash')}</button>
            <a href={`https://explorer.hacash.org/tx/${result.txhash}`} target="_blank" rel="noopener noreferrer">
              {t('viewInExplorer')}
            </a>
          </div>

          <div className="transaction-info">
            <p className="fee">
              <span className="label">[{t('fee')}]</span>
              <span className="value">{formData.exchangeRate || 'ㄜ1:245'}</span>
            </p>
            <p className="txhash">
              <span className="label">[{t('txhash')}]</span>
              <span className="value">{result.txhash}</span>
            </p>
            <p className="timestamp">
              <span className="label">[{t('timestamp')}]</span>
              <span className="value">{result.timestamp}</span>
            </p>
          </div>

          <p>[{t('txbody')}]</p>
          <pre className="txbody">
            {result.txbody}
          </pre>
        </div>
      )}
    </div>
  );
}

export default HacHacdSwap;