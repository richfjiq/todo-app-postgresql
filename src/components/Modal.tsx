import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Task } from '../App';

interface Props {
  mode: string;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  task?: Task;
  getData: () => Promise<void>;
}

export const Modal: FC<Props> = ({ mode, setShowModal, task, getData }) => {
  const [cookies] = useCookies(['Email', 'AuthToken']);
  const editMode = mode !== 'create' ? true : false;
  const [data, setData] = useState<Task>({
    user_email: editMode && task ? task.user_email : cookies.Email,
    title: editMode && task ? task?.title : '',
    progress: editMode && task ? task.progress : '50',
    date: editMode ? task?.date ?? '' : new Date(),
  });

  console.log({ editMode });

  const postData = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log('Worked');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/${task?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log({ data });
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form_title_container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            type="text"
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <br />
          <input
            className={mode}
            type="Submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};
