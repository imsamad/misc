import type { Experience } from '$lib/types/main';

export default [
	{
		companyName: 'Samaaro',
		roles: [
			{
				role: 'Software Development Engineer',
				period: 'Sep 2022 - Jul 2023'
			},
			
		],
		description: [
			'Worked on a robust website builder for the platform, optimizing the website creation process and enhancinguser experience.',
			'Automated all platform features, significantly improving efficiency and reducing manual effort.',
			'Integrated intro.js for user guidance and implemented QR code check-ins, enhancing the platform’s capabilities and streamlining user interactions.',
			'Implemented core components including push notifications and feedback functionality, achieving a 40% cost reduction in AWS servers through strategic resource allocation and efficient utilization.',
			'Demonstrated expertise in JavaScript, TypeScript, Reactl, Node, Express and AWS for efficient and scalable development.'

		]
	},
	{
		companyName: 'Candid Reviews',
		roles: [
			{
				role: 'Software Engineer Intern',
				period: 'Jan 2022 - Apr 2022'
			}
		],
		description: [
			'Designed and developed core components like authentication, onboard, and dashboard.',
			'Rewrote the client application using ChakraUI and achieved a fully responsive website.',
			'Implemented Intro.js for the platform for the user to navigate.',
			'Expertly utilized React, Node, Express, MongoDB, and Firebase to reach project milestones.'
		]
	},
	{
		companyName: 'IIIT Hyderabad - LTRC Lab',
		roles: [
			{
				role: 'NLP Intern',
				period: 'May 2021 - Oct 2021'
			}
		],
		description: [
			'Worked on human-annotated abstractive summarization dataset creation for the Telugu language.',
			'Implemented a machine learning model that translates the English language to the Telugu language.',
			'Learnt about advanced concepts in NLP, data cleaning, and scraping.',
		]
	}
] as Experience[];
