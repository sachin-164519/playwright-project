# End-to-End MCP Agent Workflow: Search Feature (User Story → Committed Automation)

This prompt guides a complete 7-step workflow using MCP servers and AI agents to go from user story to committed automation test scripts.

**Prerequisites:** Playwright MCP server connected; `playwright-test-planner`, `playwright-test-generator`, and `playwright-test-healer` agents configured; GitHub MCP server connected.

---

## Step 1: Read user story

I need to start a new testing workflow. Please read the user story from the file: `user-stories/search-feature-user-stories.md`.
Summarize the key requirements, acceptance criteria, and testing scope.

**Expected Output:**
- Summary of the user story
- List of acceptance criteria
- Application URL and test credentials (if any) — Application URL: `https://www.wikipedia.org` (no login required)

---

## Step 2: Create test plan

Based on the user story we just reviewed, use the `playwright-test-planner` agent to:
1. Read the application URL
2. Explore the application and understand all the workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan that covers all the acceptance criteria, including:
   - Happy path scenarios
   - Negative scenarios
   - Edge cases and boundary conditions
   - Navigation flow tests
   - UI element validation
4. Save the test plan as `specs/search-feature-test-plan.md`

Ensure each test scenario includes:
- Clear test case title
- Detailed step-by-step instructions
- Expected result for each step
- Test data requirements

**Expected Output:**
- Complete test plan markdown file saved to `specs/`
- Organized test scenarios with clear structure
- Browser exploration screenshots (if needed)

---

## Step 3: Perform exploratory testing

Now I need to perform manual exploratory testing using Playwright MCP browser tools.
Please read the test plan from `specs/search-feature-test-plan.md`, then execute the test scenarios defined in it:
1. Use Playwright MCP browser tools to manually execute each test scenario from the plan
2. Follow the step-by-step instructions in each test case
3. Verify the expected results match the actual results
4. Take screenshots at key steps and error states
5. Document your findings:
   - Test execution result for each scenario
   - Any UI inconsistencies or unexpected behaviors
   - Missing validation or bugs discovered
   - Screenshot evidence

**Expected Output:**
- Manual test execution results
- Screenshots of the application at various steps
- List of observations and findings
- Any issues discovered during exploration

---

## Step 4: Generate the automation scripts

Now I need to create automated test scripts using the `playwright-test-generator` agent.

Please review:
1. Test plan from `specs/search-feature-test-plan.md`
2. Exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from manual exploratory testing:
- Leverage the element selectors and locators that were successfully used in Step 3
- Use stable element properties (ids, data-attributes, roles) discovered during exploration
- Apply wait strategies and UI behaviors observed during manual testing
- Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:
1. Create scripts for each test scenario from the test plan
2. Organize scripts into appropriate test suite files in `tests/search-feature/`
3. Use the test case names and steps from the test plan
4. Use reliable selectors and strategies from exploratory testing

Requirements for all scripts:
- Follow Playwright best practices
- Include proper assertions using `expect()`
- Use descriptive test names matching the format in the test plan
- Use robust element selectors discovered during manual testing
- Add comments for complex steps
- Use proper wait strategies based on actual application behavior — no hardcoded `waitForTimeout`
- Add proper test hooks (`beforeEach`, `afterEach`)
- Configure for multiple browsers: chromium, firefox, webkit

After generating the scripts, run the tests to verify they pass.

**Expected Output:**
- Test suite files created in `tests/search-feature/` based on the test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation complete

---

## Step 5: Execute and heal automation tests

Now I need to execute the generated automation scripts and heal any failures using the `playwright-test-healer` agent.
1. Run all automation scripts in `tests/search-feature/`
2. Identify any failing tests
3. For each failing test, use the `playwright-test-healer` agent to:
   - Analyze the failure
   - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions
   - Update the test script with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the healing process until all tests are stable and passing
6. Document:
   - Initial test result pass/fail count
   - Healing activities performed
   - Final test result after healing
   - Any tests that couldn't be auto-healed

**Expected Output:**
- All automated tests executed
- Failing tests identified and healed using the test-healer agent
- Healed test scripts updated in `tests/search-feature/`
- Final stable test execution results
- Summary of healing activities performed

---

## Step 6: Create test report

Now I need to create a comprehensive test execution report based on the manual testing, automation execution, and healing activities.

Please compile results from:
- Step 3: Manual exploratory testing results
- Step 4: Generated automation scripts
- Step 5: Automated test execution and healing results

Structure the report as `test-results/search-feature-test-report.md`, including:

1. **Executive Summary**
   - Total test cases planned
   - Total tests executed (manual + automated)
   - Overall pass/fail/blocked status
2. **Manual test results**
   - Results from Step 3 exploratory testing
   - Screenshots and observations
   - Issues found during manual testing
3. **Automated test results**
   - Initial automated results from Step 5
   - Healing activities performed
   - Final test execution results after healing
   - Test suite execution summary
   - Pass/fail count for each test suite
4. **Test coverage analysis**
   - Which acceptance criteria are covered
   - Coverage from manual and automated tests
   - Any gaps in test coverage
   - Recommendations for additional testing

**Expected Output:**
- Comprehensive test execution report covering both manual and automated testing
- Clear pass/fail status for all test scenarios
- Complete test coverage analysis
- Evidence and screenshots attached

---

## Step 7: Commit to git repository

Now I need to commit all test artifacts to the git repository using the GitHub MCP agent.

**Git repository:** `https://github.com/sachin-164519/playwright-project` — replace with your actual repo before running

Please perform the following git operations:
1. Initialize the git repository if not already initialized
2. Stage all files in the workspace
3. Create a commit with message: `Add complete tests for story - Search Feature`
4. Push all changes to the git repository

**Expected Output:**
- All test artifacts committed
- Clear commit message referencing the user story
- Changes pushed successfully to the remote repository