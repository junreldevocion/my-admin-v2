import { useRouter } from "next/router";
import { createContext, ReactElement, ReactNode, useContext } from "react";

type appContextType = {
    href: string;
}

const appContextTypeDefaultValues : appContextType = {
    href: '',
}

const AppContext = createContext<appContextType>(appContextTypeDefaultValues);

export function useApp() {
    return useContext(AppContext);
};

type Props = {
    children: ReactElement[] | ReactElement
}

export function AppProvider({children}: Props) {
    const router = useRouter();
    const href = router.asPath

    const value = {
        href,
    }

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    )

}