import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './ProductGallery.module.css';

export function ProductGallery({ images, title, sentence, headingLevel = 'h2', headingId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const revealRef = useReveal();
  const active = images[activeIndex] ?? images[0];
  const Heading = headingLevel;

  if (!active) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <img key={active.src} className={styles.mainImage} src={active.src} alt={active.alt} />
      </div>

      <div className={styles.side} ref={revealRef}>
        {title && <Heading id={headingId} className={styles.title}>{title}</Heading>}
        {sentence && <p className={styles.sentence}>{sentence}</p>}
        <ul className={styles.thumbs}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                className={styles.thumb}
                aria-pressed={index === activeIndex}
                aria-label={`Ver: ${image.alt}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={image.src} alt="" />
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.caption}>{active.alt}</p>
      </div>
    </div>
  );
}
