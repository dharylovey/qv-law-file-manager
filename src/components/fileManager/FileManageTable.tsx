'use client';

import { useState } from 'react';
import { createColumns } from './column';
import { DataTable } from './data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IFileSchemaWithId } from '@/types';
import MyForm from './form';

const initialData: IFileSchemaWithId[] = [
  {
    id: '1',
    fileNumber: 'F001',
    title: 'Deed of Sale',
    name: 'Dharyl',
    lastName: 'Almora',
  },
];

export default function FileManageTable() {
  const [data, setData] = useState<IFileSchemaWithId[]>(initialData);
  const [editingUser, setEditingUser] = useState<IFileSchemaWithId | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = createColumns();

  const handleCreate = (newRecord: Omit<IFileSchemaWithId, 'id'>) => {
    const record = { ...newRecord, id: String(data.length + 1) };
    setData([...data, record]);
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUser: IFileSchemaWithId) => {
    setData(data.map((record) => (record.id === updatedUser.id ? updatedUser : record)));
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((record) => record.id !== id));
  };

  const handlemultiDelete = (users: IFileSchemaWithId[]) => {
    const userIds = new Set(users.map((record) => record.id));
    setData(data.filter((record) => !userIds.has(record.id)));
  };

  const handleEdit = (record: IFileSchemaWithId) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  return (
    <div className="container mx-auto py-10">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit' : 'Create New'}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to{' '}
              {editingUser ? 'update the data' : 'create a new data'}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <MyForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns}
        data={data}
        onAdd={openCreateDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onmultiDelete={handlemultiDelete}
      />
    </div>
  );
}
