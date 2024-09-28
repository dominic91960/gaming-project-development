import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import axios from "axios";

interface Role {
  id: string;
  name: string;
}

interface RoleContextProps {
  roles: Role[];
  addRole: (roleName: string) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  editRole: (id: string, roleName: string) => Promise<void>;
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
  const [roles, setRoles] = useState<Role[]>([]);

  // Fetch roles from the backend on mount
  useEffect(() => {
    getAllUserRoles();
  }, []);

  const getAllUserRoles = async () => {
    try {
      const url = "http://localhost:3000/user-roles";
      const response = await axios.get(url);
      setRoles(response.data); // Assuming the API returns the array of roles
    } catch (error) {
      console.log("Roles fetch failed", error);
    }
  };

  // Add role via API
  const addRole = async (roleName: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/user-roles";
      const response = await axios.post(url, { name: roleName });
      // Add the new role to the local state after successfully adding to the backend
      setRoles((prevRoles) => [...prevRoles, response.data]);
    } catch (error) {
      console.log("Failed to add role", error);
    }
  };

  // Delete role
  const deleteRole = async (id: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user-roles/${id}`;
      await axios.delete(url);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch (error) {
      console.log("Failed to delete role", error);
    }
  };

  // Edit role
  const editRole = async (id: string, roleName: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user-roles/${id}`;
      const response = await axios.patch(url, { name: roleName });
      // Update the local state with the edited role after a successful backend update
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === id ? { ...r, name: roleName } : r))
      );
    } catch (error) {
      console.log("Failed to edit role", error);
    }
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, deleteRole, editRole }}>
      {children}
    </RoleContext.Provider>
  );
};
