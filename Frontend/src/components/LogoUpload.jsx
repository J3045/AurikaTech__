// import React, { useState } from 'react';

// const LogoUpload = ({ onLogoChange }) => {
//   const [logo, setLogo] = useState(null);
//   const [logoError, setLogoError] = useState('');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!['image/png', 'image/jpeg'].includes(file.type)) {
//         setLogoError('Invalid file type. Accepted types are: image/png, image/jpeg');
//         return;
//       }

//       // Validate file size (2MB limit)
//       if (file.size > 2 * 1024 * 1024) {
//         setLogoError('File size exceeds the 2MB limit.');
//         return;
//       }

//       // Clear error and set image
//       setLogoError('');
//       const logoURL = URL.createObjectURL(file);
//       setLogo(logoURL);
//       onLogoChange(logoURL);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="logo">Upload Logo:</label>
//       <input
//         type="file"
//         id="logo"
//         accept="image/png, image/jpeg"
//         onChange={handleFileChange}
//       />
//       {logoError && <p>{logoError}</p>}
//       {logo && <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />}
//     </div>
//   );
// };

// export default LogoUpload;
