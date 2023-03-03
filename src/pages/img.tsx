import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
// Create a reference to 'images/mountains.jpg'

const ImagePage = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState<string>();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;
        setUser(uid);
      } else {
        setUser(undefined);
        // User is signed out
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
    console.log(e.target.files[0]);
  };

  const handleUpload = () => {
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
      {user ? "hello, user " + user : "Please login"}
      <input type="file" onChange={onSelectFile} />
      Type a name of photo
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {selectedFile && <img src={preview} width="500" />}
      <button onClick={handleUpload}>Upload Ann</button>
    </>
  );
};

export default ImagePage;
