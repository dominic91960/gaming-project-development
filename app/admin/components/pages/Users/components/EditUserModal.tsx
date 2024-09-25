import React, { useEffect, useState } from "react";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}

interface EditUserModalProps {
  currentUser: User | null;
  setShowModal: (show: boolean) => void;
  editUser: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  currentUser,
  setShowModal,
  editUser,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      setEditedUser(currentUser);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUser) {
      console.log("Submitting:", editedUser);
      editUser(editedUser);
      setShowModal(false);
    }
  };

  if (!editedUser) return null;
  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={editedUser.image}
            onChange={(e) =>
              setEditedUser({ ...editedUser, image: e.target.value })
            }
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={editedUser.username}
            onChange={(e) => {
              console.log("Username changed:", e.target.value);
              setEditedUser({ ...editedUser, username: e.target.value });
            }}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={editedUser.firstName}
            onChange={(e) =>
              setEditedUser({ ...editedUser, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={editedUser.lastName}
            onChange={(e) =>
              setEditedUser({ ...editedUser, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={editedUser.role}
            onChange={(e) =>
              setEditedUser({ ...editedUser, role: e.target.value })
            }
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserModal;
