import { useEffect, useState } from "react";

import {
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export default function useNewOrdersCount() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        const q = query(
            collection(db, "orders"),
            where("isNew", "==", true)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            setCount(snapshot.size);

        });

        return unsubscribe;

    }, []);

    return count;

}