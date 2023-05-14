import { useEffect, useState } from 'react';

import { ListHeader, ListItem } from './components';

export interface Task {
  date: string | Date;
  id?: string;
  progress: string;
  title: string;
  user_email: string;
}

const App = () => {
  const userEmail = 'richard@test.com';
  const [tasks, setTasks] = useState<Task[]>();

  console.log({ tasks });

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
    getData();
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="app">
      <ListHeader listName={'Holiday tick list'} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
