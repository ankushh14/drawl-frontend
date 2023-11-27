import toast from "react-hot-toast";

const showToastMessage = (toastMessage,info)=>{
    if(info === "success"){
        toast.success(toastMessage, {
        });
        }
        else if(info === "warning"){
            toast.warning(toastMessage, {
            });
        }
        else if(info === "error"){
            toast.error(toastMessage, {
            });
        }
        else{
            toast.info(toastMessage,{
            })
        }
}

export {showToastMessage}