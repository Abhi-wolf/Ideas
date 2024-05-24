/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/userContext";
import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";

function firstTwoLetters(name) {
  name.replace(/^\s+|\s+$/g, "");
  return name.substring(0, 2);
}

function UserSettings() {
  const { userName } = useAuth();
  const { user, isPending } = useGetUser();
  const { updateUser, isPending: isUpdating } = useUpdateUser();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name,
    },
  });

  function onSubmit(newUser) {
    console.log(newUser);

    let data = {};
    if (newUser.name === user?.name && newUser.password === "") {
      return;
    } else if (newUser.password === "") {
      let { password, ...rest } = newUser;
      data = rest;
    } else {
      data = newUser;
    }
    console.log(data);
    updateUser(
      { data, id: user?._id },
      {
        onSuccess: () => {
          toast.success("Successfully updated");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
    // reset();
  }

  useEffect(() => {
    reset({
      name: user?.name,
    });
  }, [user]);

  if (isPending) return <Spinner />;

  return (
    <div className="w-full  relative overflow-y-scroll ">
      <div className="m-4 md:m-8">
        <div className="border-b pb-2">
          <h1 className="scroll-m-20  text-4xl font-semibold tracking-tight first:mt-0">
            Settings
          </h1>

          <p className="text-lg pt-1 text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center  md:gap-14 h-[90%]  ">
          {/* figure */}
          <div className=" md:w-[40%] flex justify-center items-center p-4 ">
            {userName && (
              <div className="text-2xl md:text-4xl uppercase text-gray-500 bg-slate-300 rounded-full w-[100px] h-[100px] flex justify-center items-center">
                {firstTwoLetters(userName)}
              </div>
            )}
          </div>

          {/* user details */}
          <div className=" md:w-[40%] mt-4 ">
            <div>
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Your Profile
              </h2>
              <p className="text-md  text-muted-foreground">
                Manage your account settings
              </p>
              <Separator className="my-4" />
            </div>

            <form
              className="flex flex-col gap-4 md:gap-6"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="on"
            >
              <div>
                <Label className="text-md">Name</Label>
                <Input
                  type="text"
                  id="name"
                  required
                  disabled={isUpdating}
                  className="text-md mt-2"
                  {...register("name")}
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  This name will be used through out this application for your
                  account.
                </p>
              </div>
              <div>
                <Label className="text-md">Email</Label>
                <Input
                  type="email"
                  value={user?.email}
                  disabled
                  className="text-md mt-2"
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  Email cannot be updated. This is the email that will be used
                  through out this application.
                </p>
              </div>

              <div>
                <Label className="text-md">Password</Label>
                <Input
                  type="password"
                  placeholder="*************"
                  className="text-md mt-2"
                  disabled={isUpdating}
                  {...register("password")}
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  Password can be chnaged.
                </p>
              </div>

              <Button disabled={isUpdating}>Update Profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
