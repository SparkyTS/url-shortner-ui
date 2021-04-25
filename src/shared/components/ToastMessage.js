import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export const toastErrorMessage = (err) => {
    toast.warn(err || "something went wrong", {
        style: {
            background: '#fa595f'
        },
        autoClose: 3000
    });
};

export const toastInfoMessage = (info) => {
    toast.info(info, {
        style: {
            background: '#5995fd'
        },
        autoClose: 3000
    });
};

