import React from 'react';

interface IProps {
  loading: boolean;
}

const Loading = (props: IProps): JSX.Element => {
  if (props.loading) {
    return (
      <tr>
        <td colSpan={8}>...loading</td>
      </tr>
    );
  } else {
    return <></>;
  }
};
export default Loading;
