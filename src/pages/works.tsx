import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase";

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
      Zhuk Works
      {works.map((url) => (
        <img src={url} key={url} width={300} />
      ))}
    </>
  );
};

export default Works;
