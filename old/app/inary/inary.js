function get(id) {
  return document.getElementById(id);
}

get("to-binary").onclick = function () {
  let parseInput = get("input").value;

  parseInput = parseInput.split("");
  parseInput = parseInput.map((n) => n.charCodeAt(0));
  parseInput = parseInput.map((n) => n.toString(2)); // Number.prototype.toString() accepts a "base" argument, or what base to convert the number to.
  parseInput = parseInput.map((n) => n.split(""));

  parseInput = parseInput.map(function (n) {
    while (n.length < 8) {
      n.unshift("0");
    }
    return n;
  });

  parseInput = parseInput.map((n) =>
    n.map(function (a) {
      return ["h", "H"][parseInt(a)];
    })
  );

  parseInput = parseInput.map((n) => n.join(""));
  parseInput = parseInput.join(" ");
  get("output").value = parseInput;
};

get("to-text").onclick = function () {
	let parseInput = get("input").value;

	parseInput = parseInput.split(" ");
	parseInput = parseInput.map((n) => n.split(""));

	parseInput = parseInput.map((n) =>
		n.map(function (a) {
		return ["h", "H"].indexOf(a);
		})
	);

	parseInput = parseInput.map((n) => n.join(""));
	parseInput = parseInput.map((n) => parseInt(n, 2)); // parseInt(n, b) parses the integer (n) as if it were in base (b)
	parseInput = parseInput.map((n) => String.fromCharCode(n));
	parseInput = parseInput.join("");

	if (parseInput.includes("￿")) {
		window.alert("There was an error in the conversion!");
	} else {
		get("output").value = parseInput;
	}
};

get("copy").onclick = function () {
  /* Select the text field */
  get("output").select();
  get("output").setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
};


/* const select = get("selector");
get("input").oninput= function() {
    if(select.value = "to-q") {
        get("output").value = get("input").value.split("g").join("q").split("G").join("Q");
    }
    else if(select.value = "to-soft-h") {
        get("output").value = get("input").value.split("g").join("ĥ").split("G").join("Ĥ");
    }
    else if(select.value = "to-hard-h") {
        get("output").value = get("input").value.split("g").join("h").split("G").join("H");
    }
}

get("select").onselect = function() {
    get("input").oninput= function() {
        if(select.value = "to-q") {
            get("output").value = get("input").value.split("g").join("q").split("G").join("Q");
        }
        else if(select.value = "to-soft-h") {
            get("output").value = get("input").value.split("g").join("ĥ").split("G").join("Ĥ");
        }
        else if(select.value = "to-hard-h") {
            get("output").value = get("input").value.split("g").join("h").split("G").join("H");
        }
    }
} */