import React, { useState } from 'react';

const SignatureUpload = () => {
  const [signature, setSignature] = useState(null);
  const [signatureError, setSignatureError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setSignatureError('Invalid file type. Accepted types are: image/png, image/jpeg');
        return;
      }

      // Validate file size (1MB limit)
      if (file.size > 1 * 1024 * 1024) {
        setSignatureError('File size exceeds the 1MB limit.');
        return;
      }

      // Clear error and set image
      setSignatureError('');
      setSignature(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label htmlFor="signature">Upload Signature:</label>
      <input
        type="file"
        id="signature"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      {signatureError && <p>{signatureError}</p>}
      {signature && <img src={signature} alt="Signature" style={{ width: '100px', height: '50px' }} />}
    </div>
  );
};

export default SignatureUpload;
