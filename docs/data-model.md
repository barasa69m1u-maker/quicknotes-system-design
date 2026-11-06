
---

### File 5: `docs/data-model.md`
*Location: `docs/data-model.md`*

```markdown
# QuickNotes Data Model & Database Specification

## 1. Relational Entities & Attributes

* **`users`**: Stores user authentication data and profile metadata.
* **`notes`**: Stores note content (title, body) associated with a user.
* **`tags`**: Stores unique tags created for categorization.
* **`note_tags`**: Join table managing the many-to-many relationship between notes and tags.

---

## 2. Entity Relationships
* **User to Notes (One-to-Many):** A single user can create multiple notes (`users.id` -> `notes.user_id`). Each note belongs to exactly one user.
* **Notes to Tags (Many-to-Many):** A note can have multiple tags, and a tag can be attached to multiple notes. This is resolved via the `note_tags` junction table.

---

## 3. SQL CREATE TABLE Statements

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE note_tags (
    note_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

SELECT 
    n.id, 
    n.title, 
    n.body, 
    n.created_at,
    GROUP_CONCAT(t.name SEPARATOR ', ') AS tags
FROM notes n
LEFT JOIN note_tags nt ON n.id = nt.note_id
LEFT JOIN tags t ON nt.tag_id = t.id
WHERE n.user_id = 1
GROUP BY n.id
ORDER BY n.created_at DESC;


SELECT n.id, n.title, n.body 
FROM notes n
JOIN note_tags nt ON n.id = nt.note_id
JOIN tags t ON nt.tag_id = t.id
WHERE t.name = 'backend' AND n.user_id = 1;


SELECT user_id, COUNT(*) AS total_notes
FROM notes
GROUP BY user_id;


CREATE INDEX idx_notes_user_id ON notes(user_id);
