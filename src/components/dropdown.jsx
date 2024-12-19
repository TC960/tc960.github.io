import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Socials
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </Dropdown.Item>
        <Dropdown.Item href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Dropdown.Item>
        <Dropdown.Item href="https://www.github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
