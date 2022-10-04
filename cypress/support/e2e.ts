import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(
        selector: string,
        args?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<JQuery<HTMLElement>>;
      getBySelContaining(
        selector: string,
        contains: string,
        args?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<JQuery<HTMLElement>>;
      delete(detailItem: string, description: string): void;
      selectTestCase(title: string): Chainable<Element>;
      mockGetTestCaseList(fixture: string): void;
      mockAddTestCase(fixture: string): void;
      mockDeleteTestCase(fixture: string): void;
      mockMoveTestCase(fixture: string): void;
      mockUpdateTestCase(fixture: string): void;
    }
  }
}
