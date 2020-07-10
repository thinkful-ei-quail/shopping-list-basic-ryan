
// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.

// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

// this function will be responsible for rendering the shopping list in the DOM
// Every time an item is added, deleted or checked it will re-render the page
// to correlate  to the properties in STORE
function renderShoppingList() {
  console.log('`renderShoppingList` ran');
}

  // this function will be responsible for when users add a new shopping list item
  // When a user enters an item into the input box and press enter
  // The text value will be stored in an addNewItem variable
  // The new item will be an object to be pushed to the STORE
  // And also update the renderShoppingList 
function handleNewItemSubmit() {
  console.log(item, '`handleNewItemSubmit` ran');
}

// Each item rendered will have a 'check' button attached
// When checked, it will toggle a style change for the targeted STORE name
// The check button will also mutate the 'checked' property in STORE to true or false
// false being the default
function handleItemCheckClicked() {
  console.log('`handleItemCheckClicked` ran');
}

// this function will be responsible for when users want to delete a shopping list
// Each item rendered will also have a 'delete' button next to the 'check'
// When pressed it will remove the item entirely from the DOM
// When pressed it will also remove the object from the STORE array
function handleDeleteItemClicked() {
 console.log('`handleDeleteItemClicked` ran');
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

// when the page loads, call `handleShoppingList` which enables all other functions
$(handleShoppingList);