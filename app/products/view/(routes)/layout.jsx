import { Suspense } from "react";

const layout = ({ children }) => {
    return (
        <div>
            <Suspense>
        {children}
        </Suspense>
        </div>
    );
    };

    export default layout;