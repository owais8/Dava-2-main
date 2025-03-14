import { useEffect, useRef, useState } from 'react';

import { SearchOutlined } from '@mui/icons-material';
import { Box, ClickAwayListener, Fade, IconButton, TextField } from '@mui/material';

export default function Search() {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (toggleSearchInput) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSearchInput]);

  useEffect(() => {
    const updateKeyword = () => {
      const currentValue = inputRef.current?.value || '';
      setKeyword(currentValue);

      if (currentValue.trim()) {
        setIsError(false);
      }
    };

    if (inputRef.current) {
      const input = inputRef.current;
      input.addEventListener('input', updateKeyword);

      return () => {
        input.removeEventListener('input', updateKeyword);
      };
    }
  }, []);

  const handleToggle = () => {
    setToggleSearchInput((prev) => {
      if (!prev) {
        // Focus the input when opening
        setTimeout(() => inputRef.current?.focus(), 0);
      }

      return !prev;
    });
    setIsError(false); // Clear error when toggling
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setToggleSearchInput(false);
      setTimeout(() => setKeyword(''), 1500);
    }

    if (event.key === 'Enter') {
      if (!toggleSearchInput) {
        setToggleSearchInput(true);
        setTimeout(() => inputRef.current?.focus(), 0);

        return;
      }

      const currentValue = inputRef.current?.value || '';

      if (!currentValue) {
        setIsError(true);
      } else {
        setKeyword(currentValue);
        setIsError(false);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);

    if (value.trim()) {
      setIsError(false); // Clear error when a valid value is typed
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setToggleSearchInput(false);
        setIsError(false);
      }}
    >
      <Box className="flex space-x-1 items-center">
        <IconButton
          disableTouchRipple
          onClick={handleToggle}
          aria-label="Search"
          className="cursor-pointer"
        >
          <SearchOutlined className="icon -ml-2" />
        </IconButton>

        <Fade in={toggleSearchInput} mountOnEnter unmountOnExit>
          <TextField
            inputRef={inputRef}
            size="small"
            name="keyword"
            placeholder="Enter keyword..."
            value={keyword}
            onChange={handleInputChange}
            className="w-[320px]"
            slotProps={{ input: { className: 'bg-white' } }}
            error={isError}
          />
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}
