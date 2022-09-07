import { atom, selector } from 'recoil';
import axios from 'axios';
import { blankTestCase, TestCaseObject } from "../modules/TestCase";

const baseUrl = "http://localhost:3001"

const getTestCaseList = selector({
  key: 'GetTestCaseList',
  get: async () => {
    let testCases: TestCaseObject[] = [];
    const res = await axios.get(`${baseUrl}/api/testCases`)

    console.log(res)
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
    console.log(testCases);
    return testCases;
    }
});

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: getTestCaseList
})

export default testCaseListState;
