// getProjects = (setProjects) => { setProjects((prev) => [...prev, nextProject])}

import { getAuth } from "firebase/auth";
import {
  getDatabase,
  set,
  ref as dbRef,
  child,
  get,
  update,
} from "firebase/database";
import {
  ref,
  getStorage,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
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

export const getProjectImg = async (name: string) => {
  try {
    return await getDownloadURL(ref(storage, `${PATH}/${name}`));
  } catch (error) {
    return;
  }
};

export const getProjectFileType = async (name: string) => {
  try {
    const meta = await getMetadata(ref(storage, `${PATH}/${name}`));
    return meta.contentType;
  } catch (error) {
    return;
  }
};

type Data = {
  name: string;
  body: [{ key: string; value: string }];
};

export const sendProjectData = async ({ body, name }: Data) => {
  const sendBody: any = {};
  body.forEach(({ key, value }) => (sendBody[key] = value));
  update(dbRef(db, `${PATH}/${name}`), sendBody);
};

export const readProjectData = async (path?: string) => {
  const nextPath = path ? `${PATH}/${path}` : PATH;
  const db = dbRef(getDatabase());
  try {
    const snapshot = await get(child(db, nextPath));
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
    const promisesVsNames = res.items.map((itemRef) => {
      console.log(
        "🚀 ~ file: projects.ts:81 ~ promisesVsNames ~ itemRef:",
        itemRef
      );
      return {
        promise: getDownloadURL(ref(storage, itemRef.fullPath)),
        name: itemRef.name,
      };
    });
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

export type ProjectType = { description: string; info: string };
export type ProjectsType = { [name: string]: ProjectType };
