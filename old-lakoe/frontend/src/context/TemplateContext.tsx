import { TemplatePesan } from '@/datas/type';
import React, { createContext, useState } from 'react';

interface TemplateContext {
    templates: TemplatePesan[];
    setTemplates: React.Dispatch<React.SetStateAction<TemplatePesan[]>>;
}

export const TemplateContext = createContext<TemplateContext | undefined>(undefined);

export const TemplateContextProvider: React.FC<({ children: React.ReactNode })> = ({ children }) => {
    const [templates, setTemplates] = useState<TemplatePesan[]>([]);

    return (
        <TemplateContext.Provider value={{ templates, setTemplates }}>
            {children}
        </TemplateContext.Provider >
    );
}

