import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p>This is a simple blog viewer built with React, TypeScript, and CSS. It fetches posts from an external API and allows navigation between pages using React Router.</p>
      <Link to="/" className="back-link">Go back</Link>
    </div>
  );
};

export default About;
