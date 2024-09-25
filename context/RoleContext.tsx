import React, { createContext, useState, ReactNode, useContext } from "react";

interface RoleContextProps {
  roles: string[];
  addRole: (role: string) => void;
  deleteRole: (role: string) => void; // Add this line
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([
    "Admin",
    "Moderator",
    "Manager",
    "Author",
  ]);

  const addRole = (role: string) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  const deleteRole = (role: string) => {
    setRoles((prevRoles) => prevRoles.filter((r) => r !== role)); // Add this line
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, deleteRole }}>
      {" "}
      {/* Update this line */}
      {children}
    </RoleContext.Provider>
  );
};
