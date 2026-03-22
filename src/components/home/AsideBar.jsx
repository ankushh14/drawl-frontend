import PropTypes from "prop-types";
import Button from "../ui/button";

export default function AsideBar({ openModal, openJoinModal }) {
  return (
    <div
      className={`lg:static fixed z-10 bottom-0 flex flex-col w-full lg:w-[20%] space-y-3 p-4`}
    >
      <Button onClick={() => openModal(true)} className="w-full">
        Create Workspace
      </Button>

      <Button
        variant="secondary"
        onClick={() => openJoinModal(true)}
        className="w-full"
      >
        Join Workspace
      </Button>
    </div>
  );
}

AsideBar.propTypes = {
  openModal: PropTypes.func.isRequired,
  openJoinModal: PropTypes.func.isRequired,
};
