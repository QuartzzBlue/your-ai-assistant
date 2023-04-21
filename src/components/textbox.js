import React, { useState, useRef } from 'react';
import { Input, Button, Spin, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
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
  const [api, contextHolder] = notification.useNotification();

  const saveTextSource = async ()=> {
    if(saved) {
      resetSourceText();
    } else {
      showLoadingUI();
      try {
        await saveTextEmbedddings();
        setSaved(true);
        hideLoadingUI();
        openNotification('info')
      } catch (error) {
        hideLoadingUI();
        resetSourceText();
        openNotification('warning')
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

  const resetSourceText = () => {
    setSourceText("");
    setSaved(false);
    setSessionKey("");
  }

  const onChangeText = (e) => {
    setSourceText(e.target.value);
  }

  const openNotification = (type) => {
    const msg = {
      warning: {
        message: '당신의 AI Bot을 만드는 데 실패했어요' ,
        description: '조금 시간이 지난 후에 다시 시도해주세요.'
      },
      info: {
        message: '당신의 AI Bot이 생성되었어요' ,
        description: '당신의 물음에 답할 준비가 되었습니다.\n대화를 시작하시겠어요?'
      }
    };
    api[type]({
      message: msg[type].message,
      description: msg[type].description,
      icon: (
        type === 'info' && <SmileOutlined style={{ color: '#108ee9' }}/>
      )
    });
  };

  return (
    <>
      {contextHolder}
      <Spin tip="당신의 AI Bot을 만드는 중..." spinning={loading}>
        <TextArea placeholder="maxLength is 3000" maxLength={3000} className="textbox-area" style={{ height: '600px' }} onChange={onChangeText} value={sourceText}/>
      </Spin>
      <Button onClick={saveTextSource} className="blue-6 save-button" ref={saveBtnRef}>{saved ? 'RESET TEXT' : 'SAVE'}</Button>
    </>
  )
}
