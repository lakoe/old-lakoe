"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/form";
import { Input } from "../../components/input";
import { Button } from "../../components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { IoSettingsOutline } from "react-icons/io5";
import { Textarea } from "../../components/textarea";

const formSchema = z.object({
  nama_produk: z.string({ message: "Nama produk tidak boleh kosong" }).max(50),
  url_halaman_form: z.string({ message: "Url harus diisi" }).min(2).max(50),
  deskripsi_produk: z.string({ message: "Deskripsi harus diisi" }).max(3000),
});

export function ProductForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_produk: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama_produk"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="font-normal mt-2">Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Masukan nama produk" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function URLHalamanCheckoutForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url_halaman_form: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url_halaman_form"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="font-normal">
                URL Halaman Checkout
              </FormLabel>
              <FormControl>
                <div className="flex justify-center items-center">
                  <p className="bg-slate-100 p-3 rounded-s-lg border-2 text-xs">
                    lakoe.store/
                  </p>
                  <Input
                    placeholder="nama-produk"
                    {...field}
                    className="rounded-s-none rounded-e-xl"
                    required
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function PilihKategori(formSubmit: any) {
  return (
    <div className="mt-2">
      <Accordion type="single" className="border-none" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0">
            <IoSettingsOutline />
            Pengaturan
          </AccordionTrigger>
          <AccordionContent className="mt-2 p-0 ms-7">
            <Accordion type="single" className="border-none" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-0">
                  <IoSettingsOutline />
                  Pengaturan2
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <Button
                          type="button"
                          variant={"link"}
                          className="h-6"
                          {...formSubmit}
                          name="produk_kategori"
                          value={"test1"}
                        >
                          Test1
                        </Button>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <Button
                          type="button"
                          variant={"link"}
                          className="h-6"
                          name="produk_kategori"
                          value={"test2"}
                        >
                          Test2
                        </Button>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <Button
                          type="button"
                          variant={"link"}
                          className="h-6"
                          name="produk_kategori"
                          value={"test3"}
                        >
                          Test3
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" className="border-none" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-0">
                  <IoSettingsOutline />
                  Pengaturan2
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" className="border-none" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-0">
                  <IoSettingsOutline />
                  Pengaturan2
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test2</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
                <AccordionContent className="m-0 p-0 ms-7">
                  <Accordion type="single" className="border-none" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <IoSettingsOutline />
                        Pengaturan3
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                      <AccordionContent className="m-0 p-0 ms-7">
                        <h1>Test</h1>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function DeskripsiProduk() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deskripsi_produk: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Textarea {...form} name="deskripsi_produk" className="h-32" required />
    </>
  );
}
