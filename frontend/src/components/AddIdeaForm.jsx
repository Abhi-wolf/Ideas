/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/context/userContext";
import { Input } from "./ui/input";
import { useAddIdea } from "@/pages/Home/useAddIdea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function AddIdeaForm({ isOpen, onClose }) {
  const { userName } = useAuth();
  const [description, setNewIdea] = useState("");
  const [user, setUser] = useState("");
  const { addIdea, isPending } = useAddIdea();

  useEffect(() => {
    if (userName) setUser(userName);
  }, [userName]);

  function handleClick() {
    if (!description) {
      toast.info("Please add your idea");
      return;
    }

    if (!user) {
      toast.info("Please enter your name");
      return;
    }
    const data = { description, username: user };
    addIdea(
      { data },
      {
        onSuccess: () => {
          toast.success("Idea added successfully");
          onClose();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className=" space-y-0">
          <DialogTitle className="text-2xl pb-0 mb-0">
            Post Your Exiting Idea
          </DialogTitle>

          <DialogDescription>
            Write your exiting idea in detail.
            <span className="text-blue-400"></span>
          </DialogDescription>
        </DialogHeader>
        <div className=" py-2 flex flex-col gap-4">
          <Textarea
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="Type your idea here."
            className="text-md md:text-lg text-gray-600"
            disabled={isPending}
          />

          <Input
            type="text"
            placeholder="@username"
            className="text-md md:text-lg text-blue-400"
            value={`@${user}`}
            onChange={(e) => setUser(e.target.value.split(" ")[0])}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            onClick={() => onClose()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleClick} disabled={isPending}>
            Post Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddIdeaForm;
