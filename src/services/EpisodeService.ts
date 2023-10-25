import api from "./api";

interface WatchTimeParams {
    episodeId: number;
    seconds: number;
}

export default class EpisodeService {
    static async getWatchTime(episodeId: number) {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.get(`/episodes/${episodeId}/watchTime`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => err.response);

        return res;
    }

    static async setWatchTime({ episodeId, seconds }: WatchTimeParams) {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.post(`/episodes/${episodeId}/watchTime`,
            { seconds },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).catch((err) => err.response);

        return res;
    }
}