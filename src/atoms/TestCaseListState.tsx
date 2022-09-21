import { atom, selector } from 'recoil';
import axios from 'axios';
import { blankTestCase, TestCaseObject } from "../modules/TestCase";
import { apiUrl } from '../config'

const getTestCaseList = selector({
  key: 'GetTestCaseList',
  get: async () => {
    let testCases: TestCaseObject[] = [];
    try {
      const res = await axios.get(`${apiUrl}/api/testCases`)

    if (res.data.data.length > 0) {
      testCases = res.data.data.map((testCase: TestCaseObject) =>
        new TestCaseObject(
          testCase.key,
          testCase.summary,
          testCase.description,
          testCase.steps,
          testCase.tags
        )
      );
    }
    testCases.push(blankTestCase());
    return testCases;  
    }
    catch {
      // an empty list will be used to indicate an error in loading
      return []
    }
  }
});

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: getTestCaseList
})

export default testCaseListState;
