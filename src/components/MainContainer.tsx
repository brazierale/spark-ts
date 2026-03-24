import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import TestCaseList from './TestCaseList';
import DetailPane from './DetailPane';
import testCaseListState from '../atoms/TestCaseListState';
import selectedTestCaseState from '../atoms/SelectedTestCaseState';
import { blankTestCase, TestCaseObject } from '../modules/TestCase';
import { generateKey } from '../modules/KeyGen';
import {
  updateTestCase,
  addTestCase as storageAdd,
  deleteTestCase as storageDelete,
  saveTestCases,
  exportToJSON,
  importFromJSON,
} from '../services/storage';

const MainContainer = () => {
  const [testCaseList, setTestCaseListState] = useRecoilState(testCaseListState);
  const [selectedTestCase, setSelectedTestCase] = useRecoilState(selectedTestCaseState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateTestCaseByKey = (testCase: TestCaseObject) => {
    const updated = updateTestCase(testCaseList, testCase);
    setTestCaseListState(updated);
  };

  const addTestCase = (testCase: TestCaseObject) => {
    const newTestCase = { ...testCase, key: generateKey() };
    const withoutBlank = testCaseList.filter((tc) => tc.key !== 'blank');
    const index = withoutBlank.findIndex((tc) => tc.key === testCase.key);
    const inserted = [
      ...withoutBlank.slice(0, index),
      newTestCase,
      ...withoutBlank.slice(index),
      blankTestCase(),
    ];
    saveTestCases(inserted);
    setTestCaseListState(inserted);
    setSelectedTestCase(blankTestCase());
  };

  const deleteTestCaseByKey = (key: string) => {
    const index = testCaseList.findIndex((tc) => tc.key === key);
    const updated = storageDelete(testCaseList, key);
    const withBlank = [...updated, blankTestCase()];
    setTestCaseListState(withBlank);
    // select next item or blank
    const next = testCaseList[index + 1] ?? blankTestCase();
    setSelectedTestCase(next);
  };

  const setSelectedTestCaseByKey = (key: string) => {
    const found = testCaseList.find((tc) => tc.key === key);
    if (found) setSelectedTestCase(found);
  };

  const updateSelectedTestCase = (testCase: TestCaseObject) => {
    setSelectedTestCase(testCase);
  };

  const replaceTestCaseList = (newList: TestCaseObject[]) => {
    saveTestCases(newList);
    setTestCaseListState(newList);
  };

  // ── Export ──────────────────────────────────────────────────────────────
  const handleExport = () => {
    exportToJSON(testCaseList);
  };

  // ── Import ──────────────────────────────────────────────────────────────
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importFromJSON(file);
      setTestCaseListState([...imported, blankTestCase()]);
    } catch (err) {
      console.error('Import failed:', err);
    }
    // reset so the same file can be re-imported if needed
    e.target.value = '';
  };

  return (
    <div className='Main-container'>
      <div className='Import-export-bar'>
        <button className='Import-export-button' onClick={handleExport}>
          Export JSON
        </button>
        <button className='Import-export-button' onClick={handleImportClick}>
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='.json'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <div className='Pane-row'>
        <div className='Test-case-list-container'>
          <TestCaseList
            testCaseList={testCaseList}
            updateTestCaseByKey={updateTestCaseByKey}
            addTestCase={addTestCase}
            deleteTestCaseByKey={deleteTestCaseByKey}
            selectedTestCase={selectedTestCase}
            setSelectedTestCaseByKey={setSelectedTestCaseByKey}
            updateSelectedTestCase={updateSelectedTestCase}
            setTestListCaseState={setTestCaseListState}
            replaceTestCaseListApi={replaceTestCaseList}
          />
        </div>
        <div className='Detail-pane-container'>
          <DetailPane
            selectedTestCase={selectedTestCase}
            updateSelectedTestCase={updateSelectedTestCase}
            updateTestCaseByKey={updateTestCaseByKey}
            addTestCase={addTestCase}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
