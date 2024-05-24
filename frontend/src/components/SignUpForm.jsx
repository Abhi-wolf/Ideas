import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/pages/Authentication/useSignUp";

function SignUpForm() {
  const { register, reset, handleSubmit } = useForm();
  const { signUp, isPending } = useSignUp();
  const navigate = useNavigate();
  console.log("isloading = ", isPending);

  const onSubmit = (data) => {
    console.log(data);
    signUp(
      { data },
      {
        onSuccess: () => {
          reset();
          toast.success("Successfully signed in");
          navigate("/login");
        },
        onError: (err) => {
          toast.error(err.message);
          navigate("/signup");
        },
      }
    );
  };

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Rajesh"
                disabled={isPending}
                required
                {...register("name")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled={isPending}
                placeholder="rajesh@email.com"
                required
                {...register("email")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Create an account
            </Button>
          </form>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
