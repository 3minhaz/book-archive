const searchField = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const error = document.getElementById('error');
const noResult = document.getElementById('no-result');
searchButton.addEventListener('click', function () {
    const searchText = searchField.value;
    if (searchText === '') {
        error.innerText = 'search field cannot be empty';
        return;
    }
    searchField.value = '';

    const url = ` https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
})
const displayBooks = (data) => {
    noResult.innerText = '';
    const dataFound = data.docs.length;
    if (dataFound === 0) {
        noResult.innerText = 'no result found'
    }
    const books = data.docs;
    //clear DOM
    const totalData = document.getElementById('total-data');
    totalData.textContent = '';
    const booksDiv = document.getElementById('books-div');
    booksDiv.textContent = '';
    error.innerText = '';
    //forEach function
    books.forEach(book => {
        //book cover
        const booksCover = (book) => {
            if (book) {
                return book;
            }
            else {
                return 'no image found'
            }
        }

        const cover = booksCover(book.cover_i)
        //author name
        const authorName = (name) => {
            let arrayName = name;
            if (name) {
                arrayName = name[0]
            }
            else {
                return 'no author name available to show';
            }
            return arrayName;
        }
        const author2 = authorName(book.author_name);
        //first publish year
        const firstPublishYear = (year) => {
            if (year) {
                return year;
            }
            else {
                return 'N/A';
            }
        }
        //publisher
        const bookPublisher = (publisher) => {
            if (publisher) {
                console.log(publisher)
                return publisher[0].slice(0, 30);
            }
            else {
                return 'N/A'
            }
        }
        const published = bookPublisher(book.publisher);
        const firstPublish = firstPublishYear(book.first_publish_year);
        totalData.innerText = `Total seach results ${dataFound}`;
        //create div element and add element dynamically
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img width='100px' height='300px' src=" https://covers.openlibrary.org/b/id/${cover}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text"><span class="text-primary">Author:</span> ${author2}</p>
                    <p class="card-text"><span class="text-primary">First Publish Year: </span>${firstPublish}</p>
                    <p class="card-text"><span class="text-primary">Publisher:</span> ${published}</p>
                    
                </div>
            </div>
        `
        booksDiv.appendChild(div);
    })
}