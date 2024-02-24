import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Scrollata() {
    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => {
               window.scrollTo(0, 0);
        }, 1);
   
    }, [pathname]);
  
    return null;
}
