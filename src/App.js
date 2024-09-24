import React, { useState } from "react";

function App() {
  const [length, setLength] = useState(1);
  const [password, setPassword] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleLengthChange = (event) => {
    setLength(parseInt(event.target.value));
  };

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset.length === 0) {
      setPassword("Please select at least one character type.");
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center font-mono">
      <div>
        <div className="p-3 max-w-full w-[calc(100vw-10px)] md:w-[400px] min-h-[300px] bg-gray-900 border-[1px] border-gray-800">
          <h3 className="text-xl text-[#008000] mb-3">Password-Gen</h3>

          {/* Character lengths */}
          <div className="flex flex-col w-full">
            <label className="text-white">Character Length</label>
            <input
              type="range"
              className="w-full mt-1 accent-gray-600"
              max="50"
              min="1"
              value={length}
              onChange={handleLengthChange}
            />
            <p className="text-white mt-1">Length: {length}</p>
          </div>

          {/* Include uppercase */}
          <div className="flex flex-col items-start justify-start mt-3 gap-3">
            <div className="flex items-center gap-1 flex-row-reverse">
              <label className="text-white text-sm">Include Uppercase</label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
            </div>

            {/* Include lowercase */}
            <div className="flex items-center gap-1 flex-row-reverse">
              <label className="text-white text-sm">Include Lowercase</label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
            </div>

            {/* Include numbers */}
            <div className="flex items-center gap-1 flex-row-reverse">
              <label className="text-white text-sm">Include Numbers</label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
            </div>

            {/* Include symbols */}
            <div className="flex items-center gap-1 flex-row-reverse">
              <label className="text-white text-sm">Include Symbols</label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
            </div>

            {/* Generate password */}
            <button
              className="bg-[#008000] text-white text-sm p-2 mt-3 w-full"
              onClick={generatePassword}
            >
              Generate Password
            </button>

            {/* Password display */}
            <div className="w-full mt-3 p-2 bg-gray-800 text-white text-sm overflow-hidden">
              <p className="text-sm whitespace-pre-wrap">Your Password</p>
              <div className="w-full overflow-x-auto password">
                <p className="text-lg">{password}</p>
              </div>

              {/* Copy password */}
              <button
                className="bg-[#008000] text-white text-sm p-2 mt-3 w-full"
                onClick={copyToClipboard}
              >
                Copy Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
