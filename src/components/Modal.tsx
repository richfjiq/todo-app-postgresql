import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Task } from '../App';

interface Props {
  mode: string;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  task?: Task;
  getData: () => Promise<void>;
}

export const Modal: FC<Props> = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode !== 'create' ? true : false;
  const [data, setData] = useState<Task>({
    user_email: editMode && task ? task.user_email : 'richard@test.com',
    title: editMode && task ? task?.title : '',
    progress: editMode && task ? task.progress : '50',
    date: editMode ? '' : new Date(),
  });

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log({ response });
      if (response.status === 200) {
        console.log('Worked');
        setShowModal(false);
      }
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // const editData

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
        <form onSubmit={(e) => postData(e)}>
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
            onClick={editMode ? () => console.log('first') : postData}
          />
        </form>
      </div>
    </div>
  );
};
