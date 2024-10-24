<script>
	import { onMount } from "svelte";
  
	let apiResponse = "Loading...";
  
	onMount(async function() {
	try {
		const response = await fetch("https://backend.starculator.space/api/ships", {
		headers: {
			"Authorization": "Bearer rDC8JzlhlqzUoJTWKl3kToRlYgaDACt3BXoQ8oOmAWmP0JOlzFX89d1kwZNm"
		}
		});

		if (response.ok) {
		const data = await response.json();
		apiResponse = JSON.stringify(data, null, 2);
		} else {
		apiResponse = `Error: ${response.status} ${response.statusText}`;
		}
	} catch (error) {
		apiResponse = `Error: ${error.message}`;
	}
	});




  </script>
  
  <main>
	<h1>Star Citizen API Test</h1>
	<pre>{apiResponse}</pre>
  </main>
  
  <style>
	main {
	  font-family: Arial, sans-serif;
	  padding: 20px;
	}
  
	pre {
	  background: #f4f4f4;
	  padding: 10px;
	  border-radius: 5px;
	}
  </style>
  