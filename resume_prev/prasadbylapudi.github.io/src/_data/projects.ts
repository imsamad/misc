import type { Project } from '$lib/types/main';

export default [
	{
		name: 'Sketch Book',
		description:
			"Sketchboo is an online collaborative drawing tool powered by the Canvas web API and sockets, allowing multiple users to create art together on a shared canvas.",
		links: [{ name: 'github', link: 'https://github.com/prasadbylapudi/sketch-book' }]
	},
	{
		
		name: 'Notifier',
		description:
			'A Python tool that monitor linux system services and notify developers when a server gets down through a text message. It also has a dashboard that displays live status of the services and system information. Built with Python, Django, and Twilio API.',
		links: [{ name: 'github', link: 'https://github.com/prasadbylapudi/notifier' }]
	},
	{
		name: 'Pocket OCR',
		description:
			'Developed a web-based OCR application that extracts text from images, while also generating searchable and copyable PDFs.',
		links: [{ name: 'github', link: 'https://github.com/prasadbylapudi/pocket-OCR' }]
	},
	

] as Project[];
