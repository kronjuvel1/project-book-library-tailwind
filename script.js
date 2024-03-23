const addBookForm = document.querySelector('#add-book-form');
const bookTableBody = document.querySelector('#book-table-body');
const readToggle = document.querySelector('#read-toggle');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages-read');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let titleValue = title.value;
    let authorValue = author.value;
    let pagesValue = pages.value;
    let readStatusValue = readToggle.checked;
    
    let bookAdd = new Book(titleValue, authorValue, pagesValue, readStatusValue);
    myLibrary.push(bookAdd);
}

function refreshBookTable() {
    while (bookTableBody.firstChild) {
        bookTableBody.removeChild(bookTableBody.firstChild);
    }

    myLibrary.forEach((book, index) => {
        displayBookInTable(book, index);
    });
}

function displayBookInTable(book) {
    const newRow = document.createElement('tr');
    const numberCell = document.createElement('td');
    
    numberCell.textContent = myLibrary.length;
    newRow.appendChild(numberCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    newRow.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    newRow.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.read ? book.pages : (book.pagesRead ? book.pagesRead : pagesValue.value);
    newRow.appendChild(pagesCell);

    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('btn');
    removeButton.addEventListener('click', function() {
        const index = myLibrary.indexOf(book);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            refreshBookTable();
        }
    });
    removeCell.appendChild(removeButton);
    newRow.appendChild(removeCell);

    bookTableBody.appendChild(newRow);
}

addBookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    addBookToLibrary();
    displayBookInTable(myLibrary[myLibrary.length - 1]);

    addBookForm.reset();
});

readToggle.addEventListener('change', function () {
    let pagesReadForm = document.querySelector('#pages-read-form');
    if (this.checked) {
        pagesReadForm.style.display = 'block';
    } else {
        pagesReadForm.style.display = 'none';
    }
});