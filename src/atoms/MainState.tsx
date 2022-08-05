import { atom } from 'recoil';

type MainState = {
  loading: boolean;
  saving: boolean;
  dragEnabled: boolean;
}

const mainState = atom<MainState>({
  key: 'mainState',
  default: {
    loading: false,
    saving: false,
    dragEnabled: false
  }
})

export default mainState;
