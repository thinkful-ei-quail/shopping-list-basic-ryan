
// eslint-disable-next-line strict
'use strict';

const STORE = [
  {id: getRandomInt(100000), name: 'apples', checked: false, color: '#808080'},
  {id: getRandomInt(100000), name: 'oranges', checked: false, color: '#808080'},
  {id: getRandomInt(100000), name: 'milk', checked: true, color: '#808080'},
  {id: getRandomInt(100000), name: 'bread', checked: false, color: '#808080'}
];

const COLORS = ['#E40ABF', '#0AE455', '#E4C60A', '#FF4B4B'];

// Generates a random number in place of the cuid
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


// Generates the HTML string for a single item in the STORE and returns it as a string
function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" style="color:${item.color}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-color js-item-color">
            <span class="button-label">Color</span>
        </button>
        <div>
          <p>
            ${item.id} is ${item.name} ${item.checked ? ' and it is checked off the list' : ''}
          </p>
        </div>
      </div>
    </li>`;
}

// 
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));

  //console.log(items);
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: getRandomInt(100000), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.find(item => item.id === itemId);
  console.log(item.name + ' is checked');
  item.checked = !item.checked;
}

function chooseRandomColor(){
  let color = COLORS[getRandomInt(COLORS.length)];
  return color;
}

function changeColorsForListItem(itemId) {
  const item = STORE.find(item => item.id === itemId);
  console.log(`changing colors for the ${item.name}. Please stand by...`);
  let colorChosenForListItem = chooseRandomColor();
  item.color = colorChosenForListItem;
  console.log(item.color + ' has been chosen for this item.');
}




function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function handleItemColorClicked() {
  $('.js-shopping-list').on('click', '.js-item-color', event => {
    console.log('`handleItemColorClicked` ran');
    // we need to get the id from the element you just clicked on
    const id = getItemIdFromElement(event.currentTarget);
    changeColorsForListItem(id);
    
    console.log($(event.target));
    console.log($(event.currentTarget).parent().closest('li[data-item-id=' + id +']').find('.shopping-item').css('font-size'));
    $(event.currentTarget).parent().closest('li[data-item-id=' + id +']').first('.shopping-item').css('background-color','green' );
    renderShoppingList();
  });
}

function deleteListItem(itemId) {
  console.log(`Deleting item with id  ${itemId} from shopping list`);

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // First we find the index of the item with the specified id using the native
  // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
  // the list item we want to remove, with a removeCount of 1.
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the ID of the item from the HTML
    const itemId = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemId);
    // render the updated shopping list
    renderShoppingList();
  });
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
  handleItemColorClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);