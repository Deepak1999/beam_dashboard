
import { toast } from 'react-toastify'
import { common_axios } from '../App';

export const generateApi = async (formdata) => {
    try {
        const res = await common_axios.post(
            "/auth/v1/otp/generate", formdata
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
};



export const forgetPassword = async (formdata) => {
    try {
        const res = await common_axios.get(
            `/auth/v1/forgot/password/${formdata.email}`,
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
};



export const ChangePassword = async (formdata) => {
    try {
        const res = await common_axios.get(
            `/auth/v1/forget/password/${formdata.email}`,
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
};


export const logout = async (formdata) => {
    try {
        const res = await common_axios.get(
            `/auth/v1/logout`,
        );
        return res;
    } catch (error) {
        toast.error("Something wrong")

    }
};