const {RESTDataSource} = require('@apollo/datasource-rest');

class GoogleBooksAPI extends RESTDataSource {
    constructor () {
        super();
        this.baseURL = 'https://www.googleapis.com/books/v1/volumes/';
    }

    async searchBooks(query) {
        const response = await this.get('volumes', {
            params: {
                q: query,
                maxResults: 10,
            },
        })

        return Array.isArray(response.items)
        ? response.items.map((book) => this.bookReducer(book)) : [];
    }

    bookReducer(book) {
        return {
            id: book.id, 
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks?.thumbnail || '',
        };
    }
}

module.exports = GoogleBooksAPI;