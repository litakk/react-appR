import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.log("Ошибка загрузки данных", err));

    console.count("useEffect");
  }, []);

  const modalOpen = (user) => {
    setModal(true);
    setSelectedUser(user);
  };

  const modalClose = () => {
    setModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="container">
        {modal && (
          <div className="modal-container">
            <div className="modal">
              <div className="modal-content">
                <h1>👤 {selectedUser?.name}</h1>
                <h1>🆔 {selectedUser?.username}</h1>
                <h1>📧 {selectedUser?.email}</h1>
                <p>📞 {selectedUser.phone}</p>
                <span onClick={() => modalClose()} className="close-btn">
                  &times;
                </span>
              </div>
            </div>
          </div>
        )}

        {users.map((user) => (
          <div
            className="profile-container"
            key={user.id}
            onClick={() => modalOpen(user)}
          >
            <h1>👤 {user.name}</h1>
            <h1>🆔 {user.username}</h1>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
