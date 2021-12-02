import React from "react";

export const UserContext = React.createContext({
    swiped: [],
    notSwiped: [],
    userId: "",
    matches: [],
    setMatches: (match) => {}
});