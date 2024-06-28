import { defineMDSveXConfig, escapeSvelte } from 'mdsvex';
import remarkReadingTime from 'remark-reading-time';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { getHighlighter } from 'shiki';
import { parse } from 'node-html-parser';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('mdsvex').defineMDSveXConfig} */
const mdsvexConfig = defineMDSveXConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: false,
	layout: {
		blog: './src/lib/components/mdsvex.svelte'
	},
	remarkPlugins: [remarkReadingTime, remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: {
					class: 'autolink-header',
					ariaHidden: true,
					tabIndex: -1
				}
			}
		]
	],
	highlight: {
		highlighter
	}
});

async function highlighter(code, lang = 'text', meta) {
	const highlighter = await getHighlighter({
		theme: 'dark-plus'
	});

	let html;
	// no need to highlight when there's no meta
	if (!meta) {
		html = highlighter.codeToHtml(code, {
			lang
		});
	} else {
		const highlightMeta = /{([\d,-]+)}/.exec(meta)[1];
		const highlightLines = rangeParser(highlightMeta);
		html = highlighter.codeToHtml(code, {
			lang,
			lineOptions: highlightLines.map((element) => ({
				line: element,
				// to add highlight-line class
				classes: ['highlight-line']
			}))
		});
	}

	const escapeHtml = escapeSvelte(addStyles(html));
	return `{@html \`${escapeHtml}\` }`;
}

function addStyles(html) {
	const htmlDoc = parse(html);
	htmlDoc.querySelectorAll('pre').forEach((pre) => {
		pre.classList.add('custom-pre');
		// pre.insertAdjacentHTML(
		// 	'beforeend',
		// 	// create a copy button, that copies the code in the pre tag
		// 	parse(`<p class="p-0 m-0 code-lang">${lang}</p>`)
		// );
	});
	return htmlDoc.toString();
}

function rangeParser(rangeString) {
	/** @type number[] */
	const result = [];
	const ranges = rangeString.split(',');
	ranges.forEach((element) => {
		if (element.indexOf('-') === -1) {
			result.push(parseInt(element, 10));
		} else {
			const limits = element.split('-');
			const start = parseInt(limits[0], 10);
			const end = parseInt(limits[1], 10);
			for (let i = start; i <= end; i += 1) {
				result.push(i);
			}
		}
	});
	return result;
}

export default mdsvexConfig;
