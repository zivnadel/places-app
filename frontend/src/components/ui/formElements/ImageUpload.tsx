import React from "react";
import Button from "./Button";

interface Props {
  id: string;
  centered?: boolean;
  onInput: (id: string, pickedFile: File | null, isValid: boolean) => void;
  errorText?: string;
}

const ImageUpload: React.FC<Props> = ({ id, centered, onInput, errorText }) => {
  const [file, setFile] = React.useState<File>();
  const [previewUrl, setPreviewUrl] = React.useState<string>();
  const [isValid, setIsValid] = React.useState(false);

  const filePickerRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current!.click();
  };

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File | null = null;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className="border-none my-4 mx-0">
      <input
        className="hidden"
        ref={filePickerRef}
        type="file"
        id={id}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`${centered && "flex justify-center items-center flex-col"}`}
      >
        <div
          className={`w-52 h-52 rounded-lg flex items-center justify-center text-center mb-4 ${
            previewUrl
              ? "border-none"
              : " border-2 border-primary border-opacity-60"
          }`}
        >
          {previewUrl ? (
            <img
              className="w-full h-full object-cover"
              src={previewUrl}
              alt="Preview"
            />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
