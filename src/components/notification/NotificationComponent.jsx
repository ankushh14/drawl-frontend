import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import { useAuth } from "../../hooks/useAuth"
import { getNotifications } from "../../api/notification"
import { useCallback, useEffect, useState } from "react"
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

export default function NotificationComponent({ noti, openController }) {
    const { darkMode } = useTheme()
    const [notifications, setNotifications] = useState([])
    const { user } = useAuth()
    const fetchnotifications = useCallback(async () => {
        let requestBody = {
            email: user.email
        }
        const response = await getNotifications(requestBody)
        return setNotifications(response.data)
    }, [user])

    console.log(notifications)

    useEffect(() => {
        fetchnotifications()
    }, [fetchnotifications])

    return (
        <div id="notification-div" className={`fixed z-50 w-full md:w-[50%] lg:w-[30%] max-h-[50%] overflow-y-scroll  top-10 transition-all duration-300 border-2  ${noti ? "right-0 md:right-10" : "-right-[100%]"} rounded-md ${darkMode ? "bg-black text-white border-white" : "bg-white border-[#d3d3d3] text-black"}`}>
            {
                notifications.length === 0 ?
                    <div className="notfound-div w-full p-3 py-6">
                        <h1 className="font-bold text-center text-sm md:text-md">Nothing to see here...</h1>
                    </div>
                    :
                    <div className="notification-div w-full flex flex-col">
                        {
                            notifications.map((item, index) => {
                                return <div className="indi-notification w-full h-[110px] border-b border-inherit last:border-none" key={index}>
                                    <p className="text-xs font-semibold p-2 w-full">
                                        {item.message}
                                    </p>
                                    {
                                        (item.type === "INVITE" || "REQUEST") && <div className="buttons-div flex text-xs items-center p-2 space-x-3">
                                            <button type="button" className={` rounded-md px-4 py-2 flex justify-center items-center  active:scale-95 transition-all duration-500 bg-[#FF7F50] text-white font-semibold`}><IoCheckmarkSharp size={16} className="mr-[0.15rem]"/> Accept</button>
                                            <button type="button" className={` rounded-md px-4 py-2 flex justify-center items-center  active:scale-95 transition-all duration-500 bg-red-500 text-white font-semibold`}><IoCloseSharp size={16} className="mr-[0.15rem]"/> Reject</button>

                                        </div>
                                    }
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}

NotificationComponent.propTypes = {
    noti: PropTypes.bool.isRequired,
    openController: PropTypes.func.isRequired
}
