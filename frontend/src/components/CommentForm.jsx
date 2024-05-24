/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useAddComment } from "@/pages/IdeaPage/useAddComment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CommentForm({ isOpen, onClose, idea }) {
  const [comment, setComment] = useState("");
  const { addComment, isPending } = useAddComment();

  function handleClick(e) {
    e.preventDefault();
    if (!comment) return;
    console.log(comment);

    const words = comment.trim().split(" ");

    if (words.length > 20) {
      toast.warning(
        "Number of words in a comment should be less than or equal to 20"
      );
      return;
    }

    const data = { comment, id: idea?._id };
    addComment(
      { data },
      {
        onSuccess: () => {
          toast.success("Comment add successfully");
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
          <DialogTitle className="text-2xl pb-0 mb-0">Comment</DialogTitle>

          <DialogDescription>
            Commenting to
            <span className="text-blue-400">
              @{idea?.username ? idea.username : "anonymous"}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className=" py-2">
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your message here."
            className="text-md md:text-lg text-gray-600"
            disabled={isPending}
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
            Post Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
