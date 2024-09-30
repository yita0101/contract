import React, { useState, useEffect } from 'react';
import './HacHacdSwap.css';
import init,{hacash_transfer} from "hacash_web_api"

function HacHacdSwap() {
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

//   useEffect(() => {
//     // 填充测试数据
//     setFormData({
//       address1: "1JtxZv81czJfTKMvyBZWWYtuhaMmcHF3J8",
//       hacdInput1: "YIYBAB,YAYBAB",
//       hacAmount1: "1:248",
//       address2: "14tDZi1bK3UJ8BbdGZK9ayopcT5zuMep9W",
//       hacdInput2: "SYSBAY",
//       hacAmount2: "2:248",
//       paymentAddress: "18FqRgsV52ZLVZ7bng8Tsxh3EqzmCehZj1",
//       exchangeRate: "1:245",
//       transactionTimeLimit: "1727597901"
//     });
//   }, []);

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

      console.log(result);
      let resultJson = JSON.parse(result)
      console.log('交易创建结果:', resultJson);
      setResult(resultJson);

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
      <h1>创建 HAC 与 HACD 混合转账交易</h1>
      <p>创建一笔 HAC 与 HACD 的原子混合转账交易。交易是原子事务，只可能同时成功，不会让其中转账一方失败。</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleInputChange}
          placeholder="地址一"
        />
        <input
          type="text"
          name="hacdInput1"
          value={formData.hacdInput1}
          onChange={handleInputChange}
          placeholder="转出HACD，输入逗号隔开的钻石字面值列表，最多转200个"
        />
        <input
          type="text"
          name="hacAmount1"
          value={formData.hacAmount1}
          onChange={handleInputChange}
          placeholder="转出HAC的数量 - HAC（单位：枚-:248）也可直接使用 'ㄜ1:248' 格式，例如：'0.25' or 'ㄜ25:246'"
        />
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleInputChange}
          placeholder="地址二"
        />
        <input
          type="text"
          name="hacdInput2"
          value={formData.hacdInput2}
          onChange={handleInputChange}
          placeholder="转出HACD，输入逗号隔开的钻石字面值列表，最多转200个"
        />
        <input
          type="text"
          name="hacAmount2"
          value={formData.hacAmount2}
          onChange={handleInputChange}
          placeholder="转出HAC数量 - HAC（单位：枚-:248）也可直接使用 'ㄜ1.248' 格式，例如：'0.25' or 'ㄜ25:246'"
        />
        <input
          type="text"
          name="paymentAddress"
          value={formData.paymentAddress}
          onChange={handleInputChange}
          placeholder="支付手续费地址"
        />
        <input
          type="text"
          name="exchangeRate"
          value={formData.exchangeRate}
          onChange={handleInputChange}
          placeholder="ㄜ1:245"
        />
        <input
          type="text"
          name="transactionTimeLimit"
          value={formData.transactionTimeLimit}
          onChange={handleInputChange}
          placeholder="选填：交易时间限"
        />
        <button type="submit">确认创建 HAC 和 HACD 原子互换交易</button>
      </form>

      {result && (
        <div className="result-container">
          <h2>HAC和HACD原子互换交易创建成功！</h2>
          <p>请复制下面 [交易体/txbody] 内容，先完成签名操作，然后去在线钱包提交交易:</p>
          
          <div className="button-group">
            <button onClick={() => copyToClipboard(result.txbody)}>复制 txbody</button>
            <button onClick={() => copyToClipboard(result.txhash)}>复制 txhash</button>
            <a href={`https://explorer.hacash.org/tx/${result.txhash}`} target="_blank" rel="noopener noreferrer">
              在区块浏览器中查看
            </a>
          </div>

          <div className="transaction-info">
            <p className="txhash">
              <span className="label">[交易哈希/txhash]</span>
              <span className="value">{result.txhash}</span>
            </p>
            <p className="timestamp">
              <span className="label">[时间戳/timestamp]</span>
              <span className="value">{result.timestamp}</span>
            </p>
          </div>

          <p>[交易体/txbody]</p>
          <pre className="txbody">
            {result.txbody}
          </pre>
{/* 
          <p>需要签名的地址:</p>
          <ul>
            {[formData.hacAddress, formData.hacdAddress, formData.paymentAddress].filter(Boolean).map((address, index) => (
              <li key={index}>
                {index + 1}). {address} &lt;需要签名&gt;
              </li>
            ))}
          </ul>

          <p>注意: 所有发生转出操作或支付手续费的地址都需要进行签名。</p> */}
        </div>
      )}
    </div>
  );
}

export default HacHacdSwap;