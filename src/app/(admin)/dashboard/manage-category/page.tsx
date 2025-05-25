"use client";
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { IconPlus, IconEdit, IconTrash, IconSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export default function ManageCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
    setLoading(false);
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });
      if (res.ok) {
        setIsAddDialogOpen(false);
        setNewCategoryName('');
        fetchCategories();
      } else {
        setError('Failed to add category');
      }
    } catch {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    try {
      const res = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editCategoryName })
      });
      if (res.ok) {
        setIsEditDialogOpen(false);
        setSelectedCategory(null);
        setEditCategoryName('');
        fetchCategories();
      } else {
        setError('Failed to edit category');
      }
    } catch {
      setError('Failed to edit category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      } else {
        setError('Failed to delete category');
      }
    } catch {
      setError('Failed to delete category');
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Manage Categories</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <IconPlus className='mr-2 h-4 w-4' />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCategory}>
                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='categoryName'>Category Name</Label>
                    <Input
                      id='categoryName'
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder='Enter category name'
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit'>Add Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <IconSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search categories...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className='text-red-500'>{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.products?.length ?? 0}</TableCell>
                      <TableCell>
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <div className='flex justify-end gap-2'>
                          <Dialog
                            open={
                              isEditDialogOpen &&
                              selectedCategory?.id === category.id
                            }
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setSelectedCategory(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setEditCategoryName(category.name);
                                }}
                              >
                                <IconEdit className='h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogDescription>
                                  Modify category details
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleEditCategory}>
                                <div className='space-y-4 py-4'>
                                  <div className='space-y-2'>
                                    <Label htmlFor='editCategoryName'>
                                      Category Name
                                    </Label>
                                    <Input
                                      id='editCategoryName'
                                      value={editCategoryName}
                                      onChange={(e) =>
                                        setEditCategoryName(e.target.value)
                                      }
                                      placeholder='Enter category name'
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type='submit'>Save Changes</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <IconTrash className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
