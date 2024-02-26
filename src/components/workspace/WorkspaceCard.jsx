import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MdGroup, MdOutlineDoubleArrow } from "react-icons/md";
import { getProfiles } from "../../api/workspace";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { useClickAway } from "@uidotdev/usehooks";

export default function WorkspaceCard({ workspace }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { darkMode } = useTheme();
  const [profiles, setProfiles] = useState([]);
  const [submenu, setSubmenu] = useState(false);
  const [members, setMembers] = useState(false);
  const [actualMembers] = useState([
    ...workspace.members,
    workspace.owner + " (owner)",
  ]);
  const [about, setAbout] = useState(false);
  const workspaceRoute = import.meta.env.VITE_WORKSPACES;

  const dotsDivRef = useClickAway(()=>{
    setSubmenu(false)
  })

  const handleNavigate = () => {
    navigate(`/${workspaceRoute}/${workspace.ID}`);
  };
  const getProfileData = useCallback(async () => {
    let requestBody = {
      workspaceID: workspace.ID,
    };
    const data = await getProfiles(requestBody, token);
    if (data.valid) {
      return setProfiles(data.data);
    } else {
      return;
    }
  }, [workspace, token]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div
      className={`card w-[300px] relative h-[330px]  m-4  rounded flex flex-col justify-between shadow shadow-inherit cursor-pointer  overflow-y-auto no-scrollbar transition-all duration-500 ease-in-out [perspective:1000px] [transform-Style:preserve-3d] 
      ${members || about ? "[transform:rotateY(180deg)]" : ""}
      ${
        darkMode
          ? "bg-[#393f45] text-white shadow-slate-800"
          : "bg-white text-black shadow-slate-500"
      }
      `}
    >
      <div
        className={`card-main w-full flex-col flex space-y-4 p-2 px-4 top-0 left-0 
        transition-[visibility,position,opacity] duration-500
        ${
          members || about
            ? "opacity-0 invisible static"
            : "visible opacity-100 absolute"
        }`}
      >
        <div className="card-header w-full py-1 flex justify-between items-center">
          <h1 className="w-full font-bold">{workspace.name}</h1>
          <div
            className="dots-div flex flex-col relative px-2"
            onClick={() => setSubmenu((prev) => !prev)}
            ref={dotsDivRef}
          >
            <span className={`w-[0.15rem] h-[0.15rem] ${darkMode?"bg-white":"bg-black"} m-[0.08rem] rounded-full`}></span>
            <span className={`w-[0.15rem] h-[0.15rem] ${darkMode?"bg-white":"bg-black"} m-[0.08rem] rounded-full`}></span>
            <span className={`w-[0.15rem] h-[0.15rem] ${darkMode?"bg-white":"bg-black"} m-[0.08rem] rounded-full`}></span>
            <div
              className={`absolute w-[100px] flex flex-col cursor-pointer shadow-sm shadow-slate-500 rounded-md p-2 text-xs top-5 right-2 text-inherit transition-all duration-300 
              ${
                submenu ? "visible opacity-100" : "invisible opacity-0"
              }
              ${
                darkMode?"bg-slate-400":"bg-white"
              }`}
            >
              <div
                className="w-full border-b border-slate-500 text-center p-1"
                onClick={() => setAbout(true)}
              >
                About
              </div>
              <div
                className="w-full text-center p-1"
                onClick={() => setMembers(true)}
              >
                Members
              </div>
            </div>
          </div>
        </div>
        <div
          className="card-body w-full flex flex-col"
          onClick={handleNavigate}
        >
          <div className="grp-img-div w-full flex justify-center items-center">
            <div className="outer-img w-[50%]">
              <img
                src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
                className="w-full"
                alt="icon"
              />
            </div>
          </div>
          <div className="members-pic-div w-full flex justify-center items-center flex-col">
            <div className="members-pics w-full flex justify-center items-center py-1">
              {profiles &&
                profiles.length > 0 &&
                profiles.slice(0, 3).map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt="member"
                      key={index}
                      className="w-[30px] m-1 rounded-full"
                    />
                  );
                })}
              {profiles.length > 3 && <span className="ml-1 text-xs">...</span>}
            </div>
            <h1 className="text-xs text-inherit flex justify-center items-center">
              <MdGroup size={17} className="mr-1" />
              {workspace.members.length + 1 === 1
                ? `${workspace.members.length + 1} Member`
                : `${workspace.members.length + 1} Members`}
            </h1>
          </div>
          <div className="enter-workspace-div w-full py-2">
            <h1 className="text-xs text-inherit w-full flex justify-center items-center">
              Enter workspace{" "}
              <MdOutlineDoubleArrow size={17} className="ml-1" />
            </h1>
          </div>
        </div>
        <div
          className={`card-footer w-full ${
            members || about ? "hidden" : "visible"
          }`}
        >
          <h1 className="w-full text-xs font-semibold text-end">
            - created by {workspace.owner}
          </h1>
        </div>
      </div>
      <div
        className={`about-div w-full flex-col top-0 left-0 p-3 flex [transform:rotateY(180deg)] transition-[visibility,position,opacity] duration-500 
        ${
          (about || members) ? "visible opacity-100 absolute" : "invisible opacity-0 static"
        }`}
      >
        <div className="back-btn w-full flex justify-start mb-4">
          <FaArrowLeft size={18} onClick={() => 
            {
              setAbout(false)
              setMembers(false)
            }} />
        </div>
        <div className="content-about w-full text-xs text-center flex flex-col">
          {
            about? workspace.description
            :members? actualMembers?.map((item, index) => {
              return (
                <span className="w-full text-center p-2" key={index}>
                  {item}
                </span>
              );
            })
            :""
          }
        </div>
      </div>
    </div>
  );
}

WorkspaceCard.propTypes = {
  workspace: PropTypes.object.isRequired,
};
