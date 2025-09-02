"use client"

import css from './page.module.css';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';


export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () => fetchNotes({ search: debouncedSearchQuery, page: currentPage, perPage: 12 }),
    placeholderData: keepPreviousData,
    refetchOnMount: false
  })

  const totalPages = data?.totalPages || 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={ searchQuery } onSearch={handleChange}/>
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
        <button className={css.button} onClick={openModal}>Create note +</button>
        {isModalOpen && <Modal onClose={closeModal}><NoteForm onClose={closeModal}/></Modal>}
      </header>
      {data && data?.notes.length > 0 && <NoteList notes={data.notes}/>}
    </div>
  )
};