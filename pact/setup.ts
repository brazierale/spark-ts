import path from 'path';
import axios from 'axios';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { TestCaseService } from '../src/atoms/TestCaseListState';
const response = require('getResponse.json');

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'sparkClient',
  provider: 'sparkApi',
});

const EXPECTED_BODY = response;

describe('GET test cases', () => {
  it('returns an HTTP 200 and a list of test cases', () => {
    provider
      .given('I have a list of test case')
      .uponReceiving('a request for all test cases')
      .withRequest({
        method: 'GET',
        path: '/testCases',
      })
      .willRespondWith({
        status: 200,
        body: EXPECTED_BODY,
      });

    return provider.executeTest(async (mockserver) => {
      const testCaseService = new TestCaseService(mockserver.url);
      const response = testCaseService.getTestCases();

      expect(response).to.deep.eq(EXPECTED_BODY);
    });
  });
});
