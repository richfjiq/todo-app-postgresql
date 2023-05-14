import { FC, useState } from 'react';
import { Modal } from './';

interface Props {
  listName: string;
  getData: () => Promise<void>;
}

export const ListHeader: FC<Props> = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log('signout');
  };
  return (
    <div className="list_header">
      <h1>{listName}</h1>
      <div className="button_container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="sign_out" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode="create" setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};
