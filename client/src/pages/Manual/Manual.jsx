"use client";

import styles from "./Manual.module.css";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

function Manuals() {
  const manuals = [
    {
      name: "Agilent 7890A GC",
      file: "/Manuals/Agilent_7890A_Gas_Chromatogrpah.pdf",
      desc: "Agilent 7890A Gas chromatography Machine full manual",
    },
    {
      name: "Agilent 8890 GC",
      file: "/Manuals/Agilent_8890_GC.pdf",
      desc: "Agilent 8890 Gas chromatography Machine full manual",
    },
    {
      name: "New Chrom 6700-6800 GC",
      file: "/Manuals/NewChrom_GC_6700-6800 Manual.pdf",
      desc: "New Chrom 6700-6800 GC full manual",
    },
    {
      name: "New Chrom 6800 TC",
      file: "/Manuals/NewChrom6800_Temperature_Controller_model.pdf",
      desc: "New Chrom 6800 Temperature controller and related manual",
    },
    {
      name: "Model 5800 GC",
      file: "/Manuals/GC_5800.pdf",
      desc: "Model 5800 Gas chromatography Machine operation manual",
    },
    {
      name: "About GC syringes",
      file: "/Manuals/GC_Syringes.pdf",
      desc: "GC syringe types and descriptions",
    },
    {
      name: "CS200 GC software manual",
      file: "/Manuals/CS200_Chromatographic_software_installation_workstation.pdf",
      desc: "CS200 software installation manual",
    },
    {
      name: "BET",
      file: "/Manuals/BET.pdf",
      desc: "BET machine (Quantachrome, U.S.A) analysis steps",
    },
    {
      name: "Ph meter",
      file: "/Manuals/Eutech_PH_700_ph_meter_manual.pdf",
      desc: "Eutech Ph meter calibration manual",
    },
    {
      name: "FTIR",
      file: "/Manuals/FTIR_manual.pdf",
      desc: "Fourier-transform infrared spectroscopy analysis manual.",
    },
    {
      name: "TPR",
      file: "/Manuals/TPR_analysis.pdf",
      desc: "Temperature-programmed reduction instrument manual.",
    },
    {
      name: "XRD",
      file: "/Manuals/XRD_machine_finalized.pdf",
      desc: "X-ray diffraction operation manual.",
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
          Equipment Manuals
        </motion.h1>

        <div className={styles.divider}></div>

        <p className={styles.intro}>
          Access detailed PDF manuals for all laboratory instruments. Click any
          manual below to download and learn how to operate the equipment safely
          and effectively.
        </p>

        <div className={styles.cardGrid}>
          {manuals.map((m, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className={styles.icon}>📘</div>
              <h3 className={styles.cardTitle}>{m.name}</h3>
              <p className={styles.cardDesc}>{m.desc}</p>
              <a href={m.file} download className={styles.downloadBtn}>
                <Download size={18} />
                <span>Download PDF</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Manuals;
