const generate2FA = () => {
  const numbers = "0123456789";
  let rand4DigitCode = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    rand4DigitCode += numbers.charAt(randomIndex);
  }
  return rand4DigitCode;
};

export default generate2FA;
