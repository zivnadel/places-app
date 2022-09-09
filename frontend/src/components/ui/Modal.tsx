import React from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

interface OverlayProps {
  heading?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  headerClasses?: string;
  contentClasses?: string;
  footerClasses?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalOverlay: React.FC<OverlayProps> = ({
  className,
  headerClasses,
  heading,
  onSubmit,
  children,
  contentClasses,
  footer,
  footerClasses,
}) => {
  return ReactDOM.createPortal(
    <div
      className={twMerge(
        `z-[100] fixed top-[15vh] md:top-[22vh] left-[5%] right-[5%] width-[80%] bg-white shadow-md rounded-lg md:left-[calc(50%-20rem)] md:w-[40rem] ${className}`
      )}
    >
      <header
        className={twMerge(
          `w-full py-4 px-2 bg-primary text-white ${headerClasses} rounded-t-lg`
        )}
      >
        <h2 className="m-2 font-semibold text-2xl">{heading}</h2>
      </header>
      <form
        className="h-full w-full"
        onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}
      >
        <div className={twMerge(`py-4 px-2 ${contentClasses}`)}>{children}</div>
        <footer className={twMerge(`py-4 px-2 ${footerClasses}`)}>
          {footer}
        </footer>
      </form>
    </div>,
    document.getElementById("modal-hook")!
  );
};

interface ModalProps extends OverlayProps {
  show: boolean;
  onCancel: React.MouseEventHandler<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
