import {
  BarChart2Icon,
  BookmarkIcon,
  HeartIcon,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { useAuth } from "@/context/userContext";
import { AlertDialog } from "./AlertDialog";
import formateDate from "@/utils/formateDate";
import { useLike } from "@/pages/IdeaPage/useLike";
import { CommentForm } from "./CommentForm";
import { useBookmark } from "@/pages/IdeaPage/useBookmark";

/* eslint-disable react/prop-types */
function Idea({ idea, bookmarks }) {
  const { likeIdea, isPending } = useLike();
  const { bookMarkIdea, isPending: isBookmarking } = useBookmark();

  const [isLiked, setIsliked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);

  const [isOpen, onClose] = useState(false);
  const [isOpen2, onClose2] = useState(false);

  const { userId } = useAuth();

  useEffect(() => {
    if (idea?.likes && userId) {
      const temp = idea?.likes?.find((id) => id === userId);
      if (temp != undefined) setIsliked(true);
      else setIsliked(false);
    }

    if (bookmarks && userId) {
      const temp = bookmarks.find((id) => id === idea?._id);
      if (temp != undefined) setIsBookMarked(true);
      else setIsBookMarked(false);
    }

    if (!userId) {
      setIsBookMarked(false);
      setIsliked(false);
    }
  }, [bookmarks, userId, idea]);

  // LIKE
  function handleLike() {
    const { _id: id } = idea;
    if (!id) return;
    if (!userId) {
      onClose(true);
      return;
    }
    likeIdea({ id });
  }

  // COMMENT
  function handleComment() {
    const { _id: id } = idea;
    if (!id) return;
    if (!userId) {
      onClose(true);
      return;
    } else {
      onClose2(true);
    }
  }

  // BOOKMARK
  function handleBookMark() {
    const { _id: id } = idea;
    if (!id) return;
    if (!userId) {
      onClose(true);
      return;
    }
    bookMarkIdea({ id });
  }

  return (
    <div className="w-full p-4 rounded-lg flex flex-col gap-6 shadow-lg shadow-neutral-400 var(--background)">
      <Link to={`/idea/${idea?._id}`}>
        <div>
          <h1 className="text-2xl italic text-gray-500">{idea?.description}</h1>
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        {/* by - name of writter */}
        <div className="flex gap-4 text-gray-400 text-sm md:text-md">
          <span>By @{idea?.username ? idea.username : "anonymous"}</span>
          <span>on {formateDate(idea?.createdAt)}</span>
        </div>

        {/* comment, like bookmark */}
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={isPending}
              onClick={handleComment}
              className="border-none"
            >
              <MessageCircle size={20} color="violet" className="font-bold" />
            </Button>
            <span className="text-gray-600 text-xl ml-1">
              {idea?.comments?.length}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              onClick={handleLike}
              disabled={isPending}
              className={`border-none ${isLiked && "bg-red-500 hover"} `}
            >
              <HeartIcon size={20} color="violet" />
            </Button>
            <span className="text-gray-600 text-xl ml-1">
              {idea?.likes?.length}
            </span>
          </div>

          <div className="flex justify-center items-center gap-1">
            <BarChart2Icon size={20} color="violet" />
            <span className="text-gray-600 text-xl ml-1">{idea?.views}</span>
          </div>

          <Button
            size="icon"
            variant="outline"
            disabled={isBookmarking}
            onClick={handleBookMark}
            className={`border-none ${isBookMarked && "bg-violet-500 hover"} `}
          >
            <BookmarkIcon size={20} color="violet" />
          </Button>
        </div>
      </div>
      {isOpen && <AlertDialog isOpen={isOpen} onClose={onClose} />}
      {isOpen2 && (
        <CommentForm isOpen={isOpen2} onClose={onClose2} idea={idea} />
      )}
    </div>
  );
}

export default Idea;
