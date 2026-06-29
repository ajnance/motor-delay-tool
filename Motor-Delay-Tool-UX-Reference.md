# Motor Delay Tool — Developer UX Reference

**Version:** 1.1  
**Last updated:** June 2026  
**Scope:** Functional behavior only. Styling (colors, typography, spacing tokens) is documented separately.

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Data Model](#2-data-model)
3. [Age Mapping](#3-age-mapping)
4. [Home Page](#4-home-page)
5. [Assessment Pages](#5-assessment-pages)
6. [Concerns Section](#6-concerns-section)
7. [Summary Page](#7-summary-page)
8. [Progress Stepper](#8-progress-stepper)
9. [Persistence](#9-persistence)
10. [Reset Behavior](#10-reset-behavior)

---

## 1. Application Overview

The Motor Delay Tool is a three-page web application:

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Age entry and session state detection |
| Assessment | `assessment.html` | Skill-by-skill questionnaire |
| Summary | `summary.html` | Flagged results and pediatrician notes |

All data is stored in the browser's `localStorage`. No data is ever sent to a server or third party.

---

## 2. Data Model

### Master Skill List

All skills are defined in `js/assessment-data.js` in the `MASTER_SKILLS` array. Each skill has:

| Field | Description |
|---|---|
| `skillCategory` | Groups the skill into a section (e.g. "Walk", "Concerns") |
| `skillName` | Display name shown on the card |
| `age` | The age milestone this skill maps to (e.g. "6 months", "Any age", "all ages") |
| `tryIt` | Instructions shown to the parent on the skill card |
| `shortDescription` | One-sentence description shown on the card and in the summary |

### Categories

Sections are defined in the `CATEGORIES` array. Each category maps a section `id` (used in URLs and localStorage keys), a display `title`, an `icon` filename (in `/assets/`), and a `category` string that must match the `skillCategory` values in `MASTER_SKILLS`.

Current categories in display order:

1. Hold Head Up
2. Roll Over
3. Use Hands
4. Sit
5. Stand
6. Walk
7. Climb
8. Run
9. Concerns

---

## 3. Age Mapping

### Age Brackets

The tool supports 12 age brackets:

| Code | Label |
|---|---|
| `2m` | 2 months |
| `4m` | 4 months |
| `6m` | 6 months |
| `9m` | 9 months |
| `12m` | 12 months |
| `15m` | 15 months |
| `18m` | 18 months |
| `24m` | 2 years |
| `30m` | 2.5 years |
| `36m` | 3 years |
| `48m` | 4 years |
| `60m` | 5 years |

### Age Code Derivation

The user enters a child's age in years and months on the home page. The app converts this to a total number of months, then maps it to the highest bracket that is less than or equal to that total.

**Rules:**
- The Start button is enabled for any input of 1 month or more
- **Minimum valid age:** 2 months. If the user enters 1 month and clicks Start, an inline error message appears below the age fields: *"The minimum age for a skill check is 2 months."* The error clears as soon as either age field is edited
- **No maximum age.** Any input above 60 months maps to the `60m` bracket — the user sees the full 5-year skill set. For example, a child entered as 7 years old receives the same assessment as a 5-year-old
- The bracket is always rounded down (e.g. 7 months → `6m` bracket)

### Which Skills Are Shown

For a given age code, a section is included if **at least one skill** in that category has an age milestone at or below the selected bracket. Skills are filtered to only those at or below the bracket.

Skills with age `"Any age"` or `"all ages"` are always included in every assessment regardless of the selected age.

---

## 4. Home Page

### New User State (default)

When there is no saved assessment in `localStorage`, the home page shows:

- Age entry card ("Start Motor Skills Check") with two inputs: Years and Months
- A **Start My Skills Check** button, which is **disabled** until a valid age is entered
- A Note paragraph explaining that progress is saved in the browser and is not sent to any third party

### Returning User State

On page load, the app scans `localStorage` for any saved answer set with at least one answer recorded. If found:

- The age entry card is **hidden**
- A "Welcome back" card is shown in its place
- The card displays the child's age as entered by the user (e.g. "You have a **1 year 4 months** motor skills check in progress")
- Two buttons are shown:
  - **Continue** — navigates directly to `assessment.html` with the saved age code
  - **Start a New Check** — clears all saved answers and the saved age label, hides the returning user card, and shows the age entry card

### Age Input Behavior

- The Start button evaluates on every keystroke in either input field
- Both fields accept decimal values; the app rounds to the nearest whole month
- The button enables only when the computed total falls within the 2–60 month range

---

## 5. Assessment Pages

### URL Structure

```
assessment.html?age={ageCode}&section={sectionIndex}
```

- `age` — required; one of the 12 age codes
- `section` — optional; zero-based index of the section to jump to (defaults to `0`)

### Section Structure

Each section corresponds to one skill category. Sections are rendered one at a time. The user navigates forward and backward using Previous and Next buttons at the bottom of each section.

On the last section, the Next button label changes to **View Summary** and navigates to `summary.html`.

### Skill Cards

Each skill is rendered as a card with:

- A label ("Skill: [name]" for standard skills; "Concern: [name]" for items in the Concerns section)
- A short description
- A "Try it" prompt with specific instructions for the parent
- Answer options (radio buttons — see below)
- A "Notes for Pediatrician" text area

**Standard skill answer options:**
- Can do this
- Does not do this
- Used to do but no longer does
- Unsure

**Concern answer options** (Concerns section only):
- I have this concern
- I do not have this concern
- Unsure

A user can deselect a radio button by clicking it again (clicking a selected option unchecks it).

### Navigation Between Skills

The user can navigate between sections in two ways:

1. **Previous / Next buttons** at the bottom of each section
2. **Progress stepper** at the top of the page — clicking any active step jumps directly to that section

Clicking the Start step in the stepper navigates back to `index.html`. Clicking the Summary step navigates to `summary.html`.

Answers for the current section are saved to `localStorage` any time the user navigates away from a section (via either the buttons or the stepper).

### Image Placeholder

Each skill card currently shows an image placeholder on the right side. The `hasVideo` field exists in the data model for future use but is not currently active.

---

## 6. Concerns Section

The Concerns section behaves differently from all other sections in the following ways:

### Answer Options

Instead of the standard four options, concern cards show three options:
- I have this concern
- I do not have this concern
- Unsure

### Summary Mapping

| Answer | Summary behavior |
|---|---|
| I have this concern | Included; shown with a **red tag** |
| I do not have this concern | **Excluded** from the summary entirely |
| Unsure | Included; shown with the standard **Unsure tag** |

### Icon

The Concerns section uses the eye icon (`assets/eye.svg`) in the progress stepper instead of a body-movement icon.

### Additional Concern Notes

At the bottom of the Concerns section, below all concern cards, there is a standalone card titled **"Additional Concern Notes for the Pediatrician"**. This is a free-form textarea for any concerns the parent wants to share that are not covered by the listed concern items.

If this field has content, it appears at the top of the Concerns section on the summary page as "Additional Concern Notes."

---

## 7. Summary Page

### What Is Included

Only answers that are flagged are shown on the summary page. The following answer values are considered flagged:

| Answer value | Tag label | Tag style |
|---|---|---|
| `does-not` | Does not do | Red |
| `used-to` | Used to do but no longer does | Yellow |
| `has-concern` | Has concern | Red |
| `unsure` | Unsure | Blue |

The following answers are **not** shown on the summary:
- `can-do`
- `no-concern`
- Any unanswered skill

### Layout

The summary groups flagged skills by section. Within each section, skills are grouped by answer type in the following order:
1. Does not do (or Has concern)
2. Used to do but no longer does
3. Unsure

Each group is preceded by a colored badge label. Each skill item shows:
- The skill name, prefixed with "Skill:" (or "Concern:" for items from the Concerns section)
- The short description
- The "Try it" prompt (shown only for **Unsure** answers)
- An editable "Notes for Pediatrician" text area (pre-populated with any notes entered on the assessment page)

Notes edited on the summary page are saved back to `localStorage` in real time.

### Empty State

If no skills are flagged (all answered "Can do this" / "I do not have this concern" or left blank), the summary shows a message: "No flagged skills found."

### Summary Actions

Two buttons appear at the top of the summary:

- **Start a New Check** — clears all `localStorage` data (answers and saved age) and returns to `index.html`
- **Download** — currently shows a placeholder alert ("Download functionality coming soon")

---

## 8. Progress Stepper

The stepper shows steps for: Start → [active sections in order] → Summary.

Only sections that contain at least one valid skill for the selected age are shown as active steps. The Start and Summary steps are always shown.

### Desktop behavior

The full stepper is shown as a horizontal row. Each step shows an icon and a label. The active step is visually highlighted. Completed steps are visually differentiated from upcoming steps.

### Mobile behavior

The stepper collapses to a dropdown showing only the current step. The user can tap the dropdown to see all steps and jump to any one.

---

## 9. Persistence

All data is stored in the browser's `localStorage` under the following keys:

| Key | Contents |
|---|---|
| `mdt-answers-{ageCode}` | JSON object mapping `{sectionId}__{skillId}` keys to `{ answer, notes }` objects |
| `mdt-user-age` | JSON object `{ label }` storing the human-readable age string entered by the user (e.g. "1 year 4 months") |

The additional concern notes field is stored under the key `concerns__additional-notes` within the `mdt-answers-{ageCode}` object, with an empty `answer` value and the note text in the `notes` field.

Data persists across browser sessions until:
- The user clicks "Start a New Check" on the home page or summary page
- The user clears their browser data manually

---

## 10. Reset Behavior

A full reset clears the following from `localStorage`:
- `mdt-answers-2m` through `mdt-answers-60m` (all 12 age bracket answer sets)
- `mdt-user-age`

A reset can be triggered from:
- The **Start a New Check** button on the home page (returning user state only)
- The **Start a New Check** button on the summary page
