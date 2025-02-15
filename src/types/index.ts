import { Icons } from '@/components/icons';
import { fileSchema, fileType, loginSchema, registerSchema } from '@/zodSchema';
import { z } from 'zod';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export type ILoginSchema = z.infer<typeof loginSchema>;
export type IRegisterSchema = z.infer<typeof registerSchema>;
export type IFileSchema = z.infer<typeof fileSchema>;
export type IFileSchemaWithId = z.infer<typeof fileType>;
