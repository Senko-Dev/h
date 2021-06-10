// Update The H Count
function updateHCount() {
  document.getElementById("h-count").innerText = localStorage.clickCount;
}

function actionNo() {
  window.alert(
    "You cannot do that action, or you didn't want to do that action."
  );
}

function confirmAction() {
  return confirm("Are you sure you want to do that?");
}

// Click (relies on updateHCount)
function clicked() {
  localStorage.clickCount = parseInt(localStorage.clickCount) + 1;
  updateHCount();
}

function destroy() {
  localStorage.removeItem("clickCount");
  localStorage.removeItem("itemsPurchased");
  window.location.reload();
}

// reset h count and upgrades purchased (relies on confirmVar)
function reset() {
  if (localStorage.clickCount === "NaN" && confirmVar()) {
    destroy();
  } else {
    actionNo();
  }
}

while (localStorage.clickCount === 9007199254740992) {
  destroy();
}

// Rebirth (relies on remove and confirmVar)
function rebirth() {
  if (parseInt(localStorage.clickCount) >= 200000000 && confirmAction()) {
    localStorage.clickCount = 0;
    updateHCount();
  } else {
    actionNo();
  }
}

// add event listner function for window
addEventListener("load", function () {
  // when the window has loaded
  // Get The H Elemnt And Run Clicked On Click
  document.getElementById("h").onclick = clicked;
  // Get The Rehirth Elemnt And Run Rebirth On Click
  document.getElementById("hehirth").onclick = rebirth;
  // Get the reset button element and run the reset function on click
  document.getElementById("reset").onclick = reset;

  // user has never played before (checks if the click count doesn't exist (undefined))
  if (localStorage.clickCount === undefined) {
    // set clickCount To 0
    localStorage.clickCount = 0;
    // alert no g
    window.alert(
      "Welcome to H Clicker. To beqin, click the H button. Do not press the forbidden letter."
    );
  } // user has played before
  else {
    //  update h count
    updateHCount();
  }
});

// listen for keystrokes
addEventListener("keydown", function (event) {
  // switch event
  switch (event.key) {
    // ban g
    case "g": {
      destroy();
      window.location.reload();
      break;
    }
  }
});
