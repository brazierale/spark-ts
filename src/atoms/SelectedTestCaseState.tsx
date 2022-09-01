import { atom } from 'recoil';
import { TestCaseObject } from "../modules/TestCase";

const selectedTestCaseState = atom<TestCaseObject>({
  key: 'selectedTestCase',
  default: new TestCaseObject(
    'keyTest',
      'Default test case',
      'This is displayed but actually no test case is selected by default',
      [],
      [],
  )
})

export default selectedTestCaseState;
