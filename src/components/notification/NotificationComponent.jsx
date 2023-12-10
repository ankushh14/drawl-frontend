import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import { useAuth } from "../../hooks/useAuth"
import { getNotifications } from "../../api/notification"
import { useCallback, useEffect, useState } from "react"
import SingleNotificationComponent from "./SingleNotificationComponent"

export default function NotificationComponent({ noti, openController, setPing }) {
    const { darkMode } = useTheme()
    const [notifications, setNotifications] = useState([])
    const [notificationRefresh, setNotificationsRefresh] = useState(false)
    const { user } = useAuth()

    const fetchnotifications = useCallback(async () => {
        let requestBody = {
            email: user.email
        }
        const response = await getNotifications(requestBody)
        return setNotifications(response.data)
    }, [user, setNotifications])

    const checkNotifications = useCallback(() => {
        if (notifications.length > 0) {
            setPing(true)
        } else {
            setPing(false)
        }
    },[notifications,setPing])

    useEffect(()=>{
        checkNotifications()
    },[checkNotifications])

    useEffect(() => {
        fetchnotifications()
        setInterval(() => {
            fetchnotifications()
        }, 30000)
    }, [fetchnotifications, notificationRefresh])

    return (
        <div id="notification-div" className={`notification-list fixed z-50 w-full md:w-[50%] lg:w-[30%] max-h-[50%] overflow-y-scroll  top-10 transition-all duration-300 border-2  ${noti ? "right-0 md:right-10" : "-right-full"} rounded-md ${darkMode ? "bg-black text-white border-white" : "bg-white border-[#d3d3d3] text-black"}`}>
            {
                notifications.length === 0 ?
                    <div className="notfound-div w-full p-3 py-6">
                        <h1 className="font-bold text-center text-sm md:text-md">Nothing to see here...</h1>
                    </div>
                    :
                    <div className="notification-div w-full flex flex-col">
                        {
                            notifications.map((item, index) => {
                                return <SingleNotificationComponent key={index} item={item} setNotificationRefresh={setNotificationsRefresh} />
                            })
                        }
                    </div>
            }
        </div>
    )
}

NotificationComponent.propTypes = {
    noti: PropTypes.bool.isRequired,
    openController: PropTypes.func.isRequired,
    setPing: PropTypes.func.isRequired
}
