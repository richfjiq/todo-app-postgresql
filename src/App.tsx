import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Auth, ListHeader, ListItem } from './components';

export interface Task {
  date: string | Date;
  id?: string;
  progress: string;
  title: string;
  user_email: string;
}

const App = () => {
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const [tasks, setTasks] = useState<Task[]>();
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="app">
      {authToken ? (
        <>
          <ListHeader listName={'Holiday tick list'} getData={getData} />
          <p className="user_email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
