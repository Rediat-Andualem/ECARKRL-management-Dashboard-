"use client";

import styles from "./Video.module.css";
import { motion } from "framer-motion";
import youtubeIcon from "../../assets/youtubeicon.png"

function Videos() {
  const videos = [
    {
      name: "BET Machine Operation",
      link: "https://www.youtube.com/playlist?list=PLfsAq3WZadM6_ntUg5TQN15MVA7-ASKik",
      desc: "Step-by-step guide on operating the BET surface area analyzer",
    },
    {
      name: "FE-SEM sample preparation",
      link: "https://www.youtube.com/watch?v=VYzXucfpOcU&list=PLfsAq3WZadM76Ffs_CRZcDvgLaoz7jyEM&index=1&pp=gAQBiAQB",
      desc: "How to prepare sample for Gold plating and FE-SEM analysis",
    },
    {
      name: "NEWCHROM GC Operation Basics",
      link: "https://www.youtube.com/playlist?list=PLfsAq3WZadM4X7_hNRil5mG_CbS6bZgNg",
      desc: "GC starting and operation",
    },
    {
      name: "XPS",
      link: "https://www.youtube.com/watch?v=M8QPHIfPcr8&list=PLfsAq3WZadM6LM8z2h8X-XKGViNyX0xUz",
      desc: "xps data extraction and deconvolution",
    },
    {
      name: "TEM",
      link: "https://www.youtube.com/watch?v=LibS9wcHyik&list=PLfsAq3WZadM46IsbXy8DYJnNZmTsqz_1d",
      desc: "FFT and Reverse FFT plotting",
    },
    {
      name: "Origin related",
      link: "https://www.youtube.com/watch?v=PMH0HDgbXJY&list=PLfsAq3WZadM5COlj2UlrGBdOcYVBPnuRu",
      desc: "How to plot error bars, how to deconvolate, how to calculate crystallinity index from xrd",
    },
    {
      name: "XRD related",
      link: "https://www.youtube.com/watch?v=moE7-9HxV1A&list=PLfsAq3WZadM5rubdKPnQnU6bisIkf8ZRp",
      desc: "How draw simulated XRD plotting and others",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={styles.wrapper}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Equipment Operation Videos
        </motion.h1>

        <div className={styles.divider}></div>

        <p className={styles.intro}>
          Watch step-by-step video tutorials or playlists showing safe and effective equipment operation.
          Click on a card to open the video or playlist on YouTube.
        </p>

        <div className={styles.cardGrid}>
          {videos.map((v, i) => (
            <motion.a
              key={i}
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className={styles.videoPlaceholder}>
                <img
                  src={youtubeIcon}
                  alt="YouTube Icon"
                  className={styles.youtubeIcon}
                />
              </div>

              <div className={styles.videoContent}>
                <h3 className={styles.cardTitle}>{v.name}</h3>
                <p className={styles.cardDesc}>{v.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Videos;
