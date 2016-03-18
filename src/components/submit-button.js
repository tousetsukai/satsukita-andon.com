import React from 'react';

export default class SubmitButton extends React.Component {

  state = {
    loading: false,
    success: false,
    error: true,
  };

  handleSubmit = () => {
    const { onSubmit, onSuccess, onError } = this.props;
    onSubmit().then(ok => {
      if (ok) {
        onSuccess();
      } else {
        onError();
      }
    });
  };

  render() {
  }
}
