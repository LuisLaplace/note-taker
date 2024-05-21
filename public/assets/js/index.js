// Define variables
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

// Check if on the notes page
if (window.location.pathname === '/notes.html') {
  // Select elements from the DOM
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelector('.list-container');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'block';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Function to fetch notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Function to save a note
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

// Function to delete a note
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Function to render the active note in the form
const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// Function to handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  
  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
      // Reload the page after saving the note
      location.reload();
    })
    .catch(err => console.error('Error saving note:', err));
};

// Function to handle deleting a note
const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target.parentElement;
  const noteId = JSON.parse(note.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch(err => console.error('Error deleting note:', err));
};

// Function to handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Function to handle creating a new note view
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Function to render the buttons based on the form state
const handleRenderBtns = () => {
  show(clearBtn);

  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Function to render the list of notes
const renderNoteList = (notes) => {
  noteList.innerHTML = '';

  notes.forEach((note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.setAttribute('data-note', JSON.stringify(note));

    const span = document.createElement('span');
    span.classList.add('list-item-title');
    span.innerText = note.title;
    span.addEventListener('click', handleNoteView);

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
    deleteBtn.addEventListener('click', handleNoteDelete);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
  });
};

// Function to get and render the notes
const getAndRenderNotes = () => {
  getNotes()
    .then(response => response.json())
    .then(data => renderNoteList(data))
    .catch(err => console.error('Error fetching notes:', err));
};

// Event listeners
if (window.location.pathname === '/notes.html') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

// Initial render of notes
getAndRenderNotes();
