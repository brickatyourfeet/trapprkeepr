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
    notes.push(note)
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

addNote('example title', 'a bunch of body text blah blah blah blah')
addNote('example title2', 'a bunch of body text blah blah blah blah')
addNote('example title3', 'a bunch of body text blah blah blah blah')

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
                        <a href="#" class="btn btn-primary">Read</a>
                        <a href="#" class="btn btn-primary">Edit</a>
                        <button id ="remover" onclick="removeNote('${note.title}')">Remove</a>
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
