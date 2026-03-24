import { TestCaseObject } from '../modules/TestCase';

export async function loadTestCases(): Promise<TestCaseObject[]> {
    try {
        const res = await fetch('/api/storage');
        const parsed = (await res.json()) as TestCaseObject[];
        return parsed.map(
            (tc) =>
                new TestCaseObject(tc.key, tc.summary, tc.description, tc.steps, tc.tags)
        );
    } catch (err) {
        console.error('Failed to load test cases:', err);
        return [];
    }
}

async function persist(list: TestCaseObject[]): Promise<void> {
    // Strip the blank sentinel before saving
    const toSave = list.filter((tc) => tc.key !== 'blank');
    try {
        await fetch('/api/storage', {
            method: 'POST',
            body: JSON.stringify(toSave, null, 2),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error('Failed to save test cases:', err);
    }
}

export async function saveTestCases(list: TestCaseObject[]): Promise<void> {
    await persist(list);
}

export function addTestCase(list: TestCaseObject[], tc: TestCaseObject): TestCaseObject[] {
    const updated = [...list.filter((t) => t.key !== 'blank'), tc];
    persist(updated); // Background save
    return updated;
}

export function updateTestCase(list: TestCaseObject[], tc: TestCaseObject): TestCaseObject[] {
    const updated = list.map((t) => (t.key === tc.key ? tc : t));
    persist(updated); // Background save
    return updated;
}

export function deleteTestCase(list: TestCaseObject[], key: string): TestCaseObject[] {
    const updated = list.filter((t) => t.key !== key && t.key !== 'blank');
    persist(updated); // Background save
    return updated;
}
