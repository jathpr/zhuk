import React, { ChangeEvent, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { navigate } from "gatsby";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import styled from "@emotion/styled";
import { SyntheticEvent } from "react";

const storage = getStorage();
// Create a reference to 'images/mountains.jpg'

const ImagePage = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState<string | null>();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.email;
        setUser(uid);
      } else {
        setUser(undefined);
        navigate("/")
      }
    });
    return () => {
      unlisten();
    };
  }, []);

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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    console.log("pressed");
    
    selectedFile &&
      name.length &&
      uploadBytes(ref(storage, `works/${name}`), selectedFile).then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
        }
      );
  };

  return (
    <>
      <Header />
      {user ? "hello, user " + user : "Please login"}
      {user && <button onClick={() => signOut(auth)}>SignOut</button>}
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

const WorkDescription = styled.div``

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
