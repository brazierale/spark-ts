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
  sortId: number;
  summary: string;
  description: string;
  steps: StepObject[];
  tags: string[];
  disabled: boolean;

  constructor(
    key: string,
    sortId: number,
    summary: string,
    description: string,
    steps: StepObject[],
    tags: string[]
  )
  {
    this.key = key;
    this.sortId = sortId;
    this.summary = summary;
    this.description = description;
    this.steps = steps;
    this.tags = tags;
    this.disabled = false;
  }
}

export function blankTestCase() {
  return new TestCaseObject(
    'blank',
    9999999,
    '',
    '',
    [],
    [],
  );
}
