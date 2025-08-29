// import css from './App.module.css';
// import type { Note } from '@/types/notes';
// import { fetchNotes } from '@/lib/api';
// import NoteList from '../NoteList/NoteList';
// import Pagination from '../Pagination/Pagination';
// import Modal from '../Modal/Modal';
// import NoteForm from '../NoteForm/NoteForm';
// import SearchBox from '../SearchBox/SearchBox';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { useDebounce } from 'use-debounce';
// import toast, { Toaster } from 'react-hot-toast';
// import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';


// export default function App() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

//   const { data, isSuccess, isLoading, isError } = useQuery({
//     queryKey: ['notes', currentPage, debouncedSearchQuery],
//     queryFn: () => fetchNotes({ search: debouncedSearchQuery, page: currentPage, perPage: 12 }),
//     placeholderData: keepPreviousData
//   })

//   useEffect(() => {
//     if (isSuccess) {
//       setNotes(data.notes);
//     }

//     if (data && data?.notes.length === 0) {
//       toast.error("Sorry, the notelist is empty!");
//       return;
//     }
//   }, [data, isSuccess]);


//   const totalPages = data?.totalPages || 0;

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleChange = (query: string) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };
  
//   return (
//     <div className={css.app}>
//       <Toaster position='top-center'/>
//       <header className={css.toolbar}>
//         <SearchBox text={ searchQuery } onSearch={handleChange}/>
//         {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
//         <button className={css.button} onClick={openModal}>Create note +</button>
//         {isModalOpen && <Modal onClose={closeModal} children={<NoteForm onClose={closeModal} onSuccess={closeModal}/>} />}
//       </header>
//       {isLoading && <Loader />}
//       {isError && <ErrorMessage/>}
//       {data && data?.notes.length > 0 && <NoteList notes={notes}/>}
//     </div>
//   )
// };