import { FC } from 'react';

interface Props {
  listName: string;
}

export const ListHeader: FC<Props> = ({ listName }) => {
  const signout = () => {
    console.log('signout');
  };
  return (
    <div className="list_header">
      <h1>{listName}</h1>
      <div className="button_container">
        <button className="create">ADD NEW</button>
        <button className="signout" onClick={signout}>
          SIGN OUT
        </button>
      </div>
    </div>
  );
};
