import { atom } from 'recoil';
import { TestCaseObject } from "../modules/TestCase";

const selectedTestCaseState = atom<TestCaseObject>({
  key: 'selectedTestCase',
  default: new TestCaseObject(
    'keyTest',
      1,
      'I am a test case summary',
      'This is a longer piece of text because this is a description field so we want more',
      [],
      [],
  )
})

export default selectedTestCaseState;
