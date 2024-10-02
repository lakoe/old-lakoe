"use client";

import { Label } from "@/components/label";
import { useToast } from "@/components/use-toast";
import { LoadingSpinner } from "@/routes/__root";
import { Route } from "@/routes/auth/change-password.$token";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import Axios from "axios";
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
import { api } from "@/lib/api";

const loginSchema = z
  .object({
    password: z.string({ message: "password harus diisi" }).max(32),
    c_password: z.string({ message: "password harus diisi" }).max(32),
  })
  .refine((data) => data.password === data.c_password, {
    path: ["c_password"],
    message: "Password does not match",
  });

export function ChangePassword() {
  const { toast } = useToast();
  const { token } = Route.useParams();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      c_password: "",
      password: "",
    },
  });
  const watchFields = form.watch();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const data = {
        password: values.password,
      };
      console.log("token change pass", token);
      const response = await Axios({
        method: "patch",
        url: `${api}/users/change-password/${token}`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        variant: "success",
        title: `Change Password!`,
      });
      if (response.status === 201) navigate({ to: "/auth/login" });
    } catch (error: any) {
      console.log("error", error);
      toast({
        variant: "destructive",
        title: `Error! ${error.response.status}`,
        description: `${error.message}`,
      });
    }
  }

  return (
    <div className="w-8/12 h-10/12 rounded-sm m-auto flex mt-32">
      <div className="flex bg-white h-full w-1/2 flex-col justify-start items-center pb-16 pt-8 px-4 rounded-s-sm">
        <h1 className="font-bold text-2xl text-red-600 mt-2 mb-4">
          Change Your Password
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-4/6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="font-normal mt-2">
                    New Password <Label className="text-red-600">*</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukan email"
                      {...field}
                      required
                      {...form.register("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="c_password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="font-normal mt-2">
                    Confirm Password <Label className="text-red-600">*</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukan password"
                      {...field}
                      required
                      {...form.register("c_password", {
                        required: true,
                        validate: (value) =>
                          value === watchFields.password ||
                          "Password does not match",
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center text-sm">
              {!form.formState.isSubmitting ? (
                <Button type="submit" className="bg-red-600">
                  Change
                </Button>
              ) : (
                <Button type="submit" disabled className="bg-red-600">
                  Change <LoadingSpinner></LoadingSpinner>
                </Button>
              )}
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h1 className="me-1">Do you remember your account?</h1>
                  <Link to="/auth/register" className="text-blue-500">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col w-1/2 bg-orange-100 justify-center items-center rounded-e-sm">
        <img src="/auth/login.png" className="w-3/4 object-cover" />
        <img src="/Lakoe.png" className="w-2/6" />
      </div>
    </div>
  );
}
