import axios from "axios";

export const loginUser = async (rollnumber: string, password: string) => {
    try {
        const res = await axios.post("/user/login", { rollnumber, password });
        if (res.status !== 200) {
            throw new Error("Unable to login");
        }
        const data = await res.data;
        return {
            rollnumber: data.rollnumber,
            role: data.role
        };
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const checkAuthStatus = async () => {
    try {
        const res = await axios.get("/user/auth-status");
        if (res.status !== 200) {
            throw new Error("Unable to authenticate");
        }
        const data = await res.data;
        return {
            rollnumber: data.rollnumber,
            role: data.role
        };
    } catch (error) {
        console.error("Error checking auth status:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.post("/user/logout");
        if (res.status !== 200) {
            throw new Error("Unable to logout");
        }
        const data = await res.data;
        return data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};