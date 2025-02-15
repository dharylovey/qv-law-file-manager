'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fileSchema } from '@/zodSchema';
import { IFileSchema, IFileSchemaWithId } from '@/types';
interface FileSchemaProps {
  onSubmit: (data: IFileSchemaWithId) => void;
  initialData?: IFileSchemaWithId | null;
}

export default function MyForm({ onSubmit, initialData }: FileSchemaProps) {
  const form = useForm<IFileSchema>({
    resolver: zodResolver(fileSchema),
    defaultValues: initialData
      ? initialData
      : {
          name: '',
          lastName: '',
          fileNumber: '',
          title: '',
        },
  });

  function handleSubmit(values: IFileSchema) {
    try {
      onSubmit(values as IFileSchemaWithId);
      form.reset();
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="fileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Number</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="File Title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
      </form>
    </Form>
  );
}
