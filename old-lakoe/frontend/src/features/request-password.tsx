"use client";

import { Label } from "@/components/label";
import { useToast } from "@/components/use-toast";
import { LoadingSpinner } from "@/routes/__root";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
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

const loginSchema = z.object({
  email: z.string({ message: "email harus diisi" }).min(2).max(50),
});

export function RequestPassword() {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const data = {
        email: values.email,
      };

      const response = await Axios({
        method: "post",
        url: `${api}/users/request-password`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        variant: "success",
        title: `Please Check Your Email!`,
      });
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
    <div className="w-full h-screen p-12">
      <div className="w-full h-full flex bg-slate-600 rounded-sm">
        <div className="w-full flex bg-white flex-col justify-center items-center p-12 rounded-s-sm">
          <h1 className="font-bold text-2xl text-orange-600 mt-2 mb-4">
            Change Password
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-4/6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="font-bold mt-2">
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

              <div className="flex flex-col gap-4 items-center pt-6 text-sm">
                {!form.formState.isSubmitting ? (
                  <Button type="submit" className="px-12 bg-orange-500">
                    Request
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled
                    className="px-12 bg-orange-500"
                  >
                    Request <LoadingSpinner />
                  </Button>
                )}
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <h1 className="me-1">Do you remember your account?</h1>
                    <Link to="/auth/login" className="font-bold text-blue-500">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex flex-col w-full bg-orange-100 justify-center items-center rounded-e-sm">
          <img src="/auth/login.png" className="w-2/4 object-cover" />
          <img src="/Lakoe.png" className="w-2/6" />
        </div>
      </div>
    </div>
  );
}
