import type { PageServerLoad } from './$types';

// import {
// 	SPOTIFY_CLIENT_ID,
// 	SPOTIFY_CLIENT_SECRET,
// 	SPOTIFY_REDIRECT_URL,
// 	SPOTIFY_REFRESH_TOKEN,
// 	SPOTIFY_SCOPES
// } from '$env/static/private';
// import axios from 'axios';

export const load: PageServerLoad = async () => {
	// credit, where it's due: https://github.com/Xetera/xetera.dev/blob/75dfdf10b3fd361b3fe058cf014f6913dcd87919/fetcher.ts#L14-L36
	// this dude is right, spotify forcing us to use oauth for something that's doable with client credentials.

	// const authorization = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
	// 	'base64'
	// );
	// const params = new URLSearchParams({
	// 	grant_type: 'refresh_token',
	// 	redirect_uri: SPOTIFY_REDIRECT_URL,
	// 	scope: SPOTIFY_SCOPES,
	// 	refresh_token: SPOTIFY_REFRESH_TOKEN
	// });

	try {
		// const resp = await axios.post('https://accounts.spotify.com/api/token', params, {
		// 	headers: {
		// 		'content-type': 'application/x-www-form-urlencoded',
		// 		authorization: `Basic ${authorization}`
		// 	}
		// });
		// const accesstoken: string = resp.data.access_token;
		// const likedSongsResp = await axios.get('https://api.spotify.com/v1/me/tracks', {
		// 	headers: { authorization: `Bearer ${accesstoken}` }
		// });
		// const topTracks = await axios.get(
		// 	'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
		// 	{
		// 		headers: { authorization: `Bearer ${accesstoken}` }
		// 	}
		// );
		// const currentPlaybackState = await axios.get('https://api.spotify.com/v1/me/player', {
		// 	headers: { authorization: `Bearer ${accesstoken}` }
		// });
		// const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
		// 	headers: { authorization: `Bearer ${accesstoken}` }
		// });
		// const recentTracks = await axios.get(
		// 	'https://api.spotify.com/v1/me/player/recently-played?limit=1',
		// 	{
		// 		headers: { authorization: `Bearer ${accesstoken}` }
		// 	}
		// );

		return {};
	} catch (err) {
		console.error('spotify::error:', err);
	}
};
