import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      setBooks(data.docs.slice(0, 20));
    } catch (error) {
      console.error("Błąd:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="main">
      <h1>Wyszukiwarka książek</h1>

      <input
        id="input"
        type="text"
        placeholder="Wpisz nazwę"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchBooks}>Wyszukaj</button>

      {loading && <p>Ładowanie...</p>}

      {books.map((book) => (
        <div key={book.key} id="div2">
          <h3>{book.title}</h3>

          <p>
            Autor: {book.author_name?.join(", ") || "brak"}
          </p>

          <p>
            Rok: {book.first_publish_year || "brak"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;