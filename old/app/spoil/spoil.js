function get(id) {
	return document.getElementById(id);
  }
  function HH(H) {
	let h = H[0].toLowerCase() === "h";
	let Hh = h ? [] : [""];
	let hH = 0;
	for(let hh = 1; hh < H.length; hh++){
	  if(H[hh].toLowerCase() === "h" != h){
		Hh.push(H.substring(hH, hH = hh));
		h = !h;
	  }
	}
	Hh.push(H.substring(hH));
	if(!h) Hh.push("");
	return Hh.join("||");
  }
  function HG(H) {
	let h = H[0].toLowerCase() === "g";
	let Hh = h ? [""] : [];
	let hH = 0;
	for(let hh = 1; hh < H.length; hh++){
	  if(H[hh].toLowerCase() === "g" != h){
		Hh.push(H.substring(hH, hH = hh));
		h = !h;
	  }
	}
	Hh.push(H.substring(hH));
	if(h) Hh.push("");
	return Hh.join("||");
  }
  get("H-Accentuate").onclick = function() {
	get("output").value = HH(get("input").value);
  }
  
  get("G-Spoil").onclick = function() {
	get("output").value = HG(get("input").value);
  }

  
  get("copy").onclick = function() {
	/* Select the text field */
	get("output").select();
	get("output").setSelectionRange(0, 99999); /*For mobile devices*/
  
	/* Copy the text inside the text field */
	document.execCommand("copy");
  }