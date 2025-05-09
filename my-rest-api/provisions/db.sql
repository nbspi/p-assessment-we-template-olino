-- Create main tables
CREATE TABLE Supplier (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_info TEXT
);

CREATE TABLE Component (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE Product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  product_code VARCHAR(50) UNIQUE NOT NULL,
  quantity_on_hand INT NOT NULL DEFAULT 0
);

-- Junction tables for many-to-many
CREATE TABLE SupplierComponent (
  supplier_id INT,
  component_id INT,
  PRIMARY KEY (supplier_id, component_id),
  FOREIGN KEY (supplier_id) REFERENCES Supplier(id),
  FOREIGN KEY (component_id) REFERENCES Component(id)
);

CREATE TABLE ProductComponent (
  product_id INT,
  component_id INT,
  PRIMARY KEY (product_id, component_id),
  FOREIGN KEY (product_id) REFERENCES Product(id),
  FOREIGN KEY (component_id) REFERENCES Component(id)
);
