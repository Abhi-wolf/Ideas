import { toast } from "sonner";

import Idea from "@/components/Idea";
import { useGetIdeas } from "../Home/useGetIdeas";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetBookMarks } from "../Home/userGetBookMarks";

function Ideas() {
  const { Ideas, isLoading, error } = useGetIdeas();
  const { bookmarks, isLoading: isLoadingBookmarks } = useGetBookMarks();

  if (isLoading || isLoadingBookmarks) {
    return <Spinner />;
  }
  if (error) {
    toast.error(error?.message);
    return <ErrorMessage errorMessage={error?.message} />;
  }

  return (
    <div className=" min-w-[350px] max-w-[800px] md:w-full mt-8 p-2 md:p-4">
      <div className="flex flex-col gap-4 ">
        {Ideas?.map((idea, index) => (
          <Idea idea={idea} key={index} bookmarks={bookmarks} />
        ))}
      </div>
    </div>
  );
}

export default Ideas;
