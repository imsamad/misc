import { formatDistance } from 'date-fns';

/**
 * @description This function is used to insert html tags for bold and anchor tags
 * @param line Line of text
 */
export const insertHtml = (line: string) => {
	const boldRegex = /\*(.*?)\*/g;
	const anchorRegex = /\[(.*?)\]\((.*?)\)/g;
	const html = line
		.replace(boldRegex, '<span class="text-white">$1</span>')
		.replace(
			anchorRegex,
			'<a class="relative custom-underline-effect" href="$2" target="_blank"><span class="text-white">$1</span></a>'
		);
	return html;
};

export const scrollIntoView = (targetId: string) => {
	const targetElement = document.getElementById(targetId);
	if (targetElement) {
		targetElement.scrollIntoView({
			behavior: 'smooth'
		});
	}
};

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}

export const customFormatDistance = (date: Date) => {
	return formatDistance(date, new Date(), {
		addSuffix: true
	});
};

// export function timeSince(date: Date) {
// 	const seconds = Math.floor((new Date() - date) / 1000);

// 	let interval = Math.floor(seconds / 31536000);
// 	if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;

// 	interval = Math.floor(seconds / 2592000);
// 	if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;

// 	interval = Math.floor(seconds / 86400);
// 	if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;

// 	interval = Math.floor(seconds / 3600);
// 	if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;

// 	interval = Math.floor(seconds / 60);
// 	if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;

// 	return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
// }
