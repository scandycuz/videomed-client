import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Form from 'components/core/Form';
import TextArea from 'components/core/TextArea';
import Button from 'components/core/Button';

export function MessageForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode == 13) {
      e.preventDefault();

      if (e.shiftKey) {
        setValue((current) => current + '\n');
      } else {
        handleSubmit(e);
      }
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) return;

    setValue('');

    onSubmit({ body: value });
  }

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <TextArea
          name="message"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          autoFocus
        />

        <Box
          marginTop="1rem"
          justify="row"
          align="center"
        >
          <Button type="submit">
            Send
          </Button>
        </Box>
      </Form>
    </Box>
  )
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default MessageForm;
