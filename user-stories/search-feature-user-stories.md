# User Stories — Website Search Feature (Playwright Test Reference)

**Target site used for these examples:** [wikipedia.org](https://www.wikipedia.org) — public, stable, no login/CAPTCHA wall, and its search flow covers most edge cases you'd want to automate. Swap the URL and expected-result text to reuse these against any other public site with a search box.

**Assumed core flow:** user lands on the homepage → types into a search input → gets either (a) live suggestions, (b) redirected straight to a matching page, or (c) a results list / "no results" message.

---

## 1. Successful search with a strong single match

**Plain:**
As a visitor, I want to search for a well-known term, so that I land directly on the relevant page.

**Gherkin:**
```gherkin
Feature: Website search
  Scenario: Search for a well-known term
    Given I am on the homepage
    When I enter "Albert Einstein" in the search box
    And I submit the search
    Then I should be navigated to a page whose title contains "Albert Einstein"
```
**Playwright note:** assert on `page.title()` or an `h1` locator rather than the URL alone — URLs can encode/redirect differently than the visible title.

---

## 2. Search term with multiple possible matches

**Plain:**
As a visitor, I want to search for an ambiguous term, so that I see a list of relevant results to choose from.

**Gherkin:**
```gherkin
Scenario: Ambiguous search shows a results list
  Given I am on the homepage
  When I enter "Mercury" in the search box
  And I submit the search
  Then I should see a results page listing multiple entries
  And each result should contain the term "Mercury" or a close variant
```
**Playwright note:** assert `count()` of result-item locators is `> 1` rather than hardcoding an exact number, since result counts drift over time.

---

## 3. Search with no matching results

**Plain:**
As a visitor, I want to be told clearly when my search has no matches, so that I'm not confused by a blank page.

**Gherkin:**
```gherkin
Scenario: Search with no results
  Given I am on the homepage
  When I enter "xzqweasdfnonexistentterm123" in the search box
  And I submit the search
  Then I should see a "no results found" message
```
**Playwright note:** use `getByText(/no results|did not match/i)` with a regex to stay resilient to minor copy changes.

---

## 4. Empty search submission

**Plain:**
As a visitor, I want the app to handle an empty search gracefully, so that I don't get an error page or broken state.

**Gherkin:**
```gherkin
Scenario: Submit search with empty input
  Given I am on the homepage
  When I submit the search without entering any text
  Then I should remain on the homepage
  And no results page should be shown
```
**Playwright note:** good candidate for asserting a negative — `expect(page).toHaveURL(homepageUrl)` after submit, confirming nothing navigated.

---

## 5. Live search suggestions / autocomplete

**Plain:**
As a visitor, I want to see suggestions as I type, so that I can find what I'm looking for faster.

**Gherkin:**
```gherkin
Scenario: Autocomplete suggestions appear while typing
  Given I am on the homepage
  When I type "Lond" into the search box
  Then a dropdown of suggestions should appear
  And at least one suggestion should contain the text "Lond"
```
**Playwright note:** autocomplete is async — use `locator.waitFor()` or an auto-retrying `expect(suggestions).not.toHaveCount(0)` instead of a fixed `waitForTimeout`.

---

## 6. Selecting a suggestion from the dropdown

**Plain:**
As a visitor, I want to click a suggested result, so that I go straight to that page without a separate search-results step.

**Gherkin:**
```gherkin
Scenario: Select a suggestion from autocomplete
  Given I am on the homepage
  And I have typed "London" into the search box
  When I click the first suggestion in the dropdown
  Then I should be navigated to a page whose title contains "London"
```
**Playwright note:** capture the suggestion's text before clicking, then assert the destination page title matches it — avoids a hardcoded expected string that breaks if the top suggestion changes.

---

## 7. Search is case-insensitive

**Plain:**
As a visitor, I want my search to work regardless of letter casing, so that I don't have to worry about exact capitalization.

**Gherkin:**
```gherkin
Scenario Outline: Case-insensitive search
  Given I am on the homepage
  When I enter "<query>" in the search box
  And I submit the search
  Then I should be navigated to a page whose title contains "Python"

  Examples:
    | query           |
    | python          |
    | PYTHON          |
    | PyThOn          |
```
**Playwright note:** great use case for a parameterized test (`test.describe.parametrize`-style loop or `for` loop over a test-data array) instead of duplicating the test three times.

---

## 8. Search handles special characters / extra whitespace

**Plain:**
As a visitor, I want the search to not break when I include punctuation or stray spaces, so that I still get a usable result.

**Gherkin:**
```gherkin
Scenario: Search with special characters and whitespace
  Given I am on the homepage
  When I enter "  Jean-Paul Sartre!! " in the search box
  And I submit the search
  Then I should not see an error page
  And I should see either a matching result or a "no results" message
```
**Playwright note:** good negative-path test — assert the *absence* of an error/500-style page (`expect(page.locator('text=/error|exception/i)')).toHaveCount(0)`).

---

## 9. Search box persists across pages (header search)

**Plain:**
As a visitor, I want the search box available from any page, so that I can search again without returning to the homepage.

**Gherkin:**
```gherkin
Scenario: Search box available from an article page
  Given I have navigated to a specific page (e.g. "Albert Einstein")
  Then the search box should still be visible in the page header
  When I enter "Isaac Newton" in the header search box
  And I submit the search
  Then I should be navigated to a page whose title contains "Isaac Newton"
```
**Playwright note:** good candidate for a reusable `searchFor(page, term)` helper / Page Object method, since this flow repeats across nearly every other test above.

---

## Suggested project structure
- Use the **Page Object Model**: a `SearchPage` (or `HeaderSearch`) class exposing `searchFor(term)`, `getSuggestions()`, `getResultTitles()`.
- Prefer `getByRole`, `getByPlaceholder`, or `getByLabel` locators over CSS/XPath — more resilient to markup changes.
- Avoid `waitForTimeout`; rely on Playwright's built-in auto-waiting and `expect(...).toBeVisible()` / `toHaveCount()` assertions.
- Story 7 and 8 are good fits for `test.step()` grouping or data-driven loops to keep test files DRY.
