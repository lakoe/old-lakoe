"use client";

import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useToast } from "@/components/use-toast";
import { LoadingSpinner } from "@/routes/__root";
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
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { api } from "@/lib/api";

const registerSchema = z.object({
  name: z.string({ message: "username tidak boleh kosong" }).max(50),
  email: z.string({ message: "email harus diisi" }).min(2).max(50),
  phone: z.string({ message: "no telp harus diisi" }).max(16),
  password: z.string({ message: "password harus diisi" }).min(8).max(32),
  role_id: z.any(),
});

export function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate({ from: "/auth/register" });
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role_id: 1,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role_id: values.role_id,
      };
      const response = await Axios({
        method: "post",
        url: `${api}/users`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) navigate({ to: "/auth/login" });
      toast({
        variant: "success",
        title: `User Created! ${response.data.name}`,
        description: `Please Login to use our services`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error!`,
        description: `${error.message}`,
      });
      console.log(error);
    }
  }

  // for password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full h-screen p-12">
      <div className="w-full h-full flex rounded-sm bg-white">
        {/* form */}
        <div className="w-full flex bg-white flex-col justify-center items-center p-12 rounded-s-sm">
          <h1 className="font-bold text-2xl text-orange-600">Register Here</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Username
                      <Label className="text-orange-600">*</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan username"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Email
                      <Label className="text-orange-600">*</Label>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Phone
                      <Label className="text-orange-600">*</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Masukan phone"
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

              <p className="text-sm font-bold">
                Role
                <Label className="text-orange-600">*</Label>
              </p>
              <Select
                onValueChange={(e) => {
                  form.setValue("role_id", parseInt(e));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    <SelectLabel className="border-b-4">Role List</SelectLabel>
                    <SelectItem value="1">Buyer</SelectItem>
                    <SelectItem value="2">Seller</SelectItem>
                    <SelectItem value="3">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex flex-col items-center mt-4 text-sm">
                {!form.formState.isSubmitting ? (
                  <Button type="submit" className="px-12 bg-orange-500">
                    Register
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled
                    className="px-12 bg-orange-500 gap-2"
                  >
                    <LoadingSpinner />
                    Register
                  </Button>
                )}

                <div className="flex flex-col items-center mt-4">
                  {/* <div className="flex">
                    <h1 className="me-1">Are you a buyer?</h1>
                    <Link
                      to="/buyer/dashboard"
                      className="font-bold text-blue-500"
                    >
                      Click Here
                    </Link>
                  </div> */}

                  <div className="flex">
                    <h1 className="me-1">Do you have an account?</h1>
                    <Link to="/auth/login" className="font-bold text-blue-500">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* logo */}
        <div className="flex flex-col w-full justify-center items-center bg-orange-100 rounded-sm py-12">
          <img src="/auth/register.png" className="w-8/12 object-contain" />
          <img src="/Lakoe.png" className="w-3/12" />
        </div>
      </div>
    </div>
  );
}
