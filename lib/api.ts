import type { Note, NewNote } from "../types/note";
import axios from "axios";

interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

interface FetchNotesParams{
    search: string;
    page: number;
    perPage: number;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export const fetchNotes = async ({search, page, perPage = 12}:FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes', {
        params: {
            search,
            page,
            perPage
        }
    });
    return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newNote);
    return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export const fetchNoteById = async (noteId: string) => {
    const response = await axios.get<Note>(`notes/${noteId}`);
    return response.data;
}