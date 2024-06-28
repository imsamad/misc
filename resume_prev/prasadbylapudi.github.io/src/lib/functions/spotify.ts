import axios from 'axios';

export async function getRecentTracks(accessToken: string, limit = 1) {
	try {
		const recentTracks = await axios.get(
			`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
			{
				headers: { authorization: `Bearer ${accessToken}` }
			}
		);

		return recentTracks.data;
	} catch (err) {
		console.log('error::', err);
	}
}

export async function getCurrentPlaying(accessToken: string) {
	try {
		const currentTrack = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: { authorization: `Bearer ${accessToken}` }
		});

		return currentTrack.data;
	} catch (err) {
		console.log('error::', err);
	}
}
