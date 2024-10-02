import React from "react";
import { Button, buttonVariants } from "@/components/button";
import { TemplatePesan } from "@/datas/type";
import { UpdateTemplate } from "./EditTemplateDialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface TemplateCardProps {
  template: TemplatePesan;
  onDelete: (id: number) => void;
  onEdit: (template: TemplatePesan) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onDelete,
  onEdit,
}) => {
  const { judulPesan, daftarIsiPesan } = template;

  return (
    <div className="border rounded p-5 flex justify-between bg-slate-50 items-start border-neutral-300 m-3">
      <div className="flex-col w-screen">
        <p className="font-bold text-2xl">
          <strong>{judulPesan} </strong>
        </p>
        <p className="mt-10">{daftarIsiPesan}</p>
      </div>
      <div className="flex">
        <div className="w-32">
          <UpdateTemplate
            template={template}
            onUpdate={() => onEdit(template)}
            // onSave={handleSave}

            // variant="ghost"
          />
        </div>
        <div className="mt-3">
          <Dialog>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Location</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete Template data ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline">No</Button>
                </DialogClose>
                <Button
                  className={buttonVariants({ variant: "custom" })}
                  onClick={() => onDelete(template.id)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogTrigger asChild>
              <Button className={buttonVariants({ variant: "custom" })}>
                Delete
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
