import api from "./api";

interface UserParams {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    created_at: string
}

interface PasswordParams {
    currentPassword: string,
    newPassword: string
}

export const profileService = {
    fetchCurrentUser: async () => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.get('/users/current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => err.response);

        return res.data;
    },

    updateUser: async (params: UserParams) => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.put('/users/current', params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => {
            if (err.response.status === 400 || err.response.status === 401) {
                return err.response;
            }
            return err;
        });

        return res.status;
    },

    updatePassword: async (params: PasswordParams) => {
        const token = sessionStorage.getItem('onebitflix-token');
        const res = await api.put('/users/current/password', params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => {
            if (err.response.status === 400 || err.response.status === 401) {
                return err.response;
            }
            return err;
        });

        return res.status;
    }

}