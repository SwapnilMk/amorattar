'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Review,
  CreateReviewInput,
  UpdateReviewInput
} from '@/types/review.types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { toast } from 'sonner';
import { FaTrash, FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSession } from '@/components/providers/SessionProvider';
import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const router = useRouter();
  const { user } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<UpdateReviewInput>({
    name: '',
    rating: 0,
    content: ''
  });
  const [addForm, setAddForm] = useState<CreateReviewInput>({
    name: '',
    rating: 0,
    content: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/sign-in');
      return;
    }
    fetchReviews();
  }, [router, user]);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/reviews');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error('Reviews data is not an array:', data);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to fetch reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete review');

      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setEditForm({
      name: review.name,
      rating: review.rating,
      content: review.content
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    try {
      const response = await fetch(`/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Failed to update review');

      toast.success('Review updated successfully');
      setEditDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addForm)
      });

      if (!response.ok) throw new Error('Failed to create review');

      toast.success('Review created successfully');
      setAddDialogOpen(false);
      setAddForm({ name: '', rating: 0, content: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error('Failed to create review');
    }
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Manage Reviews</h1>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <Button onClick={() => setAddDialogOpen(true)}>
              <FaPlus className='mr-2 h-4 w-4' />
              Add Review
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Review</DialogTitle>
                <DialogDescription>
                  Create a new customer review
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAdd} className='space-y-4'>
                <div>
                  <Label htmlFor='add-name'>Name</Label>
                  <Input
                    id='add-name'
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='add-rating'>Rating</Label>
                  <Input
                    id='add-rating'
                    type='number'
                    min='1'
                    max='5'
                    step='0.5'
                    value={addForm.rating}
                    onChange={(e) =>
                      setAddForm({
                        ...addForm,
                        rating: parseFloat(e.target.value)
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='add-content'>Content</Label>
                  <Textarea
                    id='add-content'
                    value={addForm.content}
                    onChange={(e) =>
                      setAddForm({ ...addForm, content: e.target.value })
                    }
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type='submit'>Add Review</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <FaSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search reviews...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading reviews...</div>
            ) : error ? (
              <div className='text-red-500'>{error}</div>
            ) : filteredReviews.length === 0 ? (
              <div>No reviews found</div>
            ) : (
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[200px]'>Name</TableHead>
                      <TableHead className='w-[100px]'>Rating</TableHead>
                      <TableHead className='w-[300px]'>Content</TableHead>
                      <TableHead className='w-[120px]'>Date</TableHead>
                      <TableHead className='w-[100px] text-right'>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Avatar>
                              <AvatarFallback>
                                {review.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className='font-medium'>{review.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-1'>
                            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                            <span>{review.rating.toFixed(1)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className='line-clamp-2'>{review.content}</p>
                        </TableCell>
                        <TableCell>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleEdit(review)}
                            >
                              <FaEdit className='h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleDelete(review.id)}
                            >
                              <FaTrash className='h-4 w-4' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
