import { atom } from 'recoil';
import { blankTestCase, TestCaseObject } from "../modules/TestCase";

const defaultTestCases: TestCaseObject[] = [
  blankTestCase()
];

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: defaultTestCases
})

export default testCaseListState;
