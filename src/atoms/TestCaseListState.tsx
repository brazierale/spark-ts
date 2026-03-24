import { atom } from 'recoil';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { loadTestCases } from '../services/storage';

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: [...loadTestCases(), blankTestCase()],
});

export default testCaseListState;
