import React, { useState, useRef } from 'react';
import { Input, Button, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import '../css/textbox.css';
import savedState from '../atoms/savedState' 
import sessionKeyState from '../atoms/sessionKeyState' 
const { TextArea } = Input;

export default function Textbox() {
  const saveBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);  
  const [sourceText, setSourceText] = useState("");  
  const [saved, setSaved] = useRecoilState(savedState);
  const [sessionKey, setSessionKey] = useRecoilState(sessionKeyState);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const saveTextSource = async ()=> {
    if(saved) {
      setSourceText("");
      setSaved(false);
      setSessionKey("");
    } else {
      showLoadingUI();
      try {
        await saveTextEmbedddings();
        setSaved(true);
        hideLoadingUI();
      } catch (error) {
        // [TO-DO] API 에러 처리
      }
    }
  }
  
  const saveTextEmbedddings = () => {
    return new Promise((resolve, reject) => {
      const now = moment().format('YYYYMMDDHHmmss');
      setSessionKey(now);
      const data = {
        sessionKey: now,
        source: sourceText
      };
      axios.post(baseUrl + '/embedding', data)
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject();
      });
    })
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
