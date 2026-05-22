# System Specification Document (SSD)
## Todo Application

**Version:** 1.0
**Date:** 2026-05-22
**Author:** Timur Rudiuk

---

## 1. Introduction

### 1.1 Purpose
This document describes the technical specification of the Todo Application — a full-stack web system for managing personal tasks. It is intended for developers, testers, and technical reviewers.

### 1.2 Scope
The system allows users to create, view, update, and delete tasks (todos). Each task has a title, priority, category, deadline, and completion status.

### 1.3 Definitions
| Term | Description |
|---|---|
| Todo | A task entity stored in the system |
| API | Application Programming Interface |
| SPA | Single Page Application |
| ORM | Object-Relational Mapping |
| CORS | Cross-Origin Resource Sharing |

---

## 2. System Overview

The application follows a classic **client-server architecture**:

- The **frontend** is a React SPA that communicates with the backend via HTTP requests using Axios.
- The **backend** is a REST API built with FastAPI that handles all business logic and database operations.
- The **database** is a PostgreSQL instance accessed through SQLAlchemy ORM.

```
[ React Frontend ] <--HTTP/JSON--> [ FastAPI Backend ] <--SQLAlchemy--> [ PostgreSQL ]
```

---

## 3. Technology Stack

### 3.1 Frontend
| Component | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2.6 |
| Build Tool | Vite | 8.0.12 |
| HTTP Client | Axios | 1.16.1 |
| Language | JavaScript (JSX) | ES2022+ |

### 3.2 Backend
| Component | Technology |
|---|---|
| Language | Python 3.14.1 |
| Web Framework | FastAPI |
| ORM | SQLAlchemy |
| Data Validation | Pydantic |
| Server | Uvicorn (ASGI) |

### 3.3 Database
| Component | Technology |
|---|---|
| DBMS | PostgreSQL |
| Connection | Via `DATABASE_URL` environment variable |
| Session management | SQLAlchemy `SessionLocal` |

---

## 4. Data Model

### 4.1 Entity: Todo

| Field | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | Integer | No | auto-increment | Primary key |
| `title` | String | No | — | Task title |
| `completed` | Boolean | No | `false` | Completion status |
| `priority` | String | No | `"medium"` | Priority: low / medium / high |
| `category` | String | No | `"general"` | Task category |
| `deadline` | Date | Yes | `null` | Optional due date |

### 4.2 Schemas

**TodoCreate** (used on POST):
```
title: str (required)
priority: str (required)
category: str (required)
deadline: date (optional)
```

**TodoUpdate** (used on PATCH):
```
title: str (optional)
completed: bool (optional)
priority: str (optional)
category: str (optional)
deadline: date (optional)
```

---

## 5. API Specification

Base URL: `http://localhost:8000`

| Method | Endpoint | Description | Request Body | Response |
|---|---|---|---|---|
| GET | `/todos` | Get all todos | None | Array of Todo objects |
| POST | `/todos` | Create a new todo | TodoCreate | Created Todo object |
| PATCH | `/todos/{todo_id}` | Update a todo | TodoUpdate | Updated Todo object |
| DELETE | `/todos/{todo_id}` | Delete a todo | None | `{"message": "Deleted"}` |

### Error Responses
| Status Code | Meaning |
|---|---|
| `200 OK` | Request successful |
| `201 Created` | Resource created |
| `404 Not Found` | Todo with given ID does not exist |
| `422 Unprocessable Entity` | Validation error (invalid request body) |

---

## 6. System Constraints

- The backend exposes CORS with `allow_origins=["*"]`, which is suitable for development but should be restricted in production.
- The database connection URL must be provided via a `.env` file and the `DATABASE_URL` environment variable.
- There is no authentication or authorization in the current version.
- All data is stored persistently in PostgreSQL.

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | API should respond within 500ms under normal load |
| Scalability | Backend can be scaled horizontally using ASGI server |
| Maintainability | Code is separated into `models.py`, `schemas.py`, `database.py`, `main.py` |
| Portability | Frontend is buildable as a static bundle via `vite build` |

---

## 8. Directory Structure

```
todo-app/
├── backend/
│   ├── database.py      # DB engine and session setup
│   ├── main.py          # FastAPI app, route definitions
│   ├── models.py        # SQLAlchemy ORM model
│   └── schemas.py       # Pydantic request/response schemas
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main application component
    │   └── main.jsx      # React entry point
    ├── index.html
    └── package.json
```