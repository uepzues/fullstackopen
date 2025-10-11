import useNotificationStore from "../notificationStore";
import { useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Notification = () => {
  const { error, info, setInfo } = useNotificationStore();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      console.log("BOOK ADDED subscription", addedBook);
      
      if (!addedBook) return;

      setInfo(`${addedBook.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, (cached) => {
        if (!cached) return { allBooks: [addedBook] };
        if (cached.allBooks.some((b) => b.id === addedBook.id)) {
          return cached;
        }
        return { allBooks: cached.allBooks.concat(addedBook) };
      });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return (
    <div>
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      {info && (
        <div>
          <h2>{info}</h2>
        </div>
      )}
    </div>
  );
};

export default Notification;
