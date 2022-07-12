// In this exercise, you'll build a simple inventory management system. The system is composed of an item creator, an items manager, and a reports manager. The item creator makes sure that all necessary information are present and valid. The item manager is responsible for creating items, updating information about items, deleting items, and querying information about the items. Finally, the report manager generates reports for a specific item or ALL items. Reports for specific items are generated from report objects created from the report manager. The report manager is responsible for reports for all items.

// Here's all the required information for an item:

// SKU code: This is the unique identifier for a product. It consists of the first 3 letters of the item and the first 2 letters of the category. If the item name consists of two words and the first word consists of two letters only, the next letter is taken from the next word.
// Item name: This is the name of the item. It must consist of a minimum of 5 characters. Spaces are not counted as characters.
// Category: This is the category that the item belongs to. It must consist of a minimum of 5 characters and be only one word.
// Quantity: This is the quantity in stock of an item. This must not be blank. You may assume that a valid number will be provided.

// The following are the methods that the items manager can perform:

// create: This method creates a new item. Returns false if creation is not successful.
// update: This method accepts an SKU Code and an object as an argument and updates any of the information on an item. You may assume valid values will be provided.
// delete: This method accepts an SKU Code and deletes the item from the list. You may assume a valid SKU code is provided.
// items: This property contains a list of all the items.
// inStock: This method lists all the items that have a quantity greater than 0.
// itemsInCategory: This method lists all the items for a given category

// The following are the methods on the reports managers:

// init: This method accepts the ItemManager object as an argument and assigns it to the items property.
// createReporter: This method accepts an SKU code as an argument and returns an object.
// The returned object has one method, itemInfo. It logs to the console all the properties of an object as "key:value" pairs (one pair per line). There are no other properties or methods on the returned object (except for properties/methods inherited from Object.prototype).
// reportInStock: Logs to the console the item names of all the items that are in stock as a comma separated values.

// Notes:

// There's no need to add the ability to validate the uniqueness of the SKU code. Given the current description, it's possible that a duplicate will exist.
// Each required piece of information for an item corresponds to one property.
// If any of the information provided is not valid, the item creator returns an object with a notValid property with a value of true.
// The created item objects should not have any methods/properties on them other than the required information above and those inherited from Object.prototype.
// You may add methods to the item manager as you deem necessary.

let ItemManager = (function() {
  function createSKU(name, category) {
    let sku = '';
    let splitName = name.split(' ');
    
    if (splitName.length === 2 && splitName[0].length === 2) {
      sku += splitName[0];
      sku += splitName[1].slice(0, 3);
    } else {
      sku += name.slice(0, 3);
      sku += category.slice(0, 2);
    }
    
    return sku.toUpperCase();
  }
  
  function validName(name) {
    return (name.split('').filter(char => char !== ' ').length >= 5);
  }

  function validCategory(category) {
    return (!category.includes(' ') && category.length >= 5); 
  }

  function validQuantity(quantity) {
    return (quantity >= 0 && !Number.isNaN(Number(quantity)));
  }
  
  return {
    items: [],
    
    create(name, category, quantity) {
      if (validName(name) && validCategory(category) && validQuantity(quantity)) {
        let item = {
          name,
          category,
          quantity,
          SKU: createSKU(name, category),
        };
        
        this.items.push(item);
        return this;
      } else {
        return { notValid: true };
      }
   },

    update(sku, itemObject) { 
      let item = this.items.filter(item => item.SKU === sku)[0];
      let info = Object.keys(itemObject)[0];
      item[info] = itemObject[info];
    },

    delete(sku) {
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].SKU === sku) {
          index = i;
        }
      }
      
      this.items.splice(index, 1);
    },
    
    inStock() {
      this.items.forEach(item => {
        if (item.quantity > 0) {
          console.log(item);
        }
      });
    },

    itemsInCategory(category) {
      this.items.forEach(item => {
        if (item.category === category) {
          console.log(item);
        }
      });
    },
  }
})();


let ReportManager = (function() {
  return {
    init(manager) {
      this.items = manager.items;
    },

    createReporter(sku) {
      let object = {};
      let allItems = this.items;
      
      object.itemInfo = function() {
        let item = allItems.filter(item => item.SKU === sku)[0];
        Object.keys(item).forEach(property => {
          console.log(`${property}: ${item[property]}`);
        });
      }

      return object;
    },

    reportInStock() {
      let inStockItems = this.items.filter(item => {
        return item.quantity > 0;
      }).map(item => item.name);

      console.log(inStockItems.join(', '));
    },
  }
})();

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
console.log(ItemManager.items); // 4 items
// [
//   {
//     name: 'basket ball',
//     category: 'sports',
//     quantity: 0,
//     SKU: 'BASSP'
//   },
//   {
//     name: 'soccer ball',
//     category: 'sports',
//     quantity: 5,
//     SKU: 'SOCSP'
//   },
//   { name: 'football', category: 'sports', quantity: 3, SKU: 'FOOSP' },
//   {
//     name: 'kitchen pot',
//     category: 'cooking',
//     quantity: 3,
//     SKU: 'KITCO'
//   }
// ]

ReportManager.init(ItemManager);
console.log(ReportManager.reportInStock()); // soccer ball, football, kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock()); 
// { name: 'football', category: 'sports', quantity: 3, SKU: 'FOOSP' }
// { name: 'kitchen pot', category: 'cooking', quantity: 3, SKU: 'KITCO' }
console.log(ReportManager.reportInStock()); // football, kitchen pot
ItemManager.itemsInCategory('sports');
// { name: 'basket ball', category: 'sports', quantity: 0, SKU: 'BASSP' }
// { name: 'soccer ball', category: 'sports', quantity: 0, SKU: 'SOCSP' }
// { name: 'football', category: 'sports', quantity: 3, SKU: 'FOOSP' }
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// [
//   {
//     name: 'basket ball',
//     category: 'sports',
//     quantity: 0,
//     SKU: 'BASSP'
//   },
//   { name: 'football', category: 'sports', quantity: 3, SKU: 'FOOSP' },
//   {
//     name: 'kitchen pot',
//     category: 'cooking',
//     quantity: 3,
//     SKU: 'KITCO'
//   }
// ]

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo(); 
// name: kitchen pot
// category: cooking
// quantity: 3
// SKU: KITCO

ItemManager.update('KITCO', { quantity: 10 });
console.log(kitchenPotReporter.itemInfo());
// name: kitchen pot
// category: cooking
// quantity: 10
// SKU: KITCO