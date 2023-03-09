// getProjects = (setProjects) => { setProjects((prev) => [...prev, nextProject])}

import { getAuth } from "firebase/auth";
import { getDatabase, set, ref as dbRef, child, get } from "firebase/database";
import {
  ref,
  getStorage,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage();
const db = getDatabase();

const PATH = "projects";

getAuth(app);
// Create a reference under which you want to list
const listRef = ref(storage, PATH);

type PropsFile = {
  file: File;
  name: string;
};

export const uploadProject = async ({ file, name }: PropsFile) => {
  const snapshot = await uploadBytes(ref(storage, `${PATH}/${name}`), file);
  return snapshot;
};

export const getPreview = async (name: string) => {
  try {
    return await getDownloadURL(ref(storage, `${PATH}/${name}`));
  } catch (error) {
    return;
  }
};

type Data = {
  name: string;
  body: [{ key: string; value: string }];
};

export const sendData = async ({ body, name }: Data) => {
  const sendBody: any = {};
  body.forEach(({ key, value }) => (sendBody[key] = value));
  console.log("🚀 ~ file: projects.ts:52 ~ sendData ~ sendBody:", sendBody);
  set(dbRef(db, `${PATH}/${name}`), sendBody);
};

export const readData = async (path: string) => {
  const db = dbRef(getDatabase());
  try {
    const snapshot = await get(child(db, `${PATH}/${path}`));
    console.log("🚀 ~ file: projects.ts:62 ~ readData ~ snapshot:", snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const getProjectFiles = async (name: string) => {
  // Create a reference under which you want to list
  const listRef = ref(storage, `${PATH}/${name}`);
  try {
    const res = await listAll(listRef);
    const promisesVsNames = res.items.map((itemRef) => ({
      promise: getDownloadURL(ref(storage, itemRef.fullPath)),
      name: itemRef.name,
    }));
    // can be optimezed by parralel download of the works
    const urls = await Promise.all(
      promisesVsNames.map(({ promise }) => promise)
    );
    return urls.map((url, index) => ({
      url,
      name: promisesVsNames[index].name,
    }));
  } catch (error) {
    return [];
  }
};
