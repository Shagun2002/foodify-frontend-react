import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClickBackdrop}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children} </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop onClickBackdrop={props.onClose}/>, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </div>
  );
};

export default Modal;
