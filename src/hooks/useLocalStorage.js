// local storage will be the custom hook (stands like in react user can create its own )created by a user for making custom operations
// here for storing data
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {

    const [value , setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : initialValue;

        } catch {
            return initialValue;
        }
    });

    function updateValue(newValue) {
        setValue((previousValue) => {
            
        const nextValue = typeof newValue === 'function' ? newValue(previousValue) : newValue;

        try {
            locaklStorage.setItem(key, JSON.stringify(nextValue));
        }catch (error) {
            console.error('Profile is not getting saved', error);
        }
        return nextValue;
    });

}
return [value, updateValue];
}

// here returning an aaray containing the curremt value and an update functipon , that allows to use custom hook

