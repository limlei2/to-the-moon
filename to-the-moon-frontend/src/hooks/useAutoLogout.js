import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

import { toast } from "react-toastify";

const useAutoLogout = () => {
const dispatch = useDispatch();
const user = useSelector(state => state.user.user);

useEffect(() => {
    if (!user || !user.expiresAt) return;
    const now = Date.now();
    const timeLeft = user.expiresAt - now;

    if (timeLeft <= 0) {
        toast.error("Your Login Token Has Expired, Please Login Again");
        dispatch(logout());
    } else {
        const timer = setTimeout(() => {
            toast.error("Your Login Token Has Expired, Please Login Again");
            dispatch(logout());
        }, timeLeft);

    return () => clearTimeout(timer);
    }
}, [user, dispatch]);
};

export default useAutoLogout;