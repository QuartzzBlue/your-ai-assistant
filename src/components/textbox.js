import React from 'react';
import { Card, Input, Button, Layout } from 'antd';
import '../css/textbox.css';
const { TextArea } = Input;

export default function textbox() {
  const handleSendTextSource = () => {

  }

  return (
        <Card title="Source Text">
          <TextArea rows={20} placeholder="maxLength is 3000" maxLength={3000} />
          <Button onClick={handleSendTextSource} className="blue-6 save-button">SAVE</Button>
        </Card>
  )
}
