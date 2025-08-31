import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';


export default async function Notes() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes',{ search: "", page: 1, perPage: 12 }],
        queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12 })
    })
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
        
    );
};