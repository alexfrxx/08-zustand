import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Filtered by ${slug}`,
    description: `Filtered notes by ${slug}`,
    openGraph: {
      title: `Filtered by ${slug}`,
      description: `Filtered notes by ${slug}`,
      url: 'https://notehub.com/notes/filter/slug',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Filtered by ${slug}`
        }
      ]
    }
  };
}

async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => {
      return fetchNotes({
        search: '',
        page: 1,
        perPage: 12,
        tag
      });
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;
