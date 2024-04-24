const themeController = document.querySelector('#theme-controller');
themeController.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dracula');
        localStorage.setItem('theme', 'dracula');
    } else {
        document.documentElement.setAttribute('data-theme', 'cupcake');
        localStorage.setItem('theme', 'cupcake');
    }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'sunset') {
        document.documentElement.setAttribute('data-theme', 'dracula');
        themeController.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'cupcake');
        themeController.checked = false;
    }
}


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.addBookForm = document.querySelector('#add-book-form');
        this.bookTableBody = document.querySelector('#book-table-body');
        this.readToggle = document.querySelector('#read-toggle');
        this.title = document.querySelector('#title');
        this.author = document.querySelector('#author');
        this.pages = document.querySelector('#pages-read-form');
        this.pagesReadDiv = document.querySelector('#pages-read');
        this.pagesReadForm = document.querySelector('#pages-read-form');
        this.init();
    }

    init() {
        this.readToggle.addEventListener('change', () => this.togglePagesRead());
        this.addBookForm.addEventListener('submit', (event) => this.handleAddBook(event));
    }

    addBookToLibrary() {
        const titleValue = this.title.value;
        const authorValue = this.author.value;
        const pagesValue = this.pages.value;
        const readStatusValue = this.readToggle.checked;

        const book = new Book(titleValue, authorValue, pagesValue, readStatusValue);
        this.books.push(book);
    }

    refreshBookTable() {
        while (this.bookTableBody.firstChild) {
            this.bookTableBody.removeChild(this.bookTableBody.firstChild);
        }

        this.books.forEach((book, index) => {
            this.displayBookInTable(book, index);
        });
    }

    displayBookInTable(book) {
        const newRow = document.createElement('tr');
        const numberCell = document.createElement('td');
        numberCell.textContent = this.books.length;
        newRow.appendChild(numberCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        newRow.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        newRow.appendChild(authorCell);

        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.read ? book.pages : 'Unread';
        newRow.appendChild(pagesCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn');
        removeButton.addEventListener('click', () => this.removeBook(book));
        removeCell.appendChild(removeButton);
        newRow.appendChild(removeCell);

        this.bookTableBody.appendChild(newRow);
    }

    togglePagesRead() {
        if (this.readToggle.checked) {
            this.pagesReadDiv.style.display = 'block';
            this.pagesReadForm.setAttribute('required', 'required');
        } else {
            this.pagesReadDiv.style.display = 'none';
            this.pagesReadForm.removeAttribute('required');
        }
    }

    handleAddBook(event) {
        event.preventDefault();
        this.addBookToLibrary();
        this.displayBookInTable(this.books[this.books.length - 1]);
        this.addBookForm.reset();
        this.readToggle.checked = false;
        if (!this.readToggle.checked) {
            this.pagesReadDiv.style.display = 'none';
            this.pagesReadForm.removeAttribute('required');
        }
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.refreshBookTable();
        }
    }
}

const library = new Library();