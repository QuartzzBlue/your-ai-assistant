import { atom } from 'recoil';

const savedState = atom({
  key: 'saved',
  default: false,
});

export default savedState;