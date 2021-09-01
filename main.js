const searchField = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    const searchText = searchField.value;
    const url = ` http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
})
const displayBooks = (books) => {
    console.log(books);
    // console.log(book.author_name[0]);
    books.forEach(book => {
        console.log(book.cover_i);
        // console.log(book.title);
        // console.log(book.author_name[0]);
        // console.log(book.first_publish_year);
        const bookName = book.author_name;
        // bookName.forEach(bookName => {
        //     console.log(bookName)
        // })
        const booksDiv = document.getElementById('books-div');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img width='100px' height='300px' src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">title: ${book.title}</h5>
                    <p class="card-text">Author: ${book.author_name}</p>
                </div>
            </div>
        `
        booksDiv.appendChild(div);
    })
}