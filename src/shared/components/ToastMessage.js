import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export const toastErrorMessage = (err) => {
    toast.warn(err || "something went wrong", {
        style: {
            background: '#fa595f'
        }
    });
};

export const toastInfoMessage = (info) => {
    toast.info(info, {
        style: {
            background: '#5995fd'
        }
    });
};

