import React, { useContext, useState } from "react";
import { AddTemplatePesan } from "@/components/AddTemplatePesan";
import { TemplateCard } from "@/components/TemplateCard";
import { TemplatePesan } from "@/datas/type";
import { TemplateContext } from "@/context/TemplateContext";
import { UpdateTemplate } from "@/components/EditTemplateDialog";


interface DialogProps {
  onSave: (templates: TemplatePesan[]) => void
}


export const CardTemplate: React.FC<DialogProps> = ({ onSave }) => {
  const context = useContext(TemplateContext)
  const [editingTemplate, seteditingTamplate] = useState<TemplatePesan | null>(null);

  if (!context) {
    return null
  }

  const { templates, setTemplates } = context;

  const handleAddTemplate = (template: TemplatePesan) => {
    setTemplates([...templates, template])
  }

  const handleEditTemplate = (updatedTemplate: TemplatePesan) => {
    const updatedTemplates = templates.map((template) => template.id === updatedTemplate.id ? updatedTemplate : template);
    setTemplates(updatedTemplates)
    onSave(updatedTemplates)
    seteditingTamplate(null)
  }

  const handleDeleteTemplate = (id: number) => {
    const updatedTemplates = templates.filter((template) => template.id !== id)
    setTemplates(updatedTemplates)
    onSave(updatedTemplates)
  }

  return (
    <>
      <AddTemplatePesan onSave={handleAddTemplate} />
      {templates?.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onDelete={handleDeleteTemplate}
          onEdit={(template) => seteditingTamplate(template)}
        />
      ))}
      {editingTemplate && (
        <UpdateTemplate
          template={editingTemplate}
          onUpdate={handleEditTemplate}
        />
      )}
    </>
  )
}