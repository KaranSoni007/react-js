import axios from "axios";
import { useEffect, useState } from "react";

function Api() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/users");
        setUsers(res.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.firstName.localeCompare(b.firstName);
    }

    return b.firstName.localeCompare(a.firstName);
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users List</h1>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
        >
          {sortOrder === "asc" ? "A to Z" : "Z to A"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 w-fit">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-6 py-3">First Name</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-6 py-3">{user.firstName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Api;
