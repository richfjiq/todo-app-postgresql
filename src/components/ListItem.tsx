import { FC, useState } from 'react';

import { Task } from '../App';
import { Modal, ProgressBar, TickIcon } from './';

interface Props {
  task: Task;
  getData: () => Promise<void>;
}

export const ListItem: FC<Props> = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className="list_item">
      <div className="info_container">
        <TickIcon />
        <p className="task_title">{task.title}</p>
        {/* <ProgressBar /> */}
      </div>
      <div className="button_container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete">DELETE</button>
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
