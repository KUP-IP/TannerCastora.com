'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';

interface Book {
  id: number;
  title: string;
  tagline: string;
  description: string;
  coverPath: string;
  amazonUrl: string;
  hardcoverStripeUrl?: string | null;
  softcoverStripeUrl?: string | null;
  noteText?: string | null;
  secondaryNoteText?: string | null;
}

interface Author {
  id: number;
  name: string;
  bioShort: string;
  bioFull: string;
  photoPath: string;
}

interface SocialLink {
  id: number;
  label: string;
  url: string;
  icon: string | null;
  order: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'book' | 'author' | 'social'>('book');
  const [book, setBook] = useState<Book | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  // const router = useRouter(); // not used

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookRes, authorRes, socialRes] = await Promise.all([
        fetch('/api/admin/book'),
        fetch('/api/admin/author'),
        fetch('/api/admin/social'),
      ]);

      if (bookRes.ok) setBook(await bookRes.json());
      if (authorRes.ok) setAuthor(await authorRes.json());
      if (socialRes.ok) setSocialLinks(await socialRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/book', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        setMessage('Book details updated successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Error updating book details');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/author', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });

      if (res.ok) {
        setMessage('Author details updated successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Error updating author details');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'book' | 'author' | 'asset', key?: string) => {
    setIsUploading(true);
    setMessage('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      if (key) formData.append('key', key);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        
        if (type === 'book' && book) {
          setBook({ ...book, coverPath: url });
        } else if (type === 'author' && author) {
          setAuthor({ ...author, photoPath: url });
        }
        
        setMessage(`Image uploaded successfully`);
        setTimeout(() => setMessage(''), 3000);
        await fetchData(); // Refresh data
      } else {
        setMessage('Error uploading image');
      }
    } catch {
      setMessage('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSocialAdd = async () => {
    const newLink = {
      label: 'New Link',
      url: 'https://example.com',
      icon: 'link',
      order: socialLinks.length,
    };

    try {
      const res = await fetch('/api/admin/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLink),
      });

      if (res.ok) {
        const created = await res.json();
        setSocialLinks([...socialLinks, created]);
      }
    } catch {
      setMessage('Error adding social link');
    }
  };

  const handleSocialUpdate = (id: number, updates: Partial<SocialLink>) => {
    // Update local state immediately for responsive UI
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const handleSocialSave = async (id: number) => {
    const link = socialLinks.find(l => l.id === id);
    if (!link) return;
    
    try {
      const res = await fetch(`/api/admin/social/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: link.label,
          url: link.url,
          icon: link.icon,
        }),
      });

      if (res.ok) {
        setMessage('Social link updated successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Error updating social link');
    }
  };

  const handleSocialDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;

    try {
      const res = await fetch(`/api/admin/social/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSocialLinks(socialLinks.filter(link => link.id !== id));
      }
    } catch {
      setMessage('Error deleting social link');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSocialReorder = async (dragIndex: number, dropIndex: number) => {
    const reordered = [...socialLinks];
    const [removed] = reordered.splice(dragIndex, 1);
    if (removed) {
      reordered.splice(dropIndex, 0, removed);
    }
    
    const updated = reordered.map((link, index) => ({
      ...link,
      order: index,
    }));
    
    setSocialLinks(updated);
    
    try {
      await fetch('/api/admin/social/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated.map(link => ({ id: link.id, order: link.order }))),
      });
    } catch {
      setMessage('Error reordering social links');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded">
            {message}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('book')}
                className={`py-2 px-6 ${
                  activeTab === 'book'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Book Details
              </button>
              <button
                onClick={() => setActiveTab('author')}
                className={`py-2 px-6 ${
                  activeTab === 'author'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Author Details
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`py-2 px-6 ${
                  activeTab === 'social'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Social Links
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'book' && book && (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={book.title}
                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Book Summary</label>
                  <textarea
                    value={book.tagline}
                    onChange={(e) => setBook({ ...book, tagline: e.target.value })}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This compelling summary appears on the homepage to drive reader interest</p>
                </div>
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Purchase Links</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hardcover Stripe URL</label>
                    <input
                      type="url"
                      value={book.hardcoverStripeUrl || ''}
                      onChange={(e) => setBook({ ...book, hardcoverStripeUrl: e.target.value })}
                      placeholder="https://buy.stripe.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to hide hardcover button</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Softcover Stripe URL</label>
                    <input
                      type="url"
                      value={book.softcoverStripeUrl || ''}
                      onChange={(e) => setBook({ ...book, softcoverStripeUrl: e.target.value })}
                      placeholder="https://buy.stripe.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to hide softcover button</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amazon URL</label>
                    <input
                      type="url"
                      value={book.amazonUrl}
                      onChange={(e) => setBook({ ...book, amazonUrl: e.target.value })}
                      placeholder="https://www.amazon.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to hide Amazon button (appears last, styled in black)</p>
                  </div>
                </div>
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notes</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Note Text</label>
                    <input
                      type="text"
                      value={book.noteText || ''}
                      onChange={(e) => setBook({ ...book, noteText: e.target.value })}
                      placeholder="Optional note to display below purchase buttons (e.g., 🚚 Pre-order for first shipment...)"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to hide. Appears with yellow background badge.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Secondary Note Text</label>
                    <input
                      type="text"
                      value={book.secondaryNoteText || ''}
                      onChange={(e) => setBook({ ...book, secondaryNoteText: e.target.value })}
                      placeholder="Optional subtle note (e.g., Free shipping on orders over $35)"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to hide. Appears below primary note with blue text, no background.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Book Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'book');
                    }}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {book.coverPath && (
                    <p className="mt-2 text-sm text-gray-500">Current: {book.coverPath}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}

            {activeTab === 'author' && author && (
              <form onSubmit={handleAuthorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    value={author.name}
                    onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Bio</label>
                  <textarea
                    value={author.bioShort}
                    onChange={(e) => setAuthor({ ...author, bioShort: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Bio</label>
                  <textarea
                    value={author.bioFull}
                    onChange={(e) => setAuthor({ ...author, bioFull: e.target.value })}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'author');
                    }}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {author.photoPath && (
                    <p className="mt-2 text-sm text-gray-500">Current: {author.photoPath}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium dark:text-gray-200">Social Links</h3>
                  <button
                    onClick={handleSocialAdd}
                    disabled={socialLinks.length >= 6}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Add Link
                  </button>
                </div>
                {socialLinks.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No social links added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {socialLinks.sort((a, b) => a.order - b.order).map((link) => (
                      <div key={link.id} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleSocialUpdate(link.id, { label: e.target.value })}
                          placeholder="Label"
                          className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleSocialUpdate(link.id, { url: e.target.value })}
                          placeholder="URL"
                          className="flex-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
                        />
                        <select
                          value={link.icon || 'link'}
                          onChange={(e) => handleSocialUpdate(link.id, { icon: e.target.value })}
                          className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
                        >
                          <option value="x">X</option>
                          <option value="youtube">YouTube</option>
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="threads">Threads</option>
                          <option value="rss">RSS</option>
                          <option value="link">Link</option>
                        </select>
                        <button
                          onClick={() => handleSocialSave(link.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleSocialDelete(link.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}