
---

### File 7: `README.md`
*Location: root `README.md`*

```markdown
# QuickNotes System Design & API Client Prototype

## Description
QuickNotes is a full-stack system design project demonstrating a browser-based API client interacting with a mock backend (JSONPlaceholder), backed by production-grade engineering documentation for scaling to 1 million users.

---

## Project Structure
* `index.html` - HTML5 interface for loading, creating, and deleting notes.
* `style.css` - Responsive layout with state styling (success, loading, error).
* `api.js` - Async JavaScript client using Fetch API with error handling and DOM sanitization.
* `docs/api-design.md` - Complete REST API documentation for backend engineers.
* `docs/data-model.md` - Database schema, SQL queries, relationships, and indexing strategy.
* `docs/architecture.md` - Scalability design, load estimates, text diagram, and request flows.

---

## How to Run the API Client
1. Clone this repository to your local workspace.
2. Open `index.html` directly in any standard web browser (or use VS Code Live Server).
3. Click **Load Notes** to test GET requests.
4. Use the form to submit new notes (POST) or click **Delete** on any note item (DELETE).

---

## What I Learned
1. **API State Management:** Implementing clear visual feedback for loading, success, error, and empty states improves user experience during async HTTP requests.
2. **DOM Security:** Using `textContent` exclusively prevents Cross-Site Scripting (XSS) when rendering untrusted user input.
3. **Database Architecture & Scaling:** Designing relational schemas with indexes and read replicas guarantees fast query performance even under high traffic loads.