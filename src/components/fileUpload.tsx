import styled from "@emotion/styled";
import React, { useState } from "react";
import { useFileSelect } from "../hooks/useFileSelect";

export type PropsFile = {
  file: File;
  name: string;
};

type Props = {
  name?: string;
  addText: string;
  uploadFile: (props: PropsFile) => void;
  onUpload?: () => void;
};

const FileUpload = ({
  name: initName,
  uploadFile,
  addText,
  onUpload,
}: Props) => {
  const [name, setName] = useState<string | undefined>();
  initName && initName !== name && setName(initName);
  const { onFileSelect, preview, selectedFile } = useFileSelect();

  const handleUpload = async () => {
    if (!selectedFile) return alert("Сначала надо выбрать фото");
    if (!name || !name.length) return alert("Сначала надо ввести название");

    try {
      //add upload status
      await uploadFile({ file: selectedFile, name });
      onUpload && onUpload();
      setName("");
      onFileSelect();
    } catch (error) {
      alert(
        "Загрузка не удалась =(, что говорит по этому поводу сервер появится в следующем окне"
      );
      alert(error);
    }
  };

  return (
    <>
      <AddButton as="label" htmlFor={addText}>
        {addText}
        <HidedInput
          id={addText}
          type="file"
          accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
          onChange={onFileSelect}
        />
      </AddButton>

      {selectedFile && (
        <Description>
          {!initName && "назва"}
          {!initName && (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <img src={preview} width="400" />
          <UploadButton onClick={handleUpload} disabled={!name}>
            Надыслаць
          </UploadButton>
        </Description>
      )}
    </>
  );
};

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const AddButton = styled.button`
  cursor: pointer;
  display: block;
  font-size: 40px;
  cursor: pointer;
  background-color: #4caf50;
  border: black;
  color: white;
  padding: 15px 32px;
  text-align: center;
  width: 50%;
  margin: auto;
  border-radius: 35px;
`;
const UploadButton = styled(AddButton)`
  background-color: #924caf;

  &:disabled {
    color: black;
    background-color: gray;
    cursor: default;
  }
`;

const HidedInput = styled.input`
  display: none;
`;

export default FileUpload;
