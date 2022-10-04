import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    //window.scrollTo(0, 0);
    document.getElementById("root").scrollTo(0, 0);
    // console.log(`${pathname}`);
  }, [pathname]);

  return null;
}

// const ScrollToTop = ({ children }) => {
//   const location = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   return <>{children}</>;
// };

// export default ScrollToTop;
