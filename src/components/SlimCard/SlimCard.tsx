import './SlimCard.css';

import React from 'react';

type Props = {
  text: string;
};

const SlimCard = (props: Props) => {
  return <div className="slim-card">{props.text}</div>;
};

export default SlimCard;
