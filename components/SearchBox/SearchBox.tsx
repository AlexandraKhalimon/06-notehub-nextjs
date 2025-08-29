import css from './SearchBox.module.css';

interface SearchBoxProps {
    text: string;
    onSearch: (query: string) => void;
}

export default function SearchBox({text, onSearch}: SearchBoxProps) {
    
    
    return (
        <input
            className={css.input}
            type="text"
            defaultValue={text}
            onChange={(event)=> onSearch(event.target.value)}
            placeholder="Search notes"
        />
    );
}