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
    books.forEach(book => {
        // console.log(book.author_name);
        const bookName = book.author_name;
        // bookName.forEach(bookName => {
        //     console.log(bookName)
        // })
    })
}