import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import { getThemeStyles } from "../../styles/theme";
import Button from "../../components/ui/button";

export default function NoWorkSpaceComponent({ openModal, openJoinModal }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  return (
    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-6 max-w-xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold">
            No workspaces yet
          </h1>

          <p className={`text-sm md:text-base ${theme.mutedText}`}>
            You’re not part of any workspace yet. Create one or join an existing
            workspace to start collaborating.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button onClick={() => openModal(true)} className="w-full sm:w-auto">
            Create Workspace
          </Button>

          <Button
            variant="secondary"
            onClick={() => openJoinModal(true)}
            className="w-full sm:w-auto"
          >
            Join Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}

NoWorkSpaceComponent.propTypes = {
  openModal: PropTypes.func.isRequired,
  openJoinModal: PropTypes.func.isRequired,
};
