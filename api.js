// Base API URL targeting JSONPlaceholder mockup service
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Element References
const loadBtn = document.getElementById('load-btn');
const submitBtn = document.getElementById('submit-btn');
const statusMsg = document.getElementById('status');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const notesList = document.getElementById('noteslist');

// Reusable async HTTP Request helper
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

// UI Helper: Display Status Messages with Accessibility Support
function showStatus(message, type = 'info') {
  statusMsg.textContent = message;
  statusMsg.className = `status-message ${type}`;
}

// UI Helper: Toggle UI loading lock on buttons
function toggleLoading(isLoading) {
  loadBtn.disabled = isLoading;
  submitBtn.disabled = isLoading;
}

// Render Notes safely using textContent to prevent XSS
function renderNotes(notes) {
  notesList.innerHTML = '';

  if (!notes || notes.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'empty-state';
    emptyLi.textContent = 'No notes available. Click "Load Notes" or create a new one above.';
    notesList.appendChild(emptyLi);
    return;
  }

  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.dataset.id = note.id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'note-content';

    const h3 = document.createElement('h3');
    h3.textContent = note.title;

    const p = document.createElement('p');
    p.textContent = note.body || 'No content provided.';

    contentDiv.appendChild(h3);
    contentDiv.appendChild(p);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id, li));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

// Task 1: Load 10 Notes (GET)
async function loadNotes() {
  toggleLoading(true);
  showStatus('Loading notes...', 'info');

  try {
    const data = await request(`${API_URL}?_limit=10`);
    renderNotes(data);
    showStatus(`Loaded ${data.length} notes from the server.`, 'success');
  } catch (error) {
    showStatus(`Failed to load notes: ${error.message}`, 'error');
  } finally {
    toggleLoading(false);
  }
}

// Task 2: Create Note (POST)
async function createNote(event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  // Validation
  if (!title) {
    showStatus('Title is required.', 'error');
    return;
  }

  if (title.length > 100) {
    showStatus('Title must be 100 characters or fewer.', 'error');
    return;
  }

  toggleLoading(true);
  showStatus('Saving note...', 'info');

  try {
    const newNote = await request(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    // Handle initial state if list was empty
    if (notesList.querySelector('.empty-state')) {
      notesList.innerHTML = '';
    }

    // Prepend created note to top of UI list
    const li = document.createElement('li');
    li.className = 'note-item';
    li.dataset.id = newNote.id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'note-content';

    const h3 = document.createElement('h3');
    h3.textContent = newNote.title;

    const p = document.createElement('p');
    p.textContent = newNote.body || 'No content provided.';

    contentDiv.appendChild(h3);
    contentDiv.appendChild(p);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(newNote.id, li));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.prepend(li);

    showStatus(`Note created (status 201, id ${newNote.id}).`, 'success');
    noteForm.reset();
  } catch (error) {
    showStatus(`Failed to create note: ${error.message}`, 'error');
  } finally {
    toggleLoading(false);
  }
}

// Task 3: Delete Note (DELETE)
async function deleteNote(id, element) {
  // NOTE: JSONPlaceholder is a mock API. It returns a 200/204 response on DELETE 
  // but does not permanently erase data on its remote server. We simulate real behavior 
  // by removing the element from the DOM upon receiving a successful response.
  toggleLoading(true);
  showStatus(`Deleting note #${id}...`, 'info');

  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    element.remove();
    showStatus(`Note #${id} deleted successfully.`, 'success');

    if (notesList.children.length === 0) {
      renderNotes([]);
    }
  } catch (error) {
    showStatus(`Failed to delete note #${id}: ${error.message}`, 'error');
  } finally {
    toggleLoading(false);
  }
}

// Event Listeners Initialization
loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);

// Initial empty state rendering
renderNotes([]);
