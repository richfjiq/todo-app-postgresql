import { FC } from 'react';

interface Props {
  progress: string;
}

export const ProgressBar: FC<Props> = ({ progress }) => {
  const colors = [
    'rgb(255, 214,161)',
    'rgb(255, 175, 163)',
    'rgb(108, 115, 148)',
    'rgb(141, 181, 145)',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="outer_bar">
      <div
        className="inner_bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};
