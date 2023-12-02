import { FaArrowRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="main-div w-full h-screen flex flex-col justify-center items-center p-6">
      <div className="main-heading w-full flex justify-center items-center py-3">
      <h1 className="text-4xl md:text-7xl font-bold text-center">
        Nexus Meet hub
      </h1>
      </div>
      <div className="secondary-heading w-full flex justify-center items-center py-3 mb-8">
      <h1 className="text-2xl md:text-5xl font-semibold text-center">
        A Collaborative Networking Experience
      </h1>
      </div>
      <div className="side-heading w-full flex justify-center items-center py-3 md:px-16">
      <p className="text-center text-xs md:text-base">
        Welcome to NexusMeethub, the innovative web application designed to redefine your online interactions. NexusMeethub combines seamless chatting capabilities with a unique and creative twist - introducing the Blankboard feature for collaborative drawing and scribbling. Whether you are planning a project, discussing ideas, or just looking to have fun with friends, NexusMeethub is the ultimate destination for interactive and dynamic conversations.
      </p>
      </div>
      <div className="btn-dashboard">
        <button type="button" className="bg-black text-white rounded-md px-8 py-3 flex justify-center items-center hover:text-[#FBFFFF] active:scale-95 transition-all duration-500" onClick={()=>navigate("/home")}>Dashboard<FaArrowRight className="ml-1"/></button>
      </div>
    </div>
  )
}

