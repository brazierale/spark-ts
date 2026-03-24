import { atom, selector } from 'recoil';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { loadTestCases } from '../services/storage';

const initialTestCaseList = selector({
  key: 'initialTestCaseList',
  get: async () => {
    const cases = await loadTestCases();
    return [...cases, blankTestCase()];
  },
});

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: initialTestCaseList,
});

export default testCaseListState;
