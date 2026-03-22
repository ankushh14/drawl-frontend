import { IoWarning } from "react-icons/io5";
import useTheme from "../../hooks/useTheme";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getThemeStyles } from "../../styles/theme";
import Button from "../../components/ui/button";

export default function ExitWorkspaceModal({ ModalController }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const navigate = useNavigate();
  const { leave, name } = useWorkspace();

  const handleYes = () => {
    leave();
    ModalController(false);
    navigate("/dashboard");
  };

  const handleNo = () => {
    ModalController(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center ${theme.overlay} ${darkMode ? "text-white" : "text-black"}`}
    >
      <div
        className={`w-[320px] p-6 rounded-2xl flex flex-col gap-4 text-center ${theme.overlayCard}`}
      >
        <div className="flex justify-center text-red-500">
          <IoWarning size={50} />
        </div>

        <h1 className="text-sm font-semibold leading-relaxed">
          Are you sure you want to leave{" "}
          <span className="font-bold">{name}</span>?
        </h1>

        <div className="flex gap-2 mt-2">
          <Button variant="danger" className="w-full" onClick={handleYes}>
            Leave
          </Button>

          <Button variant="secondary" className="w-full" onClick={handleNo}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

ExitWorkspaceModal.propTypes = {
  ModalController: PropTypes.func.isRequired,
};
