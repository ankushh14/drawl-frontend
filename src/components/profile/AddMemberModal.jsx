import Proptypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import InputComp from "../../utils/input/InputComp";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../hooks/useAuth";
import { addMembers, findMembers } from "../../api/workspace";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";

export default function AddMemberModal({
  workspaceID,
  openModal,
  workspaceMembers,
}) {
  const { darkMode } = useTheme();
  const [members, setMembers] = useState(workspaceMembers);
  const [newMembers, setNewMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [individual, setIndividual] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchDisable, setSearchDisable] = useState(false);
  const { user, token } = useAuth();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();

  const modalCloseHandle = (e) => {
    if (e.target.id === "Add-Modal-background") {
      openModal(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchResults([]);
      return handleSelection(individual);
    }
  };

  const debouncedSearch = useDebounce(individual, 500);
  const searchMembers = useCallback(async () => {
    if (debouncedSearch == "" || undefined) {
      return setSearchResults([]);
    }
    let requestBody = {
      email: debouncedSearch,
    };
    const data = await findMembers(requestBody, token);
    let dataToSet = [];
    if (user.email) {
      dataToSet = data.data.filter((elem) => elem.email !== user.email);
      dataToSet = data.data.filter((elem) => !members.includes(elem.email));
    } else {
      dataToSet = data.data;
    }
    return setSearchResults(dataToSet);
  }, [debouncedSearch, user, token, members]);

  useEffect(() => {
    searchMembers();
  }, [searchMembers]);

  const checkMembers = useCallback(() => {
    if (members?.length + newMembers.length > 6) {
      setSearchDisable(true);
      return setSearchDescription("Maximum of only 6 members can be added");
    } else {
      setSearchDescription("");
      return setSearchDisable(false);
    }
  }, [members, newMembers]);

  useEffect(() => {
    checkMembers();
  }, [checkMembers]);

  const handleSelection = (email) => {
    setIndividual("");
    setSearchDescription("");
    if (members.includes(email) || newMembers.includes(email)) {
      setSearchResults([]);
      return setSearchDescription("Member already selected");
    }
    if (!searchResults.find((item) => item.email === email)) {
      return setSearchDescription("User does not exist");
    }
    setNewMembers((prev) => [...prev, email]);
    return setSearchResults([]);
  };

  const handleDeletion = (item) => {
    const newData = newMembers.filter((elem) => elem !== item);
    return setNewMembers(newData);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(newMembers.length === 0){
        return
    }
    let requestBody = {
        members : newMembers,
        workspaceID
    }
    const response = await addMembers(requestBody,token)
    if (response.valid) {
        showToastMessage(response.message, response.info);
        setUpdateWorkspaceCount((prev) => !prev);
        return openModal(false);
      } else {
        return showToastMessage(response.message, response.info);
      }
  }

  return (
    <div
      id="Add-Modal-background"
      className="Modal-background fixed top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center"
      onClick={modalCloseHandle}
    >
      <div
        className={`w-[95%] text-xs md:w-[75%] lg:w-[45%] rounded-md shadow p-4 flex flex-col ${
          darkMode ? "bg-[#212529] text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-full mb-3">
          <h1 className="text-xl">Add members</h1>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full p-2 flex flex-col">
          <div className="search-div relative">
            <InputComp
              name={"collaborators"}
              type={"text"}
              label={"Collaborators"}
              placeholder={"Search for collaborators..."}
              required={false}
              stateVar={individual}
              setStatevar={setIndividual}
              description={searchDescription}
              descriptionControlFunc={setSearchDescription}
              onKeyDown={handleKeyDown}
              disable={searchDisable}
            />
            <div
              className={`search-results-div absolute z-[30] ${
                searchResults.length === 0 && "hidden"
              } ${
                !darkMode ? "bg-white text-black" : "bg-[#212529] text-white"
              } top-20  w-full  flex flex-col  rounded-md border border-slate-500 overflow-y-scroll max-h-[200%] no-scrollbar`}
            >
              {searchResults.map((item, index) => {
                return (
                  <div
                    className={` ${
                      darkMode ? "hover:bg-slate-500" : "hover:bg-slate-200"
                    } bg-inherit text-inherit border-slate-500 text-xs w-full border-b last:border-b-0 p-2 cursor-pointer flex items-center first:rounded-t-md last:rounded-b-md last:rounded-t-none transition-colors duration-300 `}
                    onClick={() => handleSelection(item.email)}
                    key={index}
                  >
                    <img
                      src={item.profile}
                      className="w-5 h-5 mr-4 rounded-full"
                      alt="profile"
                    />
                    {item.email}
                  </div>
                );
              })}
            </div>
            <div className="member-div w-full p-2 flex items-center flex-wrap">
              {newMembers.map((item, index) => {
                return (
                  <div
                    className={`${
                      darkMode ? "bg-white text-black" : "bg-black text-white"
                    } flex justify-center items-center rounded-md text-xs px-3 pr-1 py-1 m-2`}
                    key={index}
                  >
                    <span>{item}</span>
                    <IoClose
                      className="ml-2 cursor-pointer"
                      size={15}
                      onClick={() => handleDeletion(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`${
            darkMode ? "bg-white text-black" : "bg-black text-white"
          } border border-black rounded-md px-8 py-3 flex justify-center items-center text-xs w-full active:scale-95 transition-all duration-500`}
        >
          Submit
        </button>
        </form>
      </div>
    </div>
  );
}

AddMemberModal.propTypes = {
  workspaceID: Proptypes.string.isRequired,
  openModal: Proptypes.func.isRequired,
  workspaceMembers: Proptypes.array.isRequired,
};
