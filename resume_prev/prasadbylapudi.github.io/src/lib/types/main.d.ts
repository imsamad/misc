export type Experience = {
	companyName: string;
	roles: { role: string; period: string }[];
	description: string[];
};

export type Project = {
	name: string;
	description: string;
	links: { name: string; link: string }[];
};

export type Education = {
	universityName: string;
	qualification: string;
	stream: string;
	period: string;
	description: string[];
};

export type Categories = 'sveltekit' | 'svelte' | string;

export type Post = {
	title: string;
	slug: string;
	image: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
