import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@uidotdev/usehooks";
import { findMembers, createWorkspace } from "../../api/workspace";
import { useAuth } from "../../hooks/useAuth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";
import Input from "../ui/input";

export default function WorkSpaceModal({ openModal }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
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
      className={`fixed inset-0 flex items-center justify-center ${theme.overlay}`}
      onClick={modalCloseHandle}
    >
      <div
        className={`w-[95%] md:w-[75%] lg:w-[45%] p-6 rounded-2xl max-h-[85vh] overflow-y-auto ${theme.overlayCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <IoClose
            className="cursor-pointer text-lg"
            onClick={() => openModal(false)}
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Workspace name"
            name="name"
            placeholder="Enter workspace name"
            type="text"
            stateVar={name}
            setStatevar={setName}
            description={nameDescription}
            descriptionControlFunc={setNameDescription}
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs">Workspace description</label>
            <textarea
              placeholder="About your workspace..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl outline-none resize-none transition
              ${
                darkMode
                  ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-400"
                  : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500"
              }
              focus:border-purple-500`}
              rows={5}
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="relative">
              <IoSearch
                className="absolute right-4 top-[2.65rem] -translate-y-1/2"
                size={16}
              />
              <Input
                disable={searchDisable}
                type="text"
                placeholder="Search for collaborators..."
                name="members"
                label="Collaborators"
                stateVar={individual}
                setStatevar={setIndividual}
                description={searchDescription}
                descriptionControlFunc={setSearchDescription}
                onKeyDown={handleKeyDown}
              />
            </div>

            {searchResults.length > 0 && (
              <div
                className={`absolute top-[85px] w-full rounded-xl z-30 max-h-[220px] overflow-y-auto ${theme.overlayCard}`}
              >
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelection(item.email)}
                    className={`flex items-center gap-3 p-3 text-xs cursor-pointer border-b last:border-none
                    ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
                  >
                    <img
                      src={item.profile}
                      className="w-6 h-6 rounded-full"
                      alt="profile"
                    />
                    {item.email}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {members.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs
                  ${
                    darkMode
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span>{item}</span>
                  <IoClose
                    className="cursor-pointer"
                    size={14}
                    onClick={() => handleDeletion(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Input
            type="password"
            label="Password (Optional)"
            placeholder="John_doe123"
            name="password"
            stateVar={password}
            setStatevar={setPassword}
            description={passwordDesc}
            descriptionControlFunc={setPasswordDesc}
          />

          <Button type="submit" className="w-full">
            Create workspace
          </Button>
        </form>
      </div>
    </div>
  );
}

WorkSpaceModal.propTypes = {
  openModal: PropTypes.func.isRequired,
};
