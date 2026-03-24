import { TestCaseObject } from '../modules/TestCase';

const STORAGE_KEY = 'spark-testcases';

export function loadTestCases(): TestCaseObject[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as TestCaseObject[];
        return parsed.map(
            (tc) =>
                new TestCaseObject(tc.key, tc.summary, tc.description, tc.steps, tc.tags)
        );
    } catch {
        return [];
    }
}

function persist(list: TestCaseObject[]): void {
    // Strip the blank sentinel before saving
    const toSave = list.filter((tc) => tc.key !== 'blank');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function saveTestCases(list: TestCaseObject[]): void {
    persist(list);
}

export function addTestCase(list: TestCaseObject[], tc: TestCaseObject): TestCaseObject[] {
    const updated = [...list.filter((t) => t.key !== 'blank'), tc];
    persist(updated);
    return updated;
}

export function updateTestCase(list: TestCaseObject[], tc: TestCaseObject): TestCaseObject[] {
    const updated = list.map((t) => (t.key === tc.key ? tc : t));
    persist(updated);
    return updated;
}

export function deleteTestCase(list: TestCaseObject[], key: string): TestCaseObject[] {
    const updated = list.filter((t) => t.key !== key && t.key !== 'blank');
    persist(updated);
    return updated;
}

export function exportToJSON(list: TestCaseObject[]): void {
    const toExport = list.filter((tc) => tc.key !== 'blank');
    const json = JSON.stringify(toExport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spark-testcases.json';
    a.click();
    URL.revokeObjectURL(url);
}

export function importFromJSON(file: File): Promise<TestCaseObject[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target?.result as string) as TestCaseObject[];
                const imported = parsed.map(
                    (tc) =>
                        new TestCaseObject(tc.key, tc.summary, tc.description, tc.steps, tc.tags)
                );
                persist(imported);
                resolve(imported);
            } catch {
                reject(new Error('Invalid JSON file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
