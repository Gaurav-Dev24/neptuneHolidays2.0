# Neptune Holidays 2.0 — Interview & Learning Notes

> Living project notes for the Neptune Holidays 2.0 development journey.
>
> **Rule:** Update this file after every completed milestone. Add new concepts, architecture decisions, implementation lessons, bugs encountered, and interview questions. Do not delete previous notes unless a decision is intentionally changed; record the change instead.

---

## 1. Project Context

### Project
**Neptune Holidays 2.0 — Modern Travel Booking & Operations Platform**

### Primary Goal
Rebuild/revamp the Neptune Holidays travel platform using modern frontend engineering practices while using a **safe local development environment** based on the existing Neptune API contracts.

### Career Goal
This project is being developed as a serious portfolio + learning + interview-preparation project for the user's job switch.

Focus areas:

- React
- Next.js
- TypeScript
- REST API integration
- TanStack Query
- State management
- Form architecture
- Validation
- Authentication
- RBAC
- Testing
- Performance
- SEO
- Accessibility
- CI/CD
- Frontend architecture

### Production Safety Rule
The existing Neptune API is already deployed and must not be disturbed during development.

**Development architecture:**

```text
Next.js Frontend
      |
      v
Local API (localhost:4000)
      |
      v
Local development data
```

The production API is treated as read-only/reference infrastructure and is not used for normal development writes.

---

# 2. Current Project Structure

Current simplified project structure:

```text
neptune-holidays-2/
|
|-- frontend/                  # Next.js frontend
|
|-- backend/                   # Local Neptune API
|   |-- src/
|   |-- .env
|   |-- package.json
|   `-- tsconfig.json
|
`-- api-docs/                  # Postman API collections
    |-- Neptune Holidays API.postman_collection.json
    `-- Neptune Holidays API old.postman_collection.json
```

### Important principle
The structure is intentionally being introduced gradually. Do not create large numbers of folders before their purpose is clear.

---

# 3. Milestone 0 — Production Isolation & Local Development Strategy

## What we decided

The real Neptune API should not be used directly while developing the new application.

Instead, we are building a local API that reproduces the required Neptune API contracts and uses local data.

### Why?

- Prevent accidental production data changes.
- Allow safe POST/PATCH/DELETE development.
- Allow controlled test scenarios.
- Allow intentional API failures and delays.
- Make the project reproducible locally.
- Learn backend/API concepts without depending on production.

### Environment principle

Frontend uses:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Production URLs should be environment-specific and must not be hard-coded into application logic.

## Interview Questions

1. Why should frontend applications avoid hard-coded environment-specific API URLs?
2. What is the difference between development, staging, and production environments?
3. Why is it dangerous to develop against a production API?
4. How would you reproduce a production API locally without copying the production database?
5. How would you design environment configuration for Next.js?

---

# 4. Milestone 1 — Local Express API Foundation

## Technologies Introduced

- Node.js
- Express
- TypeScript
- CORS
- dotenv

## Local server

The local backend runs on:

```text
http://localhost:4000
```

Health endpoint:

```text
GET /api/v1/health
```

Response:

```json
{
  "success": true,
  "message": "Neptune local API is running"
}
```

## Key Concepts

### Express application vs server

`app.ts` defines/configures the Express application.

`server.ts` starts the HTTP server and reads environment configuration.

This separation keeps application configuration separate from the process that starts the server.

### Middleware

The backend uses middleware for:

- CORS
- JSON parsing
- Error handling

Example request pipeline:

```text
Request
  |
  v
CORS middleware
  |
  v
JSON parser
  |
  v
Route
  |
  v
Error middleware
  |
  v
Response
```

### Environment variables

The backend reads local configuration from `.env`, for example:

```env
PORT=4000
NODE_ENV=development
```

## Interview Questions

1. What is Express middleware?
2. What is the difference between `app.use()` and a route handler?
3. Why do we separate `app.ts` and `server.ts`?
4. What is CORS?
5. Why can a browser call `localhost:4000` directly but still block a request from `localhost:3000`?
6. What does `express.json()` do?
7. Why should secrets/configuration be stored in environment variables?

---

# 5. Milestone 2 — CORS Configuration

## Problem encountered

The frontend initially received a browser **CORS / Network Error** when making requests from:

```text
http://localhost:3000
```

to:

```text
http://localhost:4000
```

The backend itself was working correctly.

## Resolution

Allowed local frontend origins were explicitly configured, including:

```text
http://localhost:3000
http://127.0.0.1:3000
```

Allowed methods and headers were also defined.

## Key Concept — Same-Origin Policy

These are different origins because the ports differ:

```text
localhost:3000
localhost:4000
```

The browser therefore applies cross-origin rules.

### CORS mental model

```text
Browser
   |
   | request from origin A
   v
Server B
   |
   | allows/rejects origin A
   v
Browser
```

For some requests, the browser may first send an `OPTIONS` preflight request.

## Interview Questions

1. What is CORS?
2. What is the same-origin policy?
3. Why does changing only the port create a different origin?
4. What is a CORS preflight request?
5. What is the purpose of the `OPTIONS` request?
6. What is the difference between CORS and CSRF?
7. Why should CORS not simply be configured as `*` in every production application?

---

# 6. Milestone 3 — Airport API Layer

## Endpoints implemented locally

```text
POST /api/v1/user/airports/departures
POST /api/v1/user/airports/arrivals
```

These are based on the Neptune API contract.

## Local airport data

A small local fixture dataset was created containing airports such as:

- CCU — Kolkata
- DEL — Delhi
- BOM — Mumbai
- BLR — Bengaluru
- MAA — Chennai

## Airport search

Departure airport search supports a keyword and searches by:

- Airport name
- IATA code
- City

Example:

```json
{
  "keyword": "kol"
}
```

## Arrival dependency

Arrival airports depend on the selected departure airport.

Conceptual flow:

```text
Select departure
      |
      v
Departure airport ID
      |
      v
Arrival API
      |
      v
Available arrival airports
```

## Interview Questions

1. How would you design an airport autocomplete API?
2. Why should the arrival list depend on the departure selection?
3. How would you prevent selecting the same airport for both fields?
4. When would you use client-side filtering vs server-side filtering?
5. How would you handle large airport datasets?
6. How would you add pagination or cursor-based search to an autocomplete endpoint?

---

# 7. Milestone 4 — Error Handling & Validation

## Problem identified

The first airport route implementation returned successful responses but did not properly validate inputs or centralize failures.

We corrected this before continuing.

## Architecture introduced

```text
Request
   |
   v
Validation
   |
   v
Route / controller logic
   |
   v
Success response

or

Error
   |
   v
Central error middleware
   |
   v
Consistent error response
```

## AppError

A custom application error class was introduced so expected errors can carry:

- HTTP status code
- application error code
- user-safe message

Example conceptual response:

```json
{
  "success": false,
  "error": {
    "code": "AIRPORT_NOT_FOUND",
    "message": "Departure airport not found"
  }
}
```

## Error categories practiced

### 400 — Bad Request
Used for invalid request data.

### 404 — Not Found
Used when a referenced airport does not exist.

### 500 — Internal Server Error
Used for unexpected backend failures.

## Important security principle

Do not expose internal implementation details to clients.

Bad:

```text
Database connection failed at 10.x.x.x
```

Better:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Something went wrong"
  }
}
```

## Interview Questions

1. Why should error handling be centralized?
2. What is the difference between 400, 401, 403, 404, and 500?
3. Why should internal errors not be returned directly to the client?
4. What is the purpose of an application error class?
5. How would you design a consistent API error contract?
6. How would you log server errors while still returning safe client responses?

---

# 8. Milestone 5 — Zod Runtime Validation

## Technology

Zod was introduced for runtime request validation and TypeScript type inference.

### Example concept

```ts
const schema = z.object({
  keyword: z.string().trim().max(100).optional()
});
```

Then:

```ts
schema.safeParse(input)
```

is used before business logic runs.

## Why runtime validation matters

TypeScript only protects us at compile time.

External input comes from:

- Browser requests
- APIs
- Users
- Files
- Third-party systems

Those values can still be invalid at runtime.

Therefore:

```text
TypeScript
      +
Runtime validation
```

is stronger than TypeScript alone.

## Interview Questions

1. Why is TypeScript not enough to validate API requests?
2. What is runtime validation?
3. What is the difference between `parse()` and `safeParse()` in Zod?
4. Why can schema validation be done at the API boundary?
5. What are the benefits of deriving TypeScript types from schemas?

---

# 9. Milestone 6 — Local Flight Search API

## Endpoint implemented

```text
POST /api/v1/user/airports/search-flights
```

## Request model

The local request follows the Neptune contract:

```json
{
  "departureAirportId": "ccu",
  "arrivalAirportId": "del",
  "departureDate": "2026-10-10",
  "returnDate": "",
  "tripType": "oneWay",
  "passengers": {
    "adult": 1,
    "child": 0,
    "infant": 0
  },
  "cabinClass": "ECONOMY",
  "flexibleDates": false,
  "directFlightsOnly": false,
  "filters": {
    "stops": [],
    "airlines": []
  }
}
```

## Local flight fixtures

The local dataset includes different:

- Airlines
- Routes
- Prices
- Durations
- Stop counts
- Departure times

This allows frontend filtering and sorting to be developed without production data.

## Filtering implemented locally

- Direct flights only
- Airline filtering
- Stop filtering

## Interview Questions

1. How would you model a flight-search request?
2. Why should passengers be a nested object?
3. How would you design filtering for airlines and stops?
4. Would you filter flights in the backend or frontend? Why?
5. How would you handle pagination for thousands of flight results?
6. How would you prevent stale search results from appearing after a new search?

---

# 10. Milestone 7 — Axios API Client

## Frontend API abstraction

A single Axios instance was created:

```ts
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
```

## Why this matters

Without an API client abstraction, components could contain repeated code such as:

```ts
axios.post("http://localhost:4000/api/v1/...")
```

Instead we use:

```text
Component
   |
   v
API function
   |
   v
Axios instance
   |
   v
Local API
```

## Benefits

- Centralized base URL
- Consistent headers
- Easier authentication later
- Easier interceptors later
- Easier error handling
- Easier environment switching
- Less coupling between UI and transport details

## Interview Questions

1. Why create a shared Axios instance?
2. What are Axios interceptors?
3. Where would you add authentication headers?
4. How would you handle a global 401 response?
5. Why shouldn't React components know the base API URL?

---

# 11. Milestone 8 — TanStack Query / Server State

## Technology

TanStack Query was introduced for API/server state.

Example concept:

```ts
useQuery({
  queryKey: ["departure-airports", keyword],
  queryFn: () => searchDepartureAirports(keyword),
  enabled: keyword.trim().length >= 2,
  staleTime: 5 * 60 * 1000,
});
```

## Important distinction

### Server state

Examples:

- Airports
- Flights
- Bookings
- User profile
- Admin records

These are remote data and belong naturally in TanStack Query.

### Client/UI state

Examples:

- Modal open/closed
- Selected local UI state
- Temporary view state
- UI preferences

These can be handled with React state or, when necessary, Zustand.

## Why not put everything in Redux/Zustand?

Server state has specialized concerns:

- caching
- refetching
- stale data
- retries
- request lifecycle
- synchronization

TanStack Query is designed specifically for those concerns.

## Query keys

Example:

```ts
["departure-airports", keyword]
```

The key identifies a particular piece of server state and enables caching/invalidation behavior.

## `enabled`

Used to prevent a query from running until required information exists.

Example:

```ts
enabled: Boolean(departureAirportId)
```

## `staleTime`

Defines how long cached data is considered fresh.

## Interview Questions

1. What is server state vs client state?
2. Why use TanStack Query instead of Redux for API data?
3. What is a query key?
4. What does `enabled` do?
5. What is `staleTime`?
6. What is cache invalidation?
7. When would you use `useMutation()`?
8. How would you implement optimistic updates?

---

# 12. Milestone 9 — Debouncing Search

## Problem

Without debouncing, typing an airport name can generate unnecessary API requests.

Example:

```text
k
ko
kol
kolk
kolka
kolkat
kolkata
```

could create many requests.

## Solution

A reusable `useDebounce()` hook was introduced.

Conceptual flow:

```text
User input
   |
   v
React state
   |
   v
useDebounce(300ms)
   |
   v
TanStack Query
   |
   v
API
```

## Why debounce?

It reduces unnecessary network traffic and improves autocomplete behavior.

## Interview Questions

1. What is debouncing?
2. What is throttling?
3. When would you use debounce vs throttle?
4. How would you implement debounce with `useEffect`?
5. Why should autocomplete usually be debounced?
6. What happens if the user types faster than the debounce delay?

---

# 13. Milestone 10 — Reusable Airport Autocomplete

## Component

```text
frontend/components/AirportAutocomplete.tsx
```

The component accepts:

- label
- placeholder
- selected airport
- selection callback
- type: departure/arrival
- optional departure airport ID

## Concepts learned

### Reusable component design

The same component supports both:

```text
From
To
```

while behavior changes based on props.

### Controlled input

The input value is controlled through React state.

### Outside click handling

A `ref` + document event listener is used to close the dropdown when clicking outside.

### Derived display data

The UI derives the display text from the selected airport:

```text
Kolkata (CCU)
```

while retaining the actual object internally.

## Interview Questions

1. What is a controlled component?
2. When would you use a controlled vs uncontrolled input?
3. Why use `useRef` for detecting outside clicks?
4. How would you make an autocomplete keyboard accessible?
5. How would you handle thousands of autocomplete results?

---

# 14. Milestone 11 — Dependent Queries

## Problem

Arrival airport results should depend on the selected departure airport.

The real API contract provides a dedicated arrivals endpoint using the departure airport ID.

## Implementation concept

```ts
useQuery({
  queryKey: ["arrival-airports", departureAirportId],
  queryFn: () => getArrivalAirports(departureAirportId),
  enabled: Boolean(departureAirportId),
});
```

## Flow

```text
No departure selected
      |
      v
Arrival query disabled

Select CCU
      |
      v
Query key changes
      |
      v
Arrival API runs
      |
      v
Arrival suggestions available
```

## Important Concept

This is a **dependent query**: one request becomes enabled only after a prerequisite piece of state exists.

## Interview Questions

1. What is a dependent query?
2. How would you implement dependent requests using TanStack Query?
3. Why is `enabled` important here?
4. How does changing the query key affect caching and fetching?
5. How would you handle a changed departure selection?

---

# 15. Milestone 12 — React Hook Form + Zod

## Technologies

- React Hook Form
- Zod
- `@hookform/resolvers`

## Why React Hook Form?

It helps manage form state and validation efficiently without forcing every field value into React state.

## Why Zod?

It defines a declarative validation schema for user input.

## Important type issue encountered

A TypeScript error appeared around:

- `resolver`
- `child`
- `onSubmit`

The issue was related to how the React Hook Form resolver and Zod types interact, especially around numeric inputs and schema inference.

The important lesson was:

**Do not solve TypeScript problems using random `as` casts. Identify the actual type boundary.**

For numeric HTML inputs, React Hook Form can convert values using:

```tsx
register("child", {
  valueAsNumber: true
})
```

## Frontend form model vs API request model

The form can be flat:

```text
adult
child
infant
```

while the API request can be nested:

```text
passengers: {
  adult,
  child,
  infant
}
```

This is a useful example of separating a **UI model** from an **API contract**.

## Interview Questions

1. Why use React Hook Form?
2. Why are HTML number inputs still tricky in TypeScript forms?
3. What does `valueAsNumber` do?
4. Why validate at the form and API boundaries?
5. Why might form state and API request shapes be different?
6. How would you validate conditional fields such as a return date?
7. How would you build dynamic passenger forms?

---

# 16. Current End-to-End Architecture

We have now completed the first working vertical slice:

```text
                     USER
                       |
                       v
              Flight Search Form
                       |
             +---------+---------+
             |                   |
             v                   v
        Departure            Arrival
        Autocomplete         Autocomplete
             |                   |
             +---------+---------+
                       |
                       v
               React Hook Form
                       |
                       v
                    Zod
                       |
                       v
               Search Payload
                       |
                       v
               TanStack Query
                       |
                       v
                    Axios
                       |
                       v
             Local Express API
                       |
                       v
             Zod API Validation
                       |
                       v
               Local Flight Data
                       |
                       v
                Flight Results
```

This is the current working architecture.

---

# 17. Important Architectural Takeaways So Far

## 17.1 Separate UI from API transport

Components should not know about hard-coded backend URLs.

## 17.2 Validate at boundaries

External input must not be trusted just because TypeScript types it.

## 17.3 Server state is different from client state

Use the tool that matches the problem.

## 17.4 Dependent data should have explicit dependencies

Arrival airports depend on departure airport selection.

## 17.5 Reusability should follow a real pattern

We created one airport autocomplete because both From and To share a common interaction model.

## 17.6 Error handling is part of feature design

Every API-driven feature should account for:

```text
Loading
Success
Error
Empty
Retry
```

## 17.7 Production safety is an engineering concern

Development environments should be isolated from production data.

---

# 18. Bugs / Problems We Encountered and Lessons

## CORS error

### Symptom
Frontend showed a Network/CORS error while backend health endpoint worked directly.

### Lesson
A server can be healthy while browser security still blocks cross-origin requests.

## Airport suggestions not appearing

### Symptom
API request returned results, but dropdown did not render.

### Root cause
The rendering condition incorrectly required `departureAirportId` even for the departure autocomplete.

### Lesson
UI rendering conditions must reflect the actual state dependencies of each mode.

## React Hook Form / Zod type errors

### Symptom
Errors appeared around `resolver`, `child`, and `onSubmit`.

### Lesson
Resolver type mismatches can cascade into seemingly unrelated form fields. Do not patch them with arbitrary type assertions.

## Main engineering lesson

When something fails, trace the complete data flow:

```text
Input
 → React state/form
 → schema
 → API payload
 → query
 → API
 → response
 → UI
```

---

# 19. Interview Questions to Revise Before the Next Milestone

## JavaScript / React

1. Explain debouncing and its implementation.
2. Explain controlled components.
3. Explain `useEffect` cleanup.
4. Explain why a component re-renders.
5. When should `useMemo` and `useCallback` be used?

## TypeScript

6. Interface vs type.
7. What is a union type?
8. How do generics work?
9. Why should `any` be avoided?
10. How do you type API responses?

## API / HTTP

11. What is CORS?
12. What is an HTTP 400 vs 404 vs 500?
13. What is an API contract?
14. Why validate server input?
15. How would you design a consistent error response?

## TanStack Query

16. Server state vs client state.
17. Query key.
18. `enabled`.
19. `staleTime`.
20. Cache invalidation.
21. Dependent queries.

## Forms

22. Why React Hook Form?
23. `valueAsNumber`.
24. Client validation vs server validation.
25. Why might UI form models differ from API request models?

---

# 20. Current Skill Progress — Project Based

| Skill | Current Evidence from Project |
|---|---|
| TypeScript | API and frontend types |
| React | Interactive form/autocomplete |
| Next.js | Frontend application |
| REST APIs | Local Neptune API integration |
| Express | Local API implementation |
| Axios | Shared API client |
| TanStack Query | Airport + flight search queries |
| Zod | API + form validation |
| React Hook Form | Flight search form |
| Debouncing | Airport autocomplete |
| Dependent queries | Arrival airports |
| Error handling | Central API middleware + UI states |
| CORS | Local frontend/backend communication |
| Architecture | Layered local API + frontend separation |

---

# 21. Not Yet Covered / Planned

These are intentionally future milestones, not completed skills:

- Flight result filtering UI
- Sorting
- URL search parameters
- Search state persistence
- Advanced query caching
- Loading skeletons
- Pagination
- Authentication
- Session management
- Protected routes
- RBAC
- Admin dashboard
- React Testing Library
- Jest
- Accessibility / keyboard navigation for autocomplete
- Performance optimization
- Core Web Vitals
- Technical SEO
- Image optimization
- Server/client component strategy
- Booking workflow
- Passenger details
- Payment/booking states
- CI/CD
- Deployment
- Frontend system design
- Production observability/logging

---

# 22. Milestone 13 — Flight Results 2.0

**Status: Complete — 2026-09-23**

## What we built

The flight results screen was upgraded from a basic result list into a more production-style search-results experience.

```text
Flight Results 2.0
├── Result count
├── Sort by price
├── Sort by duration
├── Stops filter
├── Airline filter
├── Clear-all filters
├── Loading skeleton
├── Error + retry
├── Empty state
├── isFetching update state
└── Responsive filter UI
```

## Backend changes

The local `POST /search-flights` route was enhanced to return filter facets along with the result list.

```text
meta
├── total
└── facets
    ├── airlines
    │   ├── code
    │   └── name
    └── stops
```

Facets are calculated from the base result set before applying the selected filters. This prevents available filter options from disappearing after a filter is selected.

The local API also supports:

- `directFlightsOnly`
- `filters.airlines`
- `filters.stops`

This keeps production API data isolated while giving the frontend enough local data to exercise realistic filter behavior.

## Frontend implementation

### `FlightFilters.tsx`

Created a reusable controlled filter component.

Responsibilities:

- Receive current filter state from the parent
- Toggle stop selections
- Toggle airline selections
- Display dynamic facets returned by the API
- Clear all selected filters

Important TypeScript lesson:

```ts
const current = filters.stops ?? [];

const next = current.includes(stop)
  ? current.filter((item) => item !== stop)
  : [...current, stop];
```

Because `filters.stops` is typed as `string[]`, TypeScript can infer `item` as `string`; an explicit `any` or `string` annotation is not required.

### `FlightResults.tsx`

The results component now handles:

- Result count
- Sorting
- Filter controls
- Loading state
- Fetching/update state
- Error state with retry
- Empty results
- Responsive mobile filter interaction
- Flight cards

Sorting is derived from the current result collection instead of creating additional server state.

### `use-flight-search.ts`

TanStack Query now uses:

```ts
placeholderData: keepPreviousData,
staleTime: 60 * 1000,
refetchOnWindowFocus: false,
```

This introduced the distinction between:

- `isLoading` — initial request with no previous data
- `isFetching` — any active background/request fetch

`keepPreviousData` lets the previous results remain visible while a new filtered request is loading.

## Important learning: local fixture data

The number of displayed flights depends on the records currently stored in:

```text
backend/src/data/flights.ts
```

Manually adding or modifying local flight records can therefore produce multiple matching combinations/results. This is expected behavior for development fixtures and is useful for testing filtering and sorting.

The important validation is that every returned flight still matches the requested route/date and active filter criteria.

## Interview-ready explanation

> “I built a local flight-results experience where the frontend submits a search payload through TanStack Query and Axios to a local Express API. The API returns both matching flights and filter facets. The UI keeps filter state in the page component, passes it to a reusable filter component, and sends the selected filters back as part of the query payload. I used `keepPreviousData` so existing results remain visible while a new filtered request is fetching, and I separated initial loading from subsequent fetching.”

## Interview questions from this milestone

### Q1. Why calculate facets before applying filters?

Because filter options should describe the available options in the base result set. If facets were calculated after filtering, selecting one filter could incorrectly remove other useful filter options from the sidebar.

### Q2. What is the difference between `isLoading` and `isFetching` in TanStack Query?

`isLoading` represents the initial loading state when there is no usable query data. `isFetching` indicates that a request is currently in progress, including refetches when previous data already exists.

### Q3. Why use `keepPreviousData`?

It prevents the UI from becoming blank during a query-key change. Previous results remain visible while the new request is being fetched, creating a smoother search/filter experience.

### Q4. Should sorting be client-side or server-side?

For the current local dataset, client-side sorting is appropriate because the result set is already loaded in the browser. For very large datasets or paginated production results, server-side sorting is usually more scalable.

### Q5. Where should filter state live?

The page component owns the filter state because it needs that state both for the filter UI and for constructing the API query payload. `FlightFilters` remains a controlled, reusable presentation/input component.

### Q6. Why avoid `any` in the filter callbacks?

The filter arrays are explicitly typed as `string[]`, allowing TypeScript to infer callback parameters correctly and preserving compile-time safety.

## Skills demonstrated

- React state management
- TypeScript interfaces and inference
- TanStack Query server-state management
- Query-key-driven refetching
- Axios API integration
- Client-side sorting
- API-driven filter facets
- Controlled reusable components
- Loading/error/empty UI states
- Responsive frontend UI design
- Local API development and test fixtures

## Next milestone

# 23. Milestone 14 — URL-Driven Flight Search State

Target URL example:

```text
/flights?from=ccu&to=del&date=2026-10-10&tripType=oneWay&adults=1
```

### Concepts to learn

- Next.js URL search parameters
- `useSearchParams`
- `useRouter`
- Shareable/searchable URLs
- Browser back/forward navigation
- Synchronizing URL state with React state
- Server/client boundaries in Next.js

---

# 24. How to Use This File During Interviews

For every major project feature, be able to explain:

### 1. Business problem
What user problem does the feature solve?

### 2. UI flow
What does the user do?

### 3. API flow
Which endpoint is called and with what payload?

### 4. State management
Which state is local and which is server state?

### 5. Validation
Where is input validated?

### 6. Error handling
What happens when the request fails?

### 7. Performance
How are unnecessary requests/rendering avoided?

### 8. Accessibility
How can keyboard and assistive-technology users interact with it?

### 9. Testing
What are the critical user behaviors to test?

### 10. Trade-offs
Why was this architecture chosen instead of another approach?

---

# 25. Milestone Update Log

| Date | Milestone | Status | Notes |
|---|---|---|---|
| 2026-09-22 | Project setup + local environment | Complete | Production API isolated |
| 2026-09-22 | Local Express API + health check | Complete | localhost:4000 working |
| 2026-09-22 | CORS configuration | Complete | Next.js → Express working |
| 2026-09-22 | Airport APIs | Complete | Departures + arrivals |
| 2026-09-22 | Error handling + validation | Complete | Central error middleware + Zod |
| 2026-09-22 | Flight search API | Complete | Local fixtures + filters |
| 2026-09-22 | Axios API client | Complete | Shared local API client |
| 2026-09-22 | TanStack Query | Complete | Server-state queries |
| 2026-09-22 | Debounced airport search | Complete | 300ms debounce |
| 2026-09-22 | Airport autocomplete | Complete | Reusable component |
| 2026-09-22 | Dependent arrival query | Complete | Arrival depends on departure |
| 2026-09-22 | Flight search form | Complete | RHF + Zod |
| 2026-09-22 | End-to-end flight search | Complete | Search payload and results working |
| 2026-09-23 | Flight Results 2.0 | Complete | Filters, sorting, facets, loading/error/empty states, responsive UI |

---

# 26. Update Instructions for Future Milestones

After each completed milestone, add:

```text
1. What we built
2. Why we built it
3. New concepts learned
4. Important implementation decisions
5. Bugs encountered and lessons
6. Interview questions
7. Skills demonstrated
8. Updated architecture diagram if needed
9. Next milestone
10. Add the milestone to the update log
```

Keep the notes concise enough to revise before an interview, but detailed enough that the implementation can be explained confidently.
