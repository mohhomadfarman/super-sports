// import Navbar from "./components/Navbar";
// import AllRoutes from "./pages/AllRoutes";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <AllRoutes />
//     </div>
//   );
// }

// export default App;


import React from "react";
import { useRoutes } from "react-router-dom";
import { defaultProtect, protect } from "./utils_sec/Routes";
import { withoutAuthRoute } from "./utils_sec/helper";

function App() {
  const routing = useRoutes(protect);

  let pathName = window.location.pathname
    .toLowerCase()
    .replace(/^\/|\/$/g, "")
    .split("/");

  let checkIsWithoutAuthRoute = withoutAuthRoute.includes(
    pathName && pathName.length > 0 ? pathName[0] : "--"
  );

  const defaultRouting = useRoutes(defaultProtect);
console.log(checkIsWithoutAuthRoute)
  if (checkIsWithoutAuthRoute) {
    return <>{defaultRouting}</>;
  }
  return <>{routing}</>;
}
export default App;