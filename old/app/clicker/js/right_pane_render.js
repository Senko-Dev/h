// set default shop item id
var shopItemsId = 0;
// set shop items
var shopItems = [];
// are shop items loaded?
var loadedShopItems = false;
// add local storage
if (!localStorage.itemsPurchased) {
  localStorage.itemsPurchased = "{}";
}

// Some window alerts
function confirmVar() {
  return confirm("Are you sure you want to buy that item?");
}

// add options
var options = {
  // set color value
  color: { value: "#ffffff", recent: 1 },
  // set text
  text: { value: "h", recent: 0 },
  // set font size
  fontSize: { value: 250, recent: 0 },
};

// create new shop item class
class ShopItem {
  // add item property constructors
  constructor(name, types, displayName, desc, price, onselect) {
    // push this to shop items
    shopItems.push(this);
    // set shop item name to this name (local storage one)
    this.name = name;
    // keep track of items
    this.types = types;
    // set display name to this display name
    this.displayName = displayName;
    // set desc to this desc
    this.desc = desc;
    // set price to this price
    this.price = price;
    // function called on select
    this.onselect = function () {
      // map options and id
      this.types.map(
        (n) =>
          (options[n] = options[n]
            ? { value: options[n].value, recent: this.id }
            : { value: "", recent: this.id })
      );
      onselect();
    };
    // whether this item is purchased or not
    this.purchased = false;
    // is this selected
    this.selected = false;
    // the id
    this.id = shopItemsId;
    // increment id
    shopItemsId++;
    // do json parse shit (absolute garbage)
    // get the shop items purchased in the last session
    let x = JSON.parse(localStorage.itemsPurchased);

    if (x[this.name] !== undefined) {
      // get whether or not this item has been purchased
      this.purchased = x[this.name];
    }
    // the element that is displayed in the shop
    this.element = document.createElement("DIV");
    // change the element's class to .shopItem
    this.element.className = "shop-item";
    // set element id to this id
    this.element.id = this.id;
    // what is this garbage
    for (let i = 0; i < 4; i++) {
      // make new child for this parent
      this.element.appendChild(document.createElement("DIV"));
      // set class name of each child
      this.element.children[i].className = [
        "name",
        "desc",
        "price",
        ["not-purchased", "purchased"][+this.purchased],
      ][i];
      this.element.children[i].innerText = [
        // set text of each child
        this.displayName,
        this.desc,
        `Costs ${this.price} H.`,
        ["Not Purchased", "Purchased"][+this.purchased],
      ][i];
    }

    document.getElementById("shop-items").appendChild(this.element); // display this element in the #shop-items div

    // when this parent is clicked
    this.element.onclick = function () {
      // parse integer of the shop item id
      let item = shopItems[parseInt(this.id)];
      // if the parent is purchased, call the onselect function
      if (item.purchased) {
        item.onselect();
      } else {
        // if it's not bought, but it can be bought
        if (parseInt(localStorage.clickCount) >= item.price && confirmVar()) {
          // purchase this item
          item.purchased = true;
          this.children[3].innerText = "Purchased";
          this.children[3].className = "purchased";

          // save that the parent item is purchased
          let x = JSON.parse(localStorage.itemsPurchased);
          x[item.name] = true;
          localStorage.itemsPurchased = JSON.stringify(x);

          // select this item
          item.onselect();
          // take away the price of this item
          localStorage.clickCount =
            parseInt(localStorage.clickCount) - item.price;
          // update your h
          updateHCount();
        } else {
          window.alert("You didn't buy that item.");
        }
      }
    };
  }
}

// items begin now
addEventListener("load", function () {
  //  locaLStorageName, typesOfChanges, displayName, desc, hPrice
  new ShopItem(
    "lowercaseH",
    ["text", "fontSize"],
    "Lowercase h (Default Skin)",
    "The smallest of h.",
    0,
    function () {
      options.text.value = "h";
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "lightMode",
    ["color"],
    "Liqht H (Default Color)",
    "My eyes",
    0,
    function () {
      options.color.value = "#FFFFFF";
    }
  );
  new ShopItem(
    "capitalH",
    ["text", "fontSize"],
    "Capital H",
    "The biqqest of H",
    125,
    function () {
      options.text.value = "H";
      options.fontSize.value = 250;
    }
  );
  new ShopItem("darkMode", ["color"], "Dark H", "My Soul", 250, function () {
    options.color.value = "#000000";
  });
  new ShopItem(
    "fancyH",
    ["text", "fontSize"],
    "Fancy H",
    "The fanciest of H",
    500,
    function () {
      options.text.value = "𝒽";
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "redH",
    ["color"],
    "Red H",
    "The youtubiest of H",
    750,
    function () {
      options.color.value = "#ff0000";
    }
  );
  new ShopItem(
    "dancingH",
    ["text", "fontSize"],
    "Dancinq H",
    "It vibes",
    1000,
    function () {
      options.text.value =
        '<img src="https://cdn.discordapp.com/emojis/699995508810317895.gif?v=1" alt="h">';
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "blueH",
    ["color"],
    "Blue H",
    "The facebookiest of H",
    1250,
    function () {
      options.color.value = "#0000ff";
    }
  );
  new ShopItem(
    "fortniteH",
    ["text", "fontSize"],
    "Ninja H",
    "The phrase “it’s just a qame” is such a weak mindset. You are ok with what happened, losinq, imperfection of a craft. When you stop qettinq anqry after losinq, you’ve lost twice. There’s always somethinq to learn, and always room for improvement, never settle.",
    1500,
    function () {
      options.text.value =
        '<img src="https://media1.tenor.com/images/b251279ed54ed48dc45021890f7cd96a/tenor.gif" alt="h_hif" />';
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "2discH",
    ["color"],
    "Qreyple H",
    "The discordiest of H",
    5000,
    function () {
      options.color.value = "#99AAB5";
    }
  );
  new ShopItem(
    "fancyFancyH",
    ["text", "fontSize"],
    "Fancier H",
    "The Fanciestiest Of H",
    7500,
    function () {
      options.text.value =
        "██╗░░██╗\n██║░░██║\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝";
      options.fontSize.value = 150;
    }
  );
  new ShopItem(
    "greenH",
    ["color"],
    "Qreen H",
    "The 4chaniest of H",
    10000,
    function () {
      options.color.value = "#00ff00";
    }
  );
  new ShopItem(
    "dinnerbone",
    ["text", "fontSize"],
    "Y",
    "Ai mate, welcome to Aussy, you cunt",
    12500,
    function () {
      options.text.value = "ɥ";
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "1discH",
    ["color"],
    "Blurple H",
    "The discordier of H",
    15000,
    function () {
      options.color.value = "#7289DA";
    }
  );
  new ShopItem(
    "mathClassH",
    ["text", "fontSize"],
    "H Squared",
    "E S C L A D E D",
    50000,
    function () {
      options.text.value = "h²";
      options.fontSize.value = 250;
    }
  );
  new ShopItem(
    "scienceH",
    ["text", "fontSize"],
    "H Cubed",
    "E S C L A D E D++;",
    100000,
    function () {
      options.text.value = "h³";
      options.fontSize.value = 250;
    }
  );
  // set loaded shop items to true
  loadedShopItems = true;
  // set names to a map of the shop item ids
  names = shopItems.map((n) => n.id);
  //  update classes and h with intervals
  setInterval(updateClasses, 1000 / 60);
  setInterval(updateHButton, 1000 / 60);
});
// items end now

// set names
var names;

// update classes
function updateClasses() {
  // make eachItemSelected array
  let eachItemSelected = [];
  // initialize [eachItemSelected] as an array comprised entirely of <false>, with the length of [names]
  for (let i = 0; i < names.length; i++) {
    eachItemSelected.push(false);
  }
  // map a function with n passed to x
  Object.keys(options).map(function (n) {
    // get the most recent shop items for each category, and set that they are selected
    eachItemSelected[options[n].recent] = true;
  });
  // n is whether or not the item is selected, a is index of shop item
  eachItemSelected.map(function (n, a) {
    shopItems[a].selected = n;
    // if the item is supposed to be selected but isn't
    if (n && !shopItems[a].element.classList.contains("selected-item")) {
      // add the .selected-item class to the element
      shopItems[a].element.classList.add("selected-item");
    }
    // if the shop item isn't supposed to be selected but is
    if (!n && shopItems[a].element.classList.contains("selected-item")) {
      // remove the .selected-item class from the element
      shopItems[a].element.classList.remove("selected-item");
    }
  });
}
function updateHButton() {
  let h = document.getElementById("h");
  // without this if statement, flickering occurs
  if (h.innerHTML !== options.text.value) {
    h.innerHTML = options.text.value;
  }
  if (h.style.color !== options.color.value) {
    h.style.color = options.color.value;
  }
  if (h.style.fontSize !== options.fontSize.value + "px") {
    h.style.fontSize = options.fontSize.value + "px";
  }
}
