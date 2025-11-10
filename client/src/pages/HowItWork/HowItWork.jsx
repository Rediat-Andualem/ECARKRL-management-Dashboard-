

import styles from "./HowItWork.module.css";
import { motion } from "framer-motion";

function HowItWorks() {
  const features = [
    {
      title: "1. Register Chemicals, Gases & Consumables",
      desc: "Easily record all laboratory materials  chemicals, gases, and consumables  in one centralized platform. Each entry stores essential details like CAS number, name, and storage location for quick access.",
      icon: "🧪",
    },
    {
      title: "2. Smart Chemical Search",
      desc: "Quickly search for any chemical using its CAS number or name. This prevents duplicate orders by confirming availability in the lab before making new purchase requests.",
      icon: "🔍",
    },
    {
      title: "3. Gas Cylinder Tracking",
      desc: "Monitor the number and type of available gas cylinders in real time. Users can deduct consumed cylinders, and the system automatically updates remaining stock counts.",
      icon: "🧯",
    },
    {
      title: "4. Automated Gas Reordering Alerts",
      desc: "When gas stock reaches a low threshold, the system automatically sends an email alert for timely reordering  ensuring uninterrupted lab operations.",
      icon: "📩",
    },
    {
      title: "5. Consumables Location Register",
      desc: "Record and locate all consumables within the lab. Each registered item includes details on quantity, type, and location for efficient material management.",
      icon: "📦",
    },
    {
      title: "6. Equipment Manuals & Guides",
      desc: "Access PDF manuals and operating guides for laboratory instruments directly on the platform  reducing downtime and ensuring safe, proper equipment usage.",
      icon: "📘",
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
          How It Works
        </motion.h1>
        <div className={styles.divider}></div>

        <p className={styles.intro}>
          Our Laboratory Management System streamlines the entire workflow from
          registering materials to tracking and reordering supplies. Here’s a
          quick look at how it works:
        </p>

        <div className={styles.cardGrid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.icon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
