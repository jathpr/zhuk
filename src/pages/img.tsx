import React, { ChangeEvent, useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import styled from "@emotion/styled";
import { uploadWork } from "../server/works";

const ImagePage = () => {
  const [name, setName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Сначала надо выбрать фото")
    if (!name.length) return alert("Сначала надо ввести название")

    try {
      await uploadWork({ file: selectedFile, name })
      setName("")
      setPreview(undefined)
      setSelectedFile(undefined)
    } catch (error) {
      alert("Загрузка не удалась =(, что говорит по этому поводу сервер появится в следующем окне")
      alert(error)
    }
  };

  return (
    <>
      <Header />
      <AddWorkButton as="label" htmlFor="addWork">
        Select Image
        <HidedInput id="addWork" type="file" accept="image/png, image/gif, image/jpeg" onChange={onSelectFile} />
      </AddWorkButton>

      {selectedFile && <WorkDescription> Дай мне ангельскае імя
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <img src={preview} width="400" />
        <UploadButton onClick={handleUpload} disabled={!name}>Upload</UploadButton>
      </WorkDescription>}


      <Footer />
    </>
  );
};

const WorkDescription = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`

const AddWorkButton = styled.button`
cursor: pointer;
display: block;
font-size: 40px;
cursor: pointer;
background-color: #4CAF50;
border: black;
color: white;
padding: 15px 32px;
text-align: center;
width: 50%;
margin: auto;
border-radius: 35px;
`
const UploadButton = styled(AddWorkButton)`
background-color: #924caf;

&:disabled {
  color: black;
  background-color: gray;
  cursor: default;
}
`

const HidedInput = styled.input`
  display: none;
`

export default ImagePage;
