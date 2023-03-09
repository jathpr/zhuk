import { getAuth, signOut as fbSignOut } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

export const signOut = () => fbSignOut(auth)