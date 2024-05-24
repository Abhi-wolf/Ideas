import { useGetIdea } from "./useGetIdea";
import Idea from "@/components/Idea";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import formateDate from "@/utils/formateDate";

function IdeaPage() {
  const { idea, isPending } = useGetIdea();

  if (isPending) return <Spinner />;

  return (
    <div className=" max-w-full flex flex-col justify-center items-center md:m-4">
      <div className="min-w-[350px] max-w-[800px] md:w-full mt-8 p-2 md:p-4 flex flex-col gap-2 justify-center items-center">
        <Idea idea={idea} />

        <div className="w-[93%] flex flex-col gap-4 ">
          {idea?.comments.map((comment) => (
            <div
              className="border-2 border-slate-200 p-2 flex flex-col gap-2 rounded-md"
              key={comment?._id}
            >
              <div className="flex items-center  gap-4 ">
                <Avatar>
                  <AvatarFallback>
                    {comment?.user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-md">
                    {comment?.user?.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {formateDate(comment?.updatedAt)}
                  </span>
                </div>
              </div>
              <p className="pl-8 text-md md:text-lg ">{comment?.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IdeaPage;
