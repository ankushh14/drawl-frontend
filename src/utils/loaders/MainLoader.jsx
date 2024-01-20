import earth from "../../assets/earth.svg"
import { useAuth } from "../../hooks/useAuth"
import STATUS from "../status"

export default function MainLoader() {
  const {status} = useAuth()
  return (
     status === STATUS.PENDING 
     && 
    <div className="back-div absolute top-0 left-0 right-0 bottom-0 z-40 bg-white flex justify-center items-center">
      <div className="load-div flex justify-center space-x-1 items-center">
        <h1 className="text-[20px] font-senibold text-black xl:text-[40px]">NexusMeetHub</h1>
        <div className="svg-div w-[45px] h-[40px] animate-pulse delay-75 xl:w-[55px] xl:h-[50px]">
          <img src={earth} alt="earth" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

