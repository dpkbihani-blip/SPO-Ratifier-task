# Design Notes
(AI generated for professional wordings)
## Architecture

The project follows a layered architecture:

```text
Frontend (Next.js)
        ↓
Handlers
        ↓
Services
        ↓
Repositories
        ↓
PostgreSQL
```

* **Handlers** manage HTTP requests and responses.
* **Services** contain business logic.
* **Repositories** handle database interactions.
* This separation improves maintainability and makes future extensions easier.

---

## Session Management

For the scope of this assignment, session state is maintained using browser localStorage.

Stored values:

* `user_id`
* `role`

This approach was chosen to keep the implementation lightweight and focus development effort on the verification workflow.

In a production environment, this would be replaced with JWT-based authentication and authorization middleware.

---

## Database Design

Core entities(tables):

* Users
* Domains
* Verification Requests
* Domain Admin Assignments

---

## Key Design Decisions

* REST API architecture for simplicity and clarity.
* PostgreSQL as the primary data store.
* Tailwind CSS for rapid UI development.
* Separation of concerns through Handler-Service-Repository layers.
* Domain-based approval workflow to reflect SPO verification requirements.

---

## Future Improvements

* JWT authentication and refresh tokens.
* File uploads instead of proof links.
* PDF report generation and exports.




- PDF Report Generation
NOT IMPLEMENTED :(

