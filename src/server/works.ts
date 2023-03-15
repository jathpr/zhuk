import { getAuth } from "firebase/auth";
import {
  getStorage,
  listAll,
  getDownloadURL,
  deleteObject,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from "../firebase";

const PATH = "works";
const storage = getStorage();

getAuth(app);
// Create a reference under which you want to list
const listRef = ref(storage, "works");

export const getWorks = async () => {
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

export const getWork = async (name: string) => {
  try {
    return await getDownloadURL(ref(storage, `${PATH}/${name}`));
  } catch (error) {
    return;
  }
};

export const deleteWork = async (name: string) => {
  const desertRef = ref(storage, `works/${name}`);
  try {
    await deleteObject(desertRef);
  } catch (error) {}
};

type PropsFile = {
  file: File;
  name: string;
};

export const uploadWork = async ({ file, name }: PropsFile) => {
  const snapshot = await uploadBytes(ref(storage, `works/${name}`), file);
  return snapshot;
};
