// && The useContext hook in React lets you use values from a Context directly inside your functional component — without having to manually wrap or pass props deeply.

//* step one 
        import { createContext } from 'react';

        const ThemeContext = createContext('light');  

// * wrap your app with a provider 

        <ThemeContext.Provider value="dark">
        <MyComponent />
        </ThemeContext.Provider>

// * inside MyComponent , you can use useContext to get the value

        import { useContext } from 'react';

        function MyComponent() {
        const theme = useContext(ThemeContext);  

        return <div>The current theme is {theme}</div>;
        }
