// event listeners
// selecting information
// inside the event listener, all js

//render at beginning too


var fetchNotes = () => {
  var notesString = window.localStorage.getItem('trapprkeepr')
  if (notesString !== null) {
    return JSON.parse(notesString)
  } else {
    return []
  }
}

var saveNotes = (notes) => {
  window.localStorage.setItem('trapprkeepr', JSON.stringify(notes))
}



var addNote = (title, body) => {
  var notes = fetchNotes()
  var note = {
    title,
    body
  }

  var duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.unshift(note)
    saveNotes(notes)
    return note
  }
}

var removeNote = (title) => {
  var notes = fetchNotes()

  for (var i = 0; i < notes.length; i++) {
    if (notes[i].title === title) {
      notes.splice(i, 1);
      saveNotes(notes);
      return;
    }
  }
  location.reload()
}

//addNote('example title', 'a bunch of body text blah blah blah blah')
addNote('competitors', 'trapprkeepr requires no log in, no commitment, and one button click to save a note to local storage.')
addNote('trapprkeepr tips:', 'Enter a title of note and content and then hit the add note button. Once the note has been created, it will appear at the top of your stack. Press remove to delete a note.')

var cardSpace = document.querySelector('#cardspace')
console.log(fetchNotes())

var makeCard = function(note) {
  //this is where the bootstrap card should be
  var newDiv = document.createElement('div')
  var titleString = note.title.toString();
  var bodyString = note.body
  //    var newTitle = document.createTextNode(titleString)
  //    var newBody = document.createTextNode(bodyString)
  //    newDiv.appendChild(newTitle)
  //    newDiv.appendChild(newBody)


  var markup = `<div class="card" style="width: 20rem;">
                    <div class="card-block">
                        <h4 class="card-title">${note.title}</h4>
                        <p class="card-text">${note.body}</p>
                        <button id ="remover" class="btn btn-primary" onclick="removeNote('${note.title}')">Remove</a>
                    </div>
                </div><br>`

  newDiv.innerHTML = markup

  return newDiv
  //var something = document.createElement('p')
  //something.textContent = note.title + '' + note.body
  //return something
}

//for loop // make bootstrap cards
//for loop here v
for (let i = 0; i < fetchNotes().length; i++) {
  cardSpace.append((makeCard(fetchNotes()[i])))
}



const form = document.querySelector('#new-note')

form.addEventListener('submit', function(event) {
  event.preventDefault()
  var inputs = document.querySelectorAll('#new-note-title, #new-note-body')
  var title = inputs[0]
  var body = inputs[1]

  addNote(title.value, body.value)
  //log note - display
});

//button functionality
document.getElementById("submitter").onclick = function() {
  getNewNote()
};

function getNewNote() {
  var title = getNoteTitle();
  var body = getNoteBody();
  location.reload();
  //alert("Title: " + title + " - " + "Body: " + body);
}

function getNoteTitle() {
  var title = document.getElementsByClassName("notes-title");
  return title[0].value;
}

function getNoteBody() {
  var body = document.getElementsByClassName("notes-body");
  return body[0].value;
}
