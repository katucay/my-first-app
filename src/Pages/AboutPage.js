import '../App.css';

function About() {
  return (
    <div>

      {/* Content Sections */}
      <section className="content">
        <h2>What I Love About Flower Photography</h2>
        <p>
          Flower photography allows me to capture the beauty of nature in its simplest form.
          I love focusing on the colors, patterns, and small details of flowers that are often unnoticed.
          Taking pictures of flowers also helps me relax and appreciate the beauty around me.
        </p>

        <div className="preview-images">
          <img src="/assets/cosmos.jpg" alt="" />
          <img src="/assets/red1.jpg" alt="" />
          <img src="/assets/blue.jpg" alt="" />
          <img src="/assets/laurel.jpg" alt="" />
        </div>
      </section>

      <section className="content">
        <h2>My Journey with Flower Photography</h2>
        <p>
          My journey with flower photography started as a simple interest and slowly became a passion.
          Over time, I learned how to use lighting, angles, and focus to improve my photos.
          Each picture I take reflects my growth and love for nature.
        </p>

        <ol>
          <li>Discovered my interest in taking photos of flowers</li>
          <li>Started practicing photography</li>
          <li>Learned lighting and angles</li>
          <li>Improved through practice</li>
          <li>Created this portfolio</li>
        </ol>

        <div className="preview-images">
          <img src="/assets/bgnvla.jpg" alt="" />
          <img src="/assets/w1.jpg" alt="" />
          <img src="/assets/y2.jpg" alt="" />
          <img src="/assets/purple.jpg" alt="" />
        </div>
      </section>

      <blockquote>
        <h3>
          “Flowers are the music of the ground. From earth's lips spoken without sound.”
        </h3>
      </blockquote>

      <footer>
        <p>Contact: tucaykat@gmail.com</p>
        <p>&copy; 2026 My Portfolio. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default About;