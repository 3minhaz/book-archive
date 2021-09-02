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

    const url = ` http://openlibrary.org/search.json?q=${searchText}`
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
    console.log(books);
    const totalData = document.getElementById('total-data');
    totalData.textContent = '';
    const booksDiv = document.getElementById('books-div');
    booksDiv.textContent = '';
    error.innerText = '';

    books.forEach(book => {

        const booksCover = (book) => {
            if (book) {
                console.log(book);
                return book;
            }
        }
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
        console.log(author2)

        const firstPublishYear = (year) => {
            if (year) {
                console.log(year);
                return year;
            }
            else {
                return 'no first publisher found';
            }
        }
        const firstPublish = firstPublishYear(book.first_publish_year);
        totalData.innerText = `total seach results ${dataFound}`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img width='100px' height='300px' src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text">Author: ${author2}</p>
                    <p class="card-text">First Publish Year: ${firstPublish}</p>
                    
                </div>
            </div>
        `
        booksDiv.appendChild(div);
    })
}