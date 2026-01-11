# QA Test Plan: YT Analyzer

**Date:** 2026-01-11
**Version:** 1.0
**Scope:** Functional, UI/UX, and Localization testing for the YT Analyzer web application.

## 1. Testing Methodology

### 1.1 Test Environments
-   **Desktop**: Chrome (latest), Safari (latest)
-   **Mobile**: iPhone (Safari), Android (Chrome) - via Responsive Mode or physical device.
-   **Screen Sizes**: 1920x1080 (Desktop), 375x812 (Mobile).

### 1.2 Testing Types
-   **Smoke Testing**: Verify critical paths (Onboarding -> API Key -> Search -> Results).
-   **Functional Testing**: Validate individual features (Filters, Sorting, History).
-   **UI/UX Testing**: Check responsiveness, dark mode, and visual glitches.
-   **Localization Testing**: Verify language switching and text accuracy.

---

## 2. Test Cases

### 2.1 Critical Path (Smoke Test)
| ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **CP-01** | **First Run Onboarding** | 1. Clear `localStorage` and refresh page.<br>2. Verify modal appears.<br>3. Enter valid API Key.<br>4. Click "Get Started". | Modal should close. API key should be saved. Initial "Enter a keyword" screen should appear. |
| **CP-02** | **Basic Search** | 1. Enter keyword "Korea Travel".<br>2. Click "Analyze" or hit Enter. | Loading skeleton appears. Video results load within 3 seconds. Usage counter increases. |
| **CP-03** | **API Error Handling** | 1. Enter invalid API Key in settings.<br>2. Perform search. | Error message/modal should appear indicating API limit or key error. |

### 2.2 Search & Filters
| ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **SF-01** | **Filter by Duration** | 1. Search for a generic term.<br>2. Set Filter: Duration -> "Short (< 2m)". | Only videos shorter than 2 minutes should remain in the grid. Count should update. |
| **SF-02** | **Filter by Date** | 1. Set Filter: Date -> "Last Month". | Only videos published within the last 30 days should be displayed. |
| **SF-03** | **Filter by Score** | 1. Set Filter: Score -> "High (50-150%)". | Only videos with a performance score between 50% and 150% should be shown. |
| **SF-04** | **Complex Filtering** | 1. Apply Duration: "Short" AND Score: "High". | Only videos matching **both** criteria should appear. |
| **SF-05** | **Reset All** | 1. Apply multiple filters and type a search term.<br>2. Click "Reset all" (초기화). | Search input clears. Results disappear. Filters reset to "Any/All". Welcome prompt appears. |

### 2.3 User Interface (UI)
| ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **UI-01** | **Dark Mode Toggle** | 1. Click the Sun/Moon icon in header. | Theme switches immediately. Text colors invert (black bg, white text). Preferences saved on refresh. |
| **UI-02** | **Responsive Sidebar** | 1. Resize window to < 768px (Mobile/Tablet). | Sidebar should disappear. Content should take full width. |
| **UI-03** | **Responsive Grid** | 1. Resize window from Desktop to Mobile. | Video grid should adjust: 4 columns -> 2 columns -> 1 column. |
| **UI-04** | **Ad Placement** | 1. Scroll to bottom of results. | Advertisement box should be visible just above the footer links. |

### 2.4 History & Data
| ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **HD-01** | **Add History** | 1. Search for "New Topic". | "New Topic" appears at the **top** of the sidebar history list. |
| **HD-02** | **History Persistence** | 1. Refresh the page. | "New Topic" should still be in the list. |
| **HD-03** | **History Limit** | 1. Search for 11 different terms. | The list should allow max 10 items. The oldest item should be removed. |
| **HD-04** | **Clear History** | 1. Click "Clear History". | All history items disappear from the sidebar and `localStorage`. |

### 2.5 Localization (I18N)
| ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **L10N-01** | **Switch to Korean** | 1. Select "한국어" from dropdown. | UI updates immediately. Filter buttons reads "길이: 전체", "날짜: 전체". |
| **L10N-02** | **Dynamic Content** | 1. Search in Korean mode. | Loading text says "로딩 중...". Results header says "분석 결과". |
| **L10N-03** | **Reset in Korean** | 1. Click "초기화". | Prompt text changes to "키워드를 입력하여...". |

---

## 3. Bug Report Template
If you find an issue, please use this format:

*   **Title**: [Short description]
*   **Severity**: Critical / Major / Minor
*   **Steps to Reproduce**:
    1.  ...
    2.  ...
*   **Expected Behavior**: ...
*   **Actual Behavior**: ...
*   **Screenshot**: (Attach image)
