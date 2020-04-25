import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FiChevronDown, FiX } from 'react-icons/fi';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button/Base';
import List from 'components/core/List';
import Item from 'components/core/List/Item';

export function Menu({ theme, label, items }) {
  const [active, setActive] = useState(false);

  const outerRef = useRef();
  useOutsideClick(outerRef, () => setActive(false));

  function handleClick() {
    setActive((current) => !current);
  }

  return (
    <Box
      ref={outerRef}
      position="relative"
    >
      { label && (
        <Button onClick={handleClick}>
          <Box
            padding="0.25rem"
            direction="row"
            justify="flex-end"
            align="center"
          >
            <Typography size="1.075rem" color="black.light">
              { label }
            </Typography>

            <Box marginLeft="0.5rem">
              <FiChevronDown size="1.5rem" color={theme.black.main} />
            </Box>
          </Box>
        </Button>
      )}

      { items.length && active && (
        <Box
          background="white"
          position="absolute"
          boxShadow="rgba(0, 0, 0, 0.2) 0px 2px 4px"
          top="0"
          right="0"
        >
          <List>
            <Box
              align="flex-end"
              marginTop="0.2rem"
              padding="0.25rem"
            >
              <Button onClick={handleClick}>
                <FiX size="1.5rem" color={theme.black.main} />
              </Button>
            </Box>

            { items.map(({ label, action, icon }) => {
              return (
                <Button key={label} onClick={action}>
                  <Item>
                    <Box direction="row" align="center">
                      <Typography color={'black.light'}>
                        { label }
                      </Typography>

                      <Box marginLeft="0.75rem">
                        { icon }
                      </Box>
                    </Box>
                  </Item>
                </Button>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
}

Menu.propTypes = {
  theme: PropTypes.object.isRequired,
  label: PropTypes.string,
  items: PropTypes.array,
};

Menu.defaultProps = {
  items: [],
};

export default withTheme(Menu);

function useOutsideClick(ref, toggleActive) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleActive();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
