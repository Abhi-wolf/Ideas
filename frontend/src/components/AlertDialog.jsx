/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AlertDialog({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please Login to continue</DialogTitle>
          <DialogDescription>
            Log in to your account to like and comment and bookmark your
            favourite ideas.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
