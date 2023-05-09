import { FC } from 'react';

import { Task } from '../App';
import { ProgressBar, TickIcon } from './';

interface Props {
  task: Task;
}

export const ListItem: FC<Props> = ({ task }) => {
  return (
    <div className="list_item">
      <div className="info_container">
        <TickIcon />
        <p className="task_title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="button_container">
        <button className="edit">EDIT</button>
        <button className="delete">DELETE</button>
      </div>
    </div>
  );
};
