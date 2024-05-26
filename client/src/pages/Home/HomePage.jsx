// import { Link, NavLink } from "react-router-dom";
import { Suspense, lazy, useState } from "react";

import IdeaPic from "../../assets/download.png";
import IdeaPic2 from "../../assets/download2.jpeg";
import { Button } from "@/components/ui/button";
import AddIdeaForm from "@/components/AddIdeaForm";
import Spinner from "@/components/Spinner";

const Ideas = lazy(() => import("../IdeaPage/Ideas"));

function HomePage() {
  const [isOpen, onClose] = useState(false);

  return (
    <div className="content w-full max-h-[100vh] p-2 mt-4 ">
      <div className="max-w-full flex flex-col justify-center items-center md:m-4">
        <div className="flex flex-col gap-4 md:gap-4 items-center justify-center">
          <div className="flex gap-2 md:gap-4 items-center justify-center">
            <figure className="w-[70px] md:w-[120px] hidden md:block">
              <img src={IdeaPic} alt="" className="w-full h-full" />
            </figure>
            <h1 className="text-3xl md:text-4xl max-w-[500px] text-indigo-400 italic text-center mx-4 underline decoration-dashed underline-offset-2">
              Top Productive ideas for your next startup
            </h1>
            <figure className="w-[60px] md:w-[120px] hidden md:block">
              <img src={IdeaPic2} alt="" className="w-full h-full" />
            </figure>
          </div>
          <p className="text-xl md:text-2xl mt-4 underline decoration-wavy underline-offset-2 text-center">
            Write and share your best Ideas, No account needed!
          </p>

          <Button onClick={() => onClose(true)}>Share new idea</Button>
        </div>
        <div className="min-w-[350px] max-w-[800px] md:w-full mt-8 ">
          {/* <div className="grid grid-cols-[repeat(3,1fr)] text-[25px]">
            <NavLink
              className="flex justify-center items-center border-b-2 border-gray-300  active:border-gray-600 "
              to="/#top"
              onClick={() => setActiveState("#top")}
            >
              Top
            </NavLink>
            <NavLink
              className="flex justify-center items-center border-b-2 border-gray-300  active:border-gray-600"
              to="/#new"
            >
              New
            </NavLink>
            <NavLink
              className="flex justify-center items-center border-b-2 border-gray-300  active:border-gray-600"
              to="/#bottom"
            >
              Bottom
            </NavLink>
          </div> */}
        </div>

        {/* <Ideas /> */}
        <Suspense fallback={<Spinner />}>
          <Ideas />
        </Suspense>
      </div>

      {isOpen && <AddIdeaForm isOpen={isOpen} onClose={onClose} />}
    </div>
  );
}

export default HomePage;
