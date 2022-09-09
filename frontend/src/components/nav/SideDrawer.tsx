import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

interface Props {
  children: React.ReactNode;
  show: boolean;
  onClick: React.MouseEventHandler<HTMLBaseElement>;
}

const SideDrawer: React.FC<Props> = ({ children, show, onClick }) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside
        onClick={onClick}
        className="fixed left-0 top-0 z-[100] h-screen  w-[70%] bg-white shadow-md md:hidden"
      >
        {children}
      </aside>
    </CSSTransition>,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;
