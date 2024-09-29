import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

interface Role {
  id: string;
  name: string;
}

interface RoleContextProps {
  roles: Role[];
  addRole: (roleName: string) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  editRole: (id: string, roleName: string) => Promise<void>;
  loading: boolean; // Expose loading state to manage spinner outside
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
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  // Fetch roles from the backend on mount
  useEffect(() => {
    getAllUserRoles();
  }, []);

  const getAllUserRoles = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/user-roles");
      setRoles(response.data); // Assuming the API returns the array of roles
      // showToast(true, response.data.message);
    } catch (error: any) {
      showToast(false, error.response.data.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Add role via API
  const addRole = async (roleName: string) => {
    // setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.post("user-roles", {
        name: roleName,
      });
      showToast(true, response.data.message);
      // getAllUserRoles();
      setRoles([...roles, response.data.newRole]); // Add new role to local state
    } catch (error: any) {
      showToast(false, error.response.data.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Delete role via API
  const deleteRole = async (id: string) => {
    // setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.delete(`user-roles/${id}`);
      // getAllUserRoles();
      setRoles(roles.filter((role) => role.id !== id));
      showToast(true, response.data.message);
    } catch (error: any) {
      showToast(false, error.response.data.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Edit role via API
  const editRole = async (id: string, roleName: string) => {
    // setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.patch(`user-roles/${id}`, {
        name: roleName,
      });

      // Update the state with the new role name
      const index = roles.findIndex((role) => role.id === id);
      if (index !== -1) {
        roles[index].name = response.data.updateRole.name;
      }

      showToast(true, response.data.message);
    } catch (error: any) {
      showToast(false, error.response.data.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <RoleContext.Provider
      value={{ roles, addRole, deleteRole, editRole, loading }}
    >
      {children}
    </RoleContext.Provider>
  );
};
