import React from 'react';

const About = () => {
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '10px',
      color: '#7CB9E8',
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      color: '#F0F8FF',
    },
    featuresList: {
      marginTop: '15px',
      paddingLeft: '20px',
      color: '#E6E6FA'
    },
    featureItem: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About USOF App</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>USOF</strong>, the Ultimate Stack Overflow Forum! Our platform is designed to bring users together to ask questions, share knowledge, and connect with like-minded individuals. 
        Whether you're a developer seeking answers, a professional sharing your expertise, or simply exploring new technologies, our platform has something for everyone.
      </p>
      <p style={styles.paragraph}>
        Here's what you can do on USOF:
      </p>
      <ul style={styles.featuresList}>
        <li style={styles.featureItem}>🌟 <strong>Ask Questions</strong>: Post your technical questions and get answers from our active community.</li>
        <li style={styles.featureItem}>💬 <strong>Answer Questions</strong>: Share your expertise by answering others' questions.</li>
        <li style={styles.featureItem}>👍 <strong>Like and Comment</strong>: Engage with posts by liking and commenting on questions and answers.</li>
        <li style={styles.featureItem}>🔒 <strong>Admin Controls</strong>: Manage users, posts, and comments with advanced administrative features (admins only).</li>
        <li style={styles.featureItem}>📂 <strong>User Profiles</strong>: Customize your profile with an avatar and view your activity on the platform.</li>
        <li style={styles.featureItem}>🔍 <strong>Search and Filter</strong>: Easily find questions and answers using advanced search and filtering options.</li>
      </ul>
      <p style={styles.paragraph}>
        Join our growing community today and contribute to the world of knowledge sharing!
      </p>
    </div>
  );
};

export default About;
