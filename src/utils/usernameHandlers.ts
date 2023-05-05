// utils/usernameHandlers.ts
export const handleUsernameChange = (
  text: string,
  setUsername: (username: string) => void,
  setHasValidUsername: (isValid: boolean) => void,
  setUsernameStatus: (status: string) => void,
  setTypingTimeout: (timeout: NodeJS.Timeout | null) => void,
  typingTimeout: NodeJS.Timeout | null,
) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  const newUsername = text.startsWith('@') ? text : '@' + text;
  setUsername(newUsername);

  if (newUsername.length <= 1) {
    setUsernameStatus('');
    setHasValidUsername(false);
  } else if (newUsername.length < 5) {
    setUsernameStatus('usernameTooShort');
    setHasValidUsername(false);
  } else {
    setUsernameStatus('valid');
    setHasValidUsername(true);

    const timeout = setTimeout(() => {
      setUsernameStatus('valid');
    }, 1000);

    setTypingTimeout(timeout);
  }
};
