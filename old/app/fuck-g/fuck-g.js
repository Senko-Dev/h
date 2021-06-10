function get(id) {
	return document.getElementById(id);
}

get("to-q").onclick = function() {
	get("output").value = get("input").value.split("g").join("q").split("G").join("Q");
}

get("to-soft-h").onclick = function() {
	get("output").value = get("input").value.split("g").join("ĥ").split("G").join("Ĥ");
}


get("to-hard-h").onclick = function() {
	get("output").value = get("input").value.split("g").join("h").split("G").join("H");
}


get("copy").onclick = function () {
	/* Select the text field */
	get("output").select();
	get("output").setSelectionRange(0, 99999); /*For mobile devices*/
  
	/* Copy the text inside the text field */
	document.execCommand("copy");
}
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