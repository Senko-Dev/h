function get(id) {
  return document.getElementById(id);
}

get("to-binary").onclick = function () {
  let parseInput = get("input").value;
  parseInput = hBinary(parseInput);
  get("output").value = parseInput;
};

get("to-text").onclick = function () {
	let parseInput = get("input").value;

	parseInput = text(parseInput);

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


function convertNum(num) {
	let bits = [];
	let product = 1;
	while(product <= num) {
		product *= 2;
	}
	product /= 2;
	let a = num;
	while(product >= 1) {
		if(a >= product) {
			bits.push(1);
			a -= product;
		} else {
			bits.push(0);
		}
		product /= 2;
	}
	if(num < 128) {
		while(bits.length < 8) {
			bits.unshift(0);
		}
		return bits;
	} else if(num < 2048) {
		while(bits.length < 11) {
			bits.unshift(0);
		}
		return [].concat(
			[1,1,0],
			bits.slice(0,5),
			[1,0],
			bits.slice(5,11)
		);
	} else if(num < 65536) {
		while(bits.length < 16) {
			bits.unshift(0);
		}
		return [].concat(
			[1,1,1,0],
			bits.slice(0,4),
			[1,0],
			bits.slice(4,10),
			[1,0],
			bits.slice(10,16)
		);
	} else if(num < 2097152) {
		while(bits.length < 21) {
			bits.unshift(0);
		}
		return [].concat(
			[1,1,1,1,0],
			bits.slice(0,3),
			[1,0],
			bits.slice(3,9),
			[1,0],
			bits.slice(9,15),
			[1,0],
			bits.slice(15,21)
		);
	}
}
function count(a) {
	return 8 * a[0] + 4 * a[1] + 2 * a[2] + 1 * a[3];
}
function convertChar(num) {
	let bits = convertNum(num);
	let hex = ["h","H","𝕙","ℍ","𝖍","ℌ","ん","ɥ","𝛨","𝒽","み","サ","भ","৸","ɦ","н"];
	let newBits = [];
	for(let i = 0; i < bits.length; i++) {
		if(i % 4 === 0) {
			newBits.push([bits[i]]);
		} else {
			newBits[newBits.length - 1].push(bits[i]);
		}
	}
	let chars = [];
	newBits.map(
		function(n) {
			chars.push(hex[count(n)]);
		}
	);
	return chars;
}

function hBinary(text) {
	let chars = [];
	for(let i = 0; i < text.length; i++) {
		chars.push(text[i]);
	}
	for(let i = 0; i < chars.length; i++) {
		chars[i] = chars[i].codePointAt(0);
	}
	for(let i = 0; i < chars.length; i++) {
		chars[i] = convertChar(chars[i]);
	}
	return chars.map(n=>n.join("")).join("");
}

function decToBin(num) {
	let bits = [];
	let product = 1;
	while(product <= num) {
		product *= 2;
	}
	product /= 2;
	let a = num;
	while(product >= 1) {
		if(a >= product) {
			bits.push(1);
			a -= product;
		} else {
			bits.push(0);
		}
		product /= 2;
	}
	if(num === 0) {
		bits = [0];
	}
	while(bits.length < 4) {
		bits.unshift(0);
	}
	return bits;
}
function binToDec(bits) {
	let product = 2 ** (bits.length - 1);
	let sum = 0;
	while(bits.length !== 0) {
		sum += bits[0] * product;
		product /= 2;
		bits.shift(1);
	}
	return sum;
}
function text(binary) {
	let hex = ["h","H","𝕙","ℍ","𝖍","ℌ","ん","ɥ","𝛨","𝒽","み","サ","भ","৸","ɦ","н"];
	let digits = [];
	let bits = [];
	for(let i = 0; i < binary.length; i++) {
		if(hex.includes(binary[i])) {
			digits.push(hex.indexOf(binary[i]));
		} else {
			digits.push(hex.indexOf(binary[i] + binary[i + 1]));
			i++;
		}
	}
	for(let i = 0; i < digits.length; i++) {
		bits = bits.concat(decToBin(digits[i]));
	}
	let bytes = [];
	for(let i = 0; i < bits.length; i++) {
		if(i % 8 === 0) {
			bytes.push([bits[i]]);
		} else {
			bytes[bytes.length - 1].push(bits[i]);
		}
	}
	let codes = [];
	for(let i = 0; i < bytes.length; i++) {
		if(bytes[i][0] === 0) {
			codes.push(binToDec(bytes[i].slice(1,8)));
		} else if(bytes[i][1] === 0) {
			codes[codes.length - 1] *= 64;
			codes[codes.length - 1] += binToDec(bytes[i].slice(2,8));
		} else if(bytes[i][2] === 0) {
			codes.push(binToDec(bytes[i].slice(3,8)));
		} else if(bytes[i][3] === 0) {
			codes.push(binToDec(bytes[i].slice(4,8)));
		} else if(bytes[i][4] === 0) {
			codes.push(binToDec(bytes[i].slice(5,8)));
		}
	}
	for(let i = 0; i < codes.length; i++) {
		codes[i] = String.fromCodePoint(codes[i]);
	}
	return codes.join("");
}
function h() {
	if(document.getElementsByTagName("INPUT")[0].checked) {
		get("result").innerText = text(document.getElementById("input").value)
	} else {
		get("result").innerText = hBinary(document.getElementById("input").value)
	}
}