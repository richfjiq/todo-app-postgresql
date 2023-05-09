import { ChangeEvent, FC, useState } from 'react';

import { Task } from '../App';

interface Props {
  mode: string;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
}

export const Modal: FC<Props> = ({ mode, setShowModal }) => {
  const editMode = mode !== 'create' ? true : false;
  const [data, setData] = useState<Task>({
    user_email: '',
    title: '',
    progress: '',
    date: editMode ? '' : new Date(),
  });

  console.log(new Date());

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
          <input className={mode} type="submit" />
        </form>
      </div>
    </div>
  );
};
