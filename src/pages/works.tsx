import styled from "@emotion/styled";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

type Props = {
  user?: string | null,
  url: string,
  name: string,
  deleteWork: (name: string) => void
}
const Work = ({ user, url, name, deleteWork }: Props) => {
  console.log("🚀 ~ file: works.tsx:20 ~ Work ~ url:", url)
  if (!user) return <Photo src={url} key={url} alt={name} />
  return <WorkAuth>
    <Photo src={url} key={url} alt={name} />
    <RemoveButton onClick={() => {
      const answer = confirm("Это Удаліт Фото навсегда!")
      // Create a reference to the file to delete
      answer && deleteWork(name)
    }}>X</RemoveButton>
    <Text>{name}</Text>
  </WorkAuth>
}

export const Works = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState<string | null>();
  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(undefined);
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  const [works, setWorks] = useState<{ url: string, name: string }[]>([]);
  const storage = getStorage();
  getAuth(app);
  // Create a reference under which you want to list
  const listRef = ref(storage, "works");

  const deleteWork = (name: string) => {
    setWorks([])
    const desertRef = ref(storage, `works/${name}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
    getWorks()
  }

  const getWorks = () => {
     // Find all the prefixes and items.
     listAll(listRef)
     .then((res) => {
       res.items.forEach((itemRef) => {
         const name = itemRef.name
         getDownloadURL(ref(storage, itemRef.fullPath))
           .then((url) => {
             setWorks((prev) => [...prev, { url, name }]);
           })
           .catch((error) => {
             // Handle any errors
           });
         // All the items under listRef.
       });
     })
     .catch((error) => {
       // Uh-oh, an error occurred!
     });
  }

  useEffect(() => {
    getWorks()
  }, []);

  return (
    <>
      <Header />
      <WorksGrid>
        {works.map((work) => <Work url={work.url} user={user} name={work.name} deleteWork={deleteWork} />)}
      </WorksGrid>
      <Footer />
    </>
  );
};

const WorksGrid = styled.div`
  display: grid;
  height: 74vh;
  overflow: scroll;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 36vh);
  grid-gap: 15px;
  
  @media (min-width: 600px) {
    grid-template-rows: repeat(2, 30vw);
    grid-template-columns: repeat(3, 1fr);
  }
}`

const WorkAuth = styled.div`
  position: relative;
`

const Text = styled.span`
position: absolute;
    position: absolute;
    left: 5%;
    bottom: 5%;
    font-size: 20px;
    background-color: white;
    opacity: 60%;
`

const RemoveButton = styled.button`
 position: absolute;
    right: 5%;
    top: 5%;
    font-size: 40px;
    background-color: white;
    opacity: 60%;
    width: 60px;
`

const Photo = styled.img`
width: 100%;
height: 100%;
object-fit: cover;`

export default Works;
