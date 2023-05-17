import { FC, MouseEvent, useState } from 'react';

import { Task } from '../App';
import { Modal, ProgressBar, TickIcon } from './';

interface Props {
  task: Task;
  getData: () => Promise<void>;
}

export const ListItem: FC<Props> = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/${task?.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        console.log('Worked');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="list_item">
      <div className="info_container">
        <TickIcon />
        <p className="task_title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button_container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode="edit"
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};
