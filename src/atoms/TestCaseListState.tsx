import { atom } from 'recoil';
import { blankTestCase, TestCaseObject } from "../modules/TestCase";

const defaultTestCases: TestCaseObject[] = [
  new TestCaseObject(
    'keyTest',
      2000,
      'I am a test case summary',
      'This is a longer piece of text because this is a description field so we want more',
      [{id: 0, name: 'First step'},{id: 2, name: 'Step 2'}],
      ['tag', 'test'],
  ),
  new TestCaseObject(
    'test2',
      1000,
      '2nd test case to see what is going on',
      'This is a longer piece of text because this is a description field so we want more',
      [{id: 0, name: 'First step'}],
      ['tag'],
  ),
  blankTestCase()
];

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: defaultTestCases
})

export default testCaseListState;
