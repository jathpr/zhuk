import styled from "@emotion/styled";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase";
import { Footer } from "../components/footer";
import { Header } from "../components/header";


export const Works = () => {
  const [works, setWorks] = useState<string[]>([]);
  const storage = getStorage();
  getAuth(app);
  // Create a reference under which you want to list
  const listRef = ref(storage, "works");

  useEffect(() => {
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(ref(storage, itemRef.fullPath))
            .then((url) => {
              const temp = [...works, url];
              console.log(
                "🚀 ~ file: works.tsx ~ line 22 ~ .then ~ temp",
                temp
              );
              setWorks((prev) => [...prev, url]);
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
  }, []);

  return (
    <>
      <Header />
      <WorksGrid>
        {works.map((url) => (
          <Photo src={url} key={url}  />
          ))}
      </WorksGrid>
          <Footer />
    </>
  );
};

const WorksGrid = styled.div`
  display: grid;
  height: 70vh;
  overflow: scroll;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 30vw);
  grid-gap: 15px;
}`

const Photo = styled.img`
width: 100%;
height: 100%;
object-fit: cover;`

export default Works;
