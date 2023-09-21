import api from "./api";

export type EpisodeType = {
    id: number,
    name: string,
    synopsis: string,
    order: number,
    videoUrl: string,
    secondsLong: number
};

export type CourseType = {
    id: number,
    name: string,
    thumbnailUrl: string,
    synopsis: string,
    episodes?: EpisodeType[]
};

export const courseService = {
    getNewestCourses: async () => {
        const res = await api.get('/courses/newest')
            .catch((err) => err.response);

        return res;
    },

    getFeaturedCourses: async () => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.get('/courses/featured', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => err.response);

        return res;
    },

    addFavorite: async (courseId: number | string) => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.post(`/favorites`, {
            courseId,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => err.response);

        return res;
    },

    removeFavorites: async (courseId: number | string) => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.delete(`/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { courseId }
        }).catch((err) => err.response);

        return res;
    },

    getFavoriteCourses: async () => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.get(`/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).catch((err) => err.response);

        return res;
    }
}