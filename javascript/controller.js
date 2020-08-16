let textArea = document.getElementsByTagName('textArea')[0];
textArea.addEventListener('blur', saveNote);

let notes = JSON.parse(localStorage.getItem('notes'));
if (notes != null && notes.length) {
    let count = 0;
    notes.forEach(element => {
        let div = document.createElement('div');
        let data = element;
        div.setAttribute('class', count);
        div.style.cssText = "width:28%; padding:15px; border:1px solid grey; margin:5px; display: flex; flex-direction: column; justify-content: space-between; word-wrap: break-word;";
        let tpl = '<div>' +
            '<p>Note ' + (count + 1) + '</p>' +
            '<p class="data">' + data + '</p>' +
            '</div>' +
            '<div>' +
            '<button class="deleteBtn" value="' + (count) + '" style="padding: 3px; margin-top: 10px; border:none; background-color:#33FFBD;">' +
            '    Delete Note' +
            '</button>' +
            '</div>';
        div.innerHTML = tpl;
        let notesDiv = document.getElementById('createdNotes');
        notesDiv.appendChild(div);
        ++count;
    });
    let status = document.querySelector('#status');
    status.style.cssText = "padding:10px;";
    status.innerText = 'Your Notes';
}

document.querySelector('#createdNotes').addEventListener('click', deleteNote);

function deleteNote(e) {
    if (e.target !== e.currentTarget && e.target.classList[0] == 'deleteBtn') {
        e.target.parentElement.parentElement.remove();
        let localStorageOnDeleteNote = JSON.parse(localStorage.getItem('notes'));
        localStorageOnDeleteNote.splice(e.target.value, 1);
        localStorage.setItem('notes', JSON.stringify(localStorageOnDeleteNote));
        location.reload();
    }
    e.stopPropagation();
}

if (!notes) {
    let status = document.querySelector('#status');
    status.innerText = "You don't have any note";
    status.style.cssText = "font-size:20px; text-align:center; padding:10px;";
}

function saveNote(e) {
    let note = e.target.value;
    if (note) {
        let div = document.createElement('div');
        let count = document.getElementById('createdNotes').childElementCount;
        let data = document.getElementsByTagName('textArea')[0].value;
        div.setAttribute('class', count);
        div.style.cssText = "width:28%; padding:15px; border:1px solid grey; margin:5px; display: flex; flex-direction: column; justify-content: space-between; word-wrap: break-word;";
        let tpl = '<div>' +
            '<p>Note ' + (count + 1) + '</p>' +
            '<p class="data">' + data + '</p>' +
            '</div>' +
            '<div>' +
            '<button class="deleteBtn" value="' + (count) + '" style="padding: 3px; margin-top: 10px; border:none; background-color:#33FFBD;">' +
            '    Delete Note' +
            '</button>' +
            '</div>';
        div.innerHTML = tpl;
        let notesDiv = document.getElementById('createdNotes');
        notesDiv.appendChild(div);
        e.target.value = '';
        let status = document.querySelector('#status');
        status.style.cssText = "padding:10px;";
        status.innerText = 'Your Notes';
        let allNotes = JSON.parse(localStorage.getItem('notes'));
        if (allNotes != null) {
            allNotes.push(data);
        } else {
            allNotes = [data];
        }
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }
    else {
        console.log('No');
    }
}

document.querySelector('#searchBtn').addEventListener('click',searchData);

function searchData(e){
    let searchedData = document.getElementById('searchField').value;
    let notes = document.getElementsByClassName('data');
    if(searchedData){
       Array.from(notes).forEach(data => {
           if(!data.innerText.toLowerCase().includes(searchedData.toLowerCase())){
                data.parentElement.parentElement.style.display = 'none';
           }
       });
    }
    else{
       Array.from(notes).forEach(data => {
                data.parentElement.parentElement.style.display = '';
       });
    }
}