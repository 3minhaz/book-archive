const searchField = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const error = document.getElementById('error');
const totalData = document.getElementById('total-data');
const noResult = document.getElementById('no-result');

//spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
searchButton.addEventListener('click', function () {
    const searchText = searchField.value;
    toggleSpinner('block')
    if (searchText === '') {
        error.innerText = 'search field cannot be empty';
        toggleSpinner('none');
        return;
    }
    searchField.value = '';

    const url = ` https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
})
const displayBooks = (data) => {

    // console.log(data)
    noResult.innerText = '';
    const dataFound = data.numFound;
    if (dataFound === 0) {
        noResult.innerText = 'no result found'
    }
    const books = data.docs;

    //clear DOM
    totalData.textContent = '';
    const booksDiv = document.getElementById('books-div');
    booksDiv.textContent = '';
    error.innerText = '';

    //forEach function
    books.forEach(book => {

        //book cover
        const booksCover = (book, book2, noImage) => {

            if (book !== undefined) {
                console.log(book)
                return book2;
            }
            else (noImage)
            return noImage;
        }
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const noImage = `https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg`
        const cover = booksCover(book.cover_i, imgUrl, noImage);

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
                <img width='100px' height='300px' src="${cover}" class="card-img-top" alt="...">
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
    toggleSpinner('none')
}