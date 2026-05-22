# Business Requirements Document (BRD)
## Todo Application

**Version:** 1.0
**Date:** 2026-05-22
**Author:** Timur Rudiuk

---

## 1. Introduction

### 1.1 Purpose
This document defines the business requirements for the Todo Application. It describes the goals, stakeholders, functional needs, and success criteria from a business perspective.

### 1.2 Background
Managing daily tasks without a dedicated tool leads to missed deadlines, poor prioritization, and reduced productivity. The Todo Application addresses this by providing a simple, accessible web-based task management system.

### 1.3 Scope
The application covers the full lifecycle of a task: creation, viewing, editing, and deletion. The current version targets individual users with no multi-user or collaboration features.

---

## 2. Stakeholders

| Stakeholder | Role | Interest |
|---|---|---|
| End User | Primary user of the application | Manage personal tasks efficiently |
| Developer | Builder and maintainer | Clean, maintainable codebase |
| Academic Reviewer | Evaluator of the project | Compliance with requirements |

---

## 3. Business Goals

| ID | Goal |
|---|---|
| BG-01 | Allow users to organize their daily tasks in one place |
| BG-02 | Reduce the chance of missing deadlines through deadline tracking |
| BG-03 | Help users prioritize work by assigning priority levels |
| BG-04 | Provide a fast and responsive experience accessible from any browser |

---

## 4. Functional Requirements

### 4.1 Task Management

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The system shall allow a user to create a new task with a title, priority, category, and optional deadline | High |
| FR-02 | The system shall display all existing tasks to the user | High |
| FR-03 | The system shall allow a user to mark a task as completed | High |
| FR-04 | The system shall allow a user to update task fields (title, priority, category, deadline) | Medium |
| FR-05 | The system shall allow a user to delete a task | High |

### 4.2 Data Requirements

| ID | Requirement | Priority |
|---|---|---|
| DR-01 | Each task must have a unique identifier | High |
| DR-02 | Task title is mandatory and cannot be empty | High |
| DR-03 | Priority must be one of: low, medium, high | Medium |
| DR-04 | Deadline is optional and must be a valid date | Medium |
| DR-05 | All tasks must be persisted in a database | High |

---

## 5. Non-Functional Requirements

| ID | Requirement | Category |
|---|---|---|
| NFR-01 | The UI must be accessible from any modern web browser without installation | Accessibility |
| NFR-02 | The API must respond within 500ms under normal conditions | Performance |
| NFR-03 | The system must retain data between sessions using a persistent database | Reliability |
| NFR-04 | The codebase must be modular and maintainable | Maintainability |

---

## 6. User Stories

| ID | As a | I want to | So that |
|---|---|---|---|
| US-01 | User | Create a task with a title and deadline | I don't forget what needs to be done |
| US-02 | User | Set a priority for each task | I can focus on the most important things first |
| US-03 | User | Mark a task as completed | I can track my progress |
| US-04 | User | Delete a task | I can remove tasks that are no longer relevant |
| US-05 | User | Assign a category to a task | I can group related tasks together |

---

## 7. Assumptions and Constraints

### 7.1 Assumptions
- The user has access to a modern web browser (Chrome, Firefox, Edge, Safari).
- The backend server and database are running and accessible during use.
- No user authentication is required in the current version.

### 7.2 Constraints
- The application is designed for a single user — there are no accounts or roles.
- CORS is open (`*`) in development; production deployment would require restriction.
- The database URL must be configured via environment variable before running the backend.

---

## 8. Acceptance Criteria

| ID | Criterion |
|---|---|
| AC-01 | A user can successfully create a task and see it appear in the list |
| AC-02 | A user can mark a task as completed and the status is saved |
| AC-03 | A user can delete a task and it is permanently removed |
| AC-04 | A user can update a task's priority or category |
| AC-05 | All data persists after refreshing the browser |

---

## 9. Out of Scope

The following features are explicitly out of scope for the current version:

- User authentication and authorization
- Multi-user support or task sharing
- Email or push notifications for deadlines
- Mobile native application
- Task search or filtering on the backend