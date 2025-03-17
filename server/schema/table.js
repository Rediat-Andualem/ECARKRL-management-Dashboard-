export let chemicals = `
CREATE TABLE IF NOT EXISTS chemicals (
  chemical_id INT AUTO_INCREMENT,
  chemical_name VARCHAR(255) NOT NULL,
  chemical_formula VARCHAR(255) NOT NULL,
  chemical_purity VARCHAR(255) NOT NULL,
  chemical_manufacturer VARCHAR(255) NOT NULL,
  chemical_vender_name VARCHAR(255) NOT NULL,
  chemical_state ENUM('SOLID', 'LIQUID', 'GAS') NOT NULL,
  chemical_packaging ENUM('GLASS', 'PLASTIC', 'OTHER CONTAINER') NOT NULL,
  chemical_amount INT NOT NULL,
  chemical_unit_of_measurement ENUM('ml','L','mg','g','kg') NOT NULL,
  chemical_expire_date VARCHAR(255) NOT NULL,
  chemical_location ENUM(
    'ALCOHOL SECTION','SOLID-A-B','SOLID-C-D','SOLID-E-F','SOLID-G-H','SOLID-I-J',
    'SOLID-K-L','SOLID-M-N','SOLID-O-P','SOLID-Q-R','SOLID-S-T','SOLID-U-V',
    'SOLID-W-X','SOLID-Y-Z','LIQUID-A-B','LIQUID-C-D','LIQUID-E-F','LIQUID-G-H',
    'LIQUID-I-J','LIQUID-K-L','LIQUID-M-N','LIQUID-O-P','LIQUID-Q-R','LIQUID-S-T',
    'LIQUID-U-V','LIQUID-W-X','LIQUID-Y-Z'
  ) NOT NULL,
  chemical_ordered_by VARCHAR(255) NOT NULL,
  chemical_delivered_date TIMESTAMP NOT NULL,
  chemical_priority ENUM('High','Low') NOT NULL,
  chemical_bill_path VARCHAR(255) DEFAULT 'not provided',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chemical_id)
)`;

export let registration = `
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT,
  user_first_name VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(255) DEFAULT '0' NOT NULL,
  user_password_update VARCHAR(255) DEFAULT '0',
  date_of_registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
)`;

export let profile = `
CREATE TABLE IF NOT EXISTS profile (
  profile_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_first_name VARCHAR(225) NOT NULL,
  user_last_name VARCHAR(225) NOT NULL,
  user_email VARCHAR(225) NOT NULL,
  user_role VARCHAR(255) DEFAULT '0' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (profile_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)`;

export let gases = `
CREATE TABLE IF NOT EXISTS gases (
  gas_id INT AUTO_INCREMENT,
  gas_name VARCHAR(255) NOT NULL,
  gas_ordered_by TEXT NOT NULL,
  gas_cylinders_amount INT NOT NULL,
  gas_bill_path VARCHAR(255) DEFAULT 'not provided',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (gas_id)
)`;

export let chemicalsConsumed = `
CREATE TABLE IF NOT EXISTS chemicals_consumed (
  chemical_consumption_id INT AUTO_INCREMENT,
  chemical_id INT NOT NULL,
  user_id INT NOT NULL,
  amount_consumed INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chemical_consumption_id),
  FOREIGN KEY (chemical_id) REFERENCES chemicals(chemical_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)`;

export let gasesConsumed = `
CREATE TABLE IF NOT EXISTS gases_consumed (
  gas_consumption_id INT AUTO_INCREMENT,
  gas_id INT NOT NULL,
  gas_cylinders_consumed INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (gas_consumption_id),
  FOREIGN KEY (gas_id) REFERENCES gases(gas_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)`;

export let consumables = `
CREATE TABLE IF NOT EXISTS consumables (
  consumables_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  consumable_name TEXT NOT NULL,
  consumable_location ENUM(
    'Consumable Location One [C-L-1]', 'Consumable Location Two [C-L-2]', 
    'Consumable Location Three [C-L-3]', 'Consumable Location Four [C-L-4]',
    'Consumable Location Five [C-L-5]', 'Consumable Location Six [C-L-6]',
    'Consumable Location Seven [C-L-7]', 'Consumable Location Eight [C-L-8]',
    'Consumable Location Nine [C-L-9]', 'Consumable Location Ten [C-L-10]'
  ) NOT NULL,
  picture_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  consumables_vender_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (consumables_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)`;
