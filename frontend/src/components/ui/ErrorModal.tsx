import React from "react";

import Modal from "./Modal";
import Button from "./formElements/Button";

interface Props {
  error: string;
  onClear: () => void;
}

const ErrorModal: React.FC<Props> = ({ error, onClear }) => {
  return (
    <Modal
      onCancel={onClear}
      heading="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p className="font-semibold text-lg p-1">{error}</p>
    </Modal>
  );
};

export default ErrorModal;
