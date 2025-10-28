import { toast } from "react-toastify"

export const showToast = (type, message) => {
    const config = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    if (type === 'success') {
        toast.success(message, config)
    } else if (type === 'error') {
        toast.error(message, config)
    } else if (type === 'info') {
        toast.info(message, config)
    } else {
        toast(message, config)
    }
}