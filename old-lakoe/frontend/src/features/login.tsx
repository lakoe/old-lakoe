"use client";

import { Label } from "@/components/label";
import { ToastAction } from "@/components/toast";
import { useToast } from "@/components/use-toast";
import { LoadingSpinner } from "@/routes/__root";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { Input } from "../components/input";
import { Button } from "../components/ui/button";
import useStore from "../z-context";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { api } from "@/lib/api";

const loginSchema = z.object({
  email: z.string({ message: "email harus diisi" }).min(2).max(50),
  password: z.string({ message: "password harus diisi" }).max(32),
});

export function LoginForm() {
  const { toast } = useToast();
  const setUser = useStore((state) => state.SET_USER);
  const token = localStorage.getItem("token");
  const navigate = useNavigate({ from: "/auth/login" });
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const data = {
        email: values.email,
        password: values.password,
      };

      const response = await Axios({
        method: "post",
        url: `${api}/login`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = response.data.user;
      const token = response.data.token;
      const checkAuth = await Axios({
        method: "get",
        url: `${api}/login/auth`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!token) {
        throw new Error("Token Not Found");
      }

      if (!user) {
        throw new Error("User Not Found");
      }

      localStorage.setItem("token", token);
      setUser(checkAuth.data);
      toast({
        variant: "success",
        title: `Welcome ${user.name}!`,
      });

      switch (response.data.user.role_id) {
        case 1:
          navigate({ to: "/buyer/dashboard" });
          break;
        case 2:
          navigate({ to: "/seller/dashboard" });
          break;
        case 3:
          navigate({ to: "/admin/dashboard" });
          break;
        default:
          break;
      }
    } catch (error: any) {
      console.log("error", error);
      toast({
        variant: "destructive",
        title: `Error! ${error.response.status}`,
        description: `${error.message}`,
      });
    }
  }

  useEffect(() => {
    if (!token) {
      toast({
        variant: "destructive",
        title: `Error!`,
        description: `Please login to continue`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, []);

  // for password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full h-screen p-12">
      <div className="w-full h-full flex bg-slate-600 rounded-sm">
        {/* form */}
        <div className="w-full flex bg-white flex-col justify-center items-center p-12 rounded-s-sm">
          <h1 className="font-bold text-2xl text-orange-600 mb-8">
            Welcome Back!
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Email <Label className="text-orange-600">*</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukan email"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Password <Label className="text-orange-600">*</Label>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukan password"
                          {...field}
                          required
                        />
                        <div
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm cursor-pointer"
                        >
                          {showPassword ? (
                            <VscEyeClosed size={"1.5rem"} fill="black" />
                          ) : (
                            <VscEye size={"1.5rem"} fill="black" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end gap-1 mb-8 text-sm">
                <h1>Forgot Your Password?</h1>
                <Link
                  to="/auth/request-password"
                  className="font-bold text-blue-500"
                >
                  Click Here
                </Link>
              </div>

              <div className="w-full flex flex-col gap-4 items-center text-sm">
                {!form.formState.isSubmitting ? (
                  <Button type="submit" className="px-12 bg-orange-500">
                    Login
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled
                    className="px-12 bg-orange-500 gap-2"
                  >
                    <LoadingSpinner />
                    Login
                  </Button>
                )}

                <div className="flex justify-center gap-1 mt-8">
                  <h1>Do you have an account?</h1>
                  <Link to="/auth/register" className="font-bold text-blue-500">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* logo */}
        <div className="flex flex-col w-full bg-orange-100 justify-center items-center rounded-e-sm">
          <img src="/auth/login.png" className="w-3/4 object-cover" />
          <img src="/Lakoe.png" className="w-2/6" />
        </div>
      </div>
    </div>
  );
}
