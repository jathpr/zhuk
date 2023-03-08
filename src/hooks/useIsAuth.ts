import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { app } from "../firebase";


export const useIsAuth = () => {
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

    return !!user
}