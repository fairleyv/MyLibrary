import React, { createContext, useEffect, useState } from 'react';
import { SEARCH_BOOKS } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';

// Create the context
export const BookContext = createContext();

// Create the provider component
const BookProvider = ({ children }) => {
    const [groupSearchFormatted, setGroupSearchFormatted] = useState([]);


    // const [exercises, setExercises] = useState([
    //     { id: 1, name: 'exercise 1', difficulty: 'easy' },
    //     { id: 2, name: 'exercise 2', difficulty: 'easy' },
    //     { id: 3, name: 'exercise 3', difficulty: 'easy' },
    // ]);


  const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const  [searchGoogleBooks, {loading error, data}] = useLazyQuery(SEARCH_BOOKS, {
    variables: { query: searchInput}
  });

    const formatData = (data) => {

        let dataArray = data?.searchBooks;
        if (data.searchBooks) {
            setSearchedBooks(dataArray.map((book) => ({
                bookId: book.id,
                authors: book.authors || ['No author to display'],
                title: book.title,
                description: book.description,
                image: book.image || '',
            })));
        }
    }
    console.log(searchedBooks);

    useEffect(() => {
        console.log(data);
        setTimeout(() => formatData(data), 10)        


    }, [data])

    const bookSearch = (input) => {
        console.log(input);

        searchGoogleBooks({
            variables: { query: input }
        });
        if (loading) {
            return <div>Loading...</div>;
        }
        if (queryError) {
            return <div>Error...</div>;
        }
    }


    return (
        <BookContext.Provider value={{ bookSearch, searchGoogleBooks, formatData }}>
            {children}
        </BookContext.Provider>
    );

};

export {ExerciseProvider};