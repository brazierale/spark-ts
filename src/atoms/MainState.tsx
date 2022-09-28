import { atom } from 'recoil';

export const loading = atom<boolean>({
  key: 'loading',
  default: false,
});

export const saving = atom<boolean>({
  key: 'saving',
  default: false,
});

export const dragEnabled = atom<boolean>({
  key: 'dragEnabled',
  default: false,
});
