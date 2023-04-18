import { atom } from 'recoil';

const sessionKeyState = atom({
  key: 'sessionKey',
  default: '',
});

export default sessionKeyState;