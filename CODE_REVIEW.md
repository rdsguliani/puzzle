

Code Smells:

1.  For search box, 
    a. search text is not trimmed with white spaces before rest call is made. 
    b. application should remove extra spaces between the two words using regex/replace, so that there is not extra space between two words being searched.

2. While calling searchBooks() method on click of search button, application is using this.searchForm.value.term for null check and it is not trimmed search value, rather we should have a consistency and always get searchTxt from searchTerm getter as it will help to maintain consistency and reduce redundancy. for ex: writting regex for space in between and trim() extra white space.

3. As application is maintaining the state on refresh of reading list, not sure why we added check for searchText on                              book-search.component.html, rather application should update the term with previously searched text and show books list too.                like it is being done for reading list, it shows lastly added items.

4.  As with every feature being added, our set of reducers, selectors, actions, and effects will increase, and having all of them       along with spec files, under one directory will make cumbursome to manage, instead we can follow proper directory structure and     have reducers, selectors, actions, effects, and spec in respective folders.

5. if we are planning to support application in multiple languages, translator keys are missing. Most of the content/text is hard coded in HTML, so will be difficult later when we need to open for multiple language support.
 
6. Application is not semantice HTML

Accessibility:

1. Role attributes are missing on the book-grid div on book-search.component.html. it should have Role of list and repeat for the list of items should have Role of listitem.

2. Div of image doesnt have Role of role="figure" in the list and sidenav.

3. Search Input doesnt have Arialabel of search, it is marked as aria-label="Search"
