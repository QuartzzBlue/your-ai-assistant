import React, { useState, useRef } from 'react';
import { Input, Button, Spin } from 'antd';
import { useRecoilState } from 'recoil';
import '../css/textbox.css';
import savedState from '../atoms/savedState'
const { TextArea } = Input;

export default function Textbox() {
  const saveBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);  
  const [sourceText, setSourceText] = useState("");  
  const [saved, setSaved] = useRecoilState(savedState);

  const saveTextSource = () => {
    if(saved) {
      setSourceText("");
      setSaved(false);
    } else {
      showLoadingUI();
      setTimeout(() => { // 서버 API 연동
        setSaved(true);
        hideLoadingUI();
      }, 3000);
    }
  }

  const showLoadingUI = () => {
    saveBtnRef.current.disabled = true;
    setLoading(true);
  }

  const hideLoadingUI = () => {
    saveBtnRef.current.disabled = false;
    setLoading(false);
  }

  const onChangeText = (e) => {
    setSourceText(e.target.value);
  }

  return (
    <>
      <Spin tip="당신의 AI Bot을 만드는 중..." spinning={loading}>
        <TextArea placeholder="maxLength is 3000" maxLength={3000} className="textbox-area" style={{ height: '600px' }} onChange={onChangeText} value={sourceText}/>
      </Spin>
      <Button onClick={saveTextSource} className="blue-6 save-button" ref={saveBtnRef}>{saved ? 'RESET TEXT' : 'SAVE'}</Button>
    </>
  )
}
