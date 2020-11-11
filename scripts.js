const list = document.querySelector('#ToDoList');
const doneUl = document.querySelector('#Done');
const listArr = [];
const doneArr = [];
const add = (string) => {
    const valueInput = document.querySelector('#item');
    let inpTxt = valueInput.value;
    if (inpTxt === '' && string) {
            inpTxt = string
    }
    if (inpTxt === '') {
        alert('Nothing to add');
    } else {
        valueInput.value = '';
        valueInput.focus();
        listArr.push(inpTxt);
        const newIt = document.createElement('li');
        const newBt = document.createElement('button')
        const doneBt = document.createElement('button')
        const text = document.createElement('label')
        text.setAttribute("class", "h5 mx-1 my-1 text-break")
        newIt.setAttribute("id", listArr.length-1)
        newIt.setAttribute("class", 'ToDoItem list-group-item list-group-item-action d-flex justify-content-between bd-highlight')
        newBt.setAttribute("id", listArr.length-1)
        newBt.setAttribute("onClick", `rmv(${listArr.length-1}, 'main')`)
        newBt.setAttribute("class", "btn btn-danger btn-sm")
        newBt.innerText = 'X'
        doneBt.setAttribute("class", "btn btn-success btn-sm")
        doneBt.setAttribute("id", listArr.length-1)
        doneBt.setAttribute("onClick", `done(${listArr.length-1})`)
        doneBt.innerText = 'Done'
        const txt = document.createTextNode(inpTxt)
        text.appendChild(txt)
        newIt.appendChild(doneBt)
        newIt.appendChild(text)
        list.appendChild(newIt)
        newIt.appendChild(newBt)
    }
}

const rmv = (id, where) => {
    if (where === 'main') {
        const liIt = document.getElementById(`${id}`);
        liIt.remove()
        listArr.splice(id, 1)
        const allOfList = list.getElementsByTagName('li')
        for (let i = 0; i < allOfList.length; i++) {
            allOfList[i].setAttribute('id', i)
            const button = allOfList[i].querySelectorAll('button')
            button[0].setAttribute('id', i)
            button[1].setAttribute('id', i)
            button[1].setAttribute('onclick', `rmv(${i}, 'main')`)
            button[0].setAttribute('onclick', `done(${i})`)
        }
    } else if (where === 'trash') {
        const doneLi = doneUl.querySelector(`[id='${id}']`)
        doneLi.remove()
        doneArr.splice(id, 1)
        const allOfDone = doneUl.getElementsByTagName('li')
        for (let i = 0; i < allOfDone.length; i++) {
            allOfDone[i].setAttribute('id', i)
            const button = allOfDone[i].querySelectorAll('button')
            button[0].setAttribute('id', i)
            button[1].setAttribute('id', i)
            button[1].setAttribute('onclick', `rmv(${i}, 'trash')`)
            button[0].setAttribute('onclick', `undo(${i})`)
        }

    }
}

const undo = (id) => {
    const doneLi = doneUl.querySelector(`[id='${id}']`)
    const inTxt = doneLi.getElementsByTagName('s')
    const undoValue = inTxt[0].innerText
    add(undoValue)
    rmv(id, 'trash')
}

const done = (id) => {
    const liIt = document.getElementById(`${id}`);
    const lab = liIt.querySelector('label')
    rmv(id, 'main')
    const doneIt = document.createElement('li');
    const rmvBt = document.createElement('button')
    const undoBt = document.createElement('button')
    const s = document.createElement('s')
    const txt = document.createTextNode(lab.textContent)
    doneIt.setAttribute("id", doneArr.length)
    doneArr.push(id);
    doneIt.setAttribute("class", 'Done list-group-item list-group-item-action h5 d-flex justify-content-between bd-highlight')
    rmvBt.setAttribute("id", doneArr.length-1)
    rmvBt.setAttribute("onClick", `rmv(${doneArr.length-1}, 'trash')`)
    rmvBt.setAttribute("class", "btn btn-danger btn-sm")
    rmvBt.innerText = 'X'
    undoBt.setAttribute("class", "btn btn-warning btn-sm")
    undoBt.setAttribute("id", doneArr.length-1)
    undoBt.setAttribute("onClick", `undo(${doneArr.length-1})`)
    s.setAttribute("class", "mx-1 my-1 text-break")
    undoBt.innerText = 'Undo'
    s.appendChild(txt)
    doneIt.appendChild(undoBt)
    doneIt.appendChild(s)
    doneIt.appendChild(rmvBt)
    doneUl.appendChild(doneIt)
}

