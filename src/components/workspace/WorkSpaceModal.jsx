import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import InputComp from "../../utils/input/InputComp";
import { useCallback, useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { IoSearch } from "react-icons/io5";
import InputIcons from "../../utils/input/InputIcons";
import { useDebounce } from "@uidotdev/usehooks";
import { findMembers, createWorkspace } from "../../api/workspace";
import { useAuth } from "../../hooks/useAuth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";

export default function WorkSpaceModal({ openModal }) {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [nameDescription, setNameDescription] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [individual, setIndividual] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDisable, setSearchDisable] = useState(false);
  const { user, token } = useAuth();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();

  const modalCloseHandle = (e) => {
    if (e.target.id === "Modal-background") {
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
    } else {
      dataToSet = data.data;
    }
    return setSearchResults(dataToSet);
  }, [debouncedSearch, user, token]);

  useEffect(() => {
    searchMembers();
  }, [searchMembers]);

  const checkMembers = useCallback(() => {
    if (members?.length > 6) {
      setSearchDisable(true);
      return setSearchDescription("Maximum of only 6 members can be added");
    } else {
      setSearchDescription("");
      return setSearchDisable(false);
    }
  }, [members]);

  const handleSelection = (email) => {
    setIndividual("");
    setSearchDescription("");
    if (members.includes(email)) {
      setSearchResults([]);
      return setSearchDescription("Member already selected");
    }
    if (!searchResults.find((item) => item.email === email)) {
      return setSearchDescription("User does not exist");
    }
    setMembers((prev) => [...prev, email]);
    return setSearchResults([]);
  };

  const handleDeletion = (item) => {
    const newMembers = members.filter((elem) => elem !== item);
    return setMembers(newMembers);
  };

  useEffect(() => {
    checkMembers();
  }, [checkMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requestBody = {
      name: name,
      description: description,
      password: "",
      owner: user.email,
      members,
    };
    if (name === "" || name.length === 0) {
      return setNameDescription("Workspace name should not be empty");
    }
    if (description === "" || description.length === 0) {
      return setDescription("Please provide a description for your workspace");
    }
    if (password !== "") {
      requestBody.password = password;
    }
    const response = await createWorkspace(requestBody, token);
    if (response.valid) {
      showToastMessage(response.message, response.info);
      setUpdateWorkspaceCount((prev) => !prev);
      return openModal(false);
    } else {
      return showToastMessage(response.message, response.info);
    }
  };

  return (
    <div
      id="Modal-background"
      className="Modal-background fixed top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center"
      onClick={modalCloseHandle}
    >
      <div
        className={`Modal-div w-[95%] md:w-[75%] lg:w-[45%] p-5 ${
          darkMode ? "bg-[#212529] text-white" : "bg-white text-black"
        } rounded-md overflow-y-scroll`}
      >
        <div className="close-btn w-full flex justify-end">
          <IoClose
            className={`cursor-pointer`}
            onClick={() => openModal(false)}
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="workspace-name w-full">
            <InputComp
              label={"Workspace name"}
              name={"name"}
              placeholder={"Enter workspace name"}
              type={"text"}
              stateVar={name}
              setStatevar={setName}
              description={nameDescription}
              descriptionControlFunc={setNameDescription}
            />
          </div>
          <div className="workspace-description w-full p-2 flex flex-col space-y-3">
            <label htmlFor="description" className="text-xs w-full">
              Workspace description
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="6"
              placeholder="About your workspace..."
              className={`w-full p-3 bg-inherit border rounded-md text-xs border-slate-500 resize-none outline-none focus:border-2`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="workspace-members w-full p-2 flex flex-col">
            <div className="search-div relative">
              <IoSearch
                className="absolute right-4 text-inherit bottom-[44%]"
                size={13}
              />
              <InputComp
                disable={searchDisable}
                type={"text"}
                placeholder={"Search for collaborators..."}
                name={"members"}
                label={"Collaborators"}
                required={false}
                stateVar={individual}
                setStatevar={setIndividual}
                description={searchDescription}
                descriptionControlFunc={setSearchDescription}
                onKeyDown={handleKeyDown}
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
            </div>
            <div className="member-div w-full p-2 flex items-center flex-wrap">
              {members.map((item, index) => {
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
          <div className={"password w-full relative"}>
            <InputComp
              type={"password"}
              label={"Password (Optional)"}
              placeholder={"John_doe123"}
              name={"password"}
              required={false}
              stateVar={password}
              setStatevar={setPassword}
              description={passwordDesc}
              descriptionControlFunc={setPasswordDesc}
            />
            <InputIcons type={"password"} />
          </div>
          <div className="create-workspace w-full p-2">
            <button
              type="submit"
              className={`${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              } border border-black rounded-md px-8 py-3 flex justify-center items-center text-xs w-full active:scale-95 transition-all duration-500`}
            >
              Create workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

WorkSpaceModal.propTypes = {
  openModal: PropTypes.func.isRequired,
};
