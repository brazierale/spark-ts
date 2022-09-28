import { atom } from 'recoil';
import { TestCaseObject } from '../modules/TestCase';

const selectedTestCaseState = atom<TestCaseObject>({
  key: 'selectedTestCase',
  default: new TestCaseObject('blank', '', '', [], []),
});

export default selectedTestCaseState;
