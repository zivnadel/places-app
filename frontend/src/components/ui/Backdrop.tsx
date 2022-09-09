import ReactDOM from "react-dom";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<Props> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 z-10"
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
