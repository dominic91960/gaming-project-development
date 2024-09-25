// components/RoleList.tsx
import React from "react";

interface RoleListProps {
  roles: string[];
  onEdit: (role: string) => void;
  onDelete: (role: string) => void;
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Roles</h2>
      <ul className="list-disc pl-5">
        {roles.map((role) => (
          <li key={role} className="flex justify-between items-center py-1">
            <span>{role}</span>
            <div>
              <button
                onClick={() => onEdit(role)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(role)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
