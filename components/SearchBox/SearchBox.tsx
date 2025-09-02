import css from './SearchBox.module.css';

interface SearchBoxProps {
    value: string;
    onSearch: (query: string) => void;
}

export default function SearchBox({value, onSearch}: SearchBoxProps) {
    
    
    return (
        <input
            className={css.input}
            type="text"
            defaultValue={value}
            onChange={(event)=> onSearch(event.target.value)}
            placeholder="Search notes"
        />
    );
}