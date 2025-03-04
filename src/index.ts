export default {
	async fetch(request: any, env: any, ctx: any) {
		const url = new URL(request.url);
		console.log('url', url);
		// If the request is for CSS, JS, images, or other assets, fetch from Cloudflare Pages
		if (url.pathname.startsWith("/css") || url.pathname.startsWith("/js") || url.pathname.startsWith("/images")) {
			console.log('url-parts', url);
			return fetch(`https://template-1-80f.pages.dev${url.pathname}`, request);
		}
		const pathParts = url.pathname.split("/").filter(Boolean); // Get route parts
		console.log('pathParts', pathParts);
		// Check if a specific template is requested
		const templateName = pathParts.length > 0 ? pathParts[0] : "template-1"; // Default to template-1

		// Fetch the correct template HTML from Cloudflare Pages
		const response = await fetch(`https://template-1-80f.pages.dev`);

		//this to support multiple templates
		//const response = await fetch(`https://template-1-80f.pages.dev/${templateName}/index.html`);

		if (!response.ok) {
			return new Response("Template not found", { status: 404 });
		}

		let html = await response.text();

		// Example: Modify content dynamically
		html = html.replace(/Image Carousel/g, "Hello from Cloudflare Worker!");
		html = html.replace(/Card Layout/g, "Famous places!");

		return new Response(html, {
			headers: { "Content-Type": "text/html" },
		});
	},
};
