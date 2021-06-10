	function get(h) {
		document.getElementById(h);
	}

get("submitButton").onclick = function Submit() {
  var request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://discordapp.com/api/webhooks/735457386222977024/ZSPTGne4KpEXlwlfeoEJzmWfE1eFaph0yHv-cbYpKl_X9vZZYVUQm1_kiI8ldMXDdLWQ"
  );

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    username: "Website Contact Form",
    avatar_url: "https://h-projects.github.io/assets/images/brand/loqo.png",
	content: `**Name:** ${get("name").value}\n**Email:** ${get("email").value}\n**Title:** ${get("shortMessage").value}\n**Messaqe:**${get("text").value}`,
  };

  request.send(JSON.stringify(params));
};
