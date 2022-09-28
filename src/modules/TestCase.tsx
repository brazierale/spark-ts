export class StepObject {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class TestCaseObject {
  key: string;
  summary: string;
  description: string;
  steps: StepObject[];
  tags: string[];
  disabled: boolean;

  constructor(
    key: string,
    summary: string,
    description: string,
    steps: StepObject[],
    tags: string[]
  ) {
    this.key = key;
    this.summary = summary;
    this.description = description;
    this.steps = steps;
    this.tags = tags;
    this.disabled = false;
  }
}

export function blankTestCase() {
  return new TestCaseObject('blank', '', '', [], []);
}
