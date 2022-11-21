import { atom, selector } from 'recoil';
import axios, { AxiosPromise } from 'axios';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { apiUrl } from '../config';

export class TestCaseService {
  constructor(private url: string) {}

  public getTestCases = (): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      method: 'GET',
      url: `/api/testCases`,
    });
  };
}

const api = new TestCaseService(apiUrl);

const getTestCasesFromRequest = async () => {
  let testCases: TestCaseObject[] = [];
  try {
    const res = await api.getTestCases();

    if (res.data.data.length > 0) {
      testCases = res.data.data.map(
        (testCase: TestCaseObject) =>
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
  } catch (err) {
    // an empty list will be used to indicate an error in loading
    console.log(err);
    return [];
  }
};

const getTestCaseList = selector({
  key: 'GetTestCaseList',
  get: getTestCasesFromRequest,
});

const testCaseListState = atom<TestCaseObject[]>({
  key: 'testCaseList',
  default: getTestCaseList,
});

export default testCaseListState;
