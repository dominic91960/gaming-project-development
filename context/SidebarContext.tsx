import { useState, useContext, createContext, ReactNode } from "react";

interface SidebarContextProps {
    selectedItem: string;
    setSelectedItem: (item: string) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<string>("");

    return (
        <SidebarContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

