import { atom } from 'recoil';
import { blankTestCase, TestCaseObject } from "../modules/TestCase";

const defaultTestCases: TestCaseObject[] = [
  new TestCaseObject(
    'keyTest',
      1,
      'I am a test case summary',
      'This is a longer piece of text because this is a description field so we want more',
      [],
      [],
  ),
  new TestCaseObject(
    'test2',
      10,
      '2nd test case to see what is going on',
      'This is a longer piece of text because this is a description field so we want more',
      [],
      [],
  ),
  blankTestCase()
];

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: defaultTestCases
})

export default testCaseListState;
