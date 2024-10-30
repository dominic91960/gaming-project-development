import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RedirectSignInPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn?: () => void;
}

const RedirectSignInPopup: React.FC<RedirectSignInPopupProps> = ({
  isOpen,
  onClose,
  onSignIn,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-white">Please Sign In</DialogTitle>
        <p className="text-white">You need to sign in to access this feature.</p>
        <div>
          <Button variant="outline" onClick={onSignIn}>
            Sign In
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedirectSignInPopup;
