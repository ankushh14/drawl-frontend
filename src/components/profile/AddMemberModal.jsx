import Proptypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../hooks/useAuth";
import { addMembers, findMembers } from "../../api/workspace";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import { getThemeStyles } from "../../styles/theme";
import Input from "../ui/input";
import Button from "../ui/button";

export default function AddMemberModal({
  workspaceID,
  openModal,
  workspaceMembers,
}) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
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
      dataToSet = dataToSet.filter((elem) => !members.includes(elem.email));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMembers.length === 0) {
      return;
    }
    let requestBody = {
      members: newMembers,
      workspaceID,
    };
    const response = await addMembers(requestBody, token);
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
      id="Add-Modal-background"
      className={`fixed inset-0 flex items-center justify-center ${theme.overlay}`}
      onClick={modalCloseHandle}
    >
      <div
        className={`w-[95%] md:w-[75%] lg:w-[45%] p-6 rounded-2xl flex flex-col gap-4 ${theme.overlayCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg font-semibold">Add members</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              name="collaborators"
              type="text"
              label="Collaborators"
              placeholder="Search for collaborators..."
              stateVar={individual}
              setStatevar={setIndividual}
              description={searchDescription}
              descriptionControlFunc={setSearchDescription}
              onKeyDown={handleKeyDown}
              disable={searchDisable}
            />

            {searchResults.length > 0 && (
              <div
                className={`absolute top-[70px] w-full rounded-xl z-30 max-h-[220px] overflow-y-auto ${theme.overlayCard}`}
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

            <div className="flex flex-wrap gap-2 mt-3">
              {newMembers.map((item, index) => (
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

          <Button type="submit" className="w-full">
            Add Members
          </Button>
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
