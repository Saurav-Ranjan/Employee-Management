export interface Employee {
    id: number;          // Optional id for identifying the employee (auto-generated or manually assigned)
    name: string;         // Employee's name
    role: string;         // Employee's role/position
    fromDate: string;     // Employee's start date (string in ISO format)
    toDate: string;       // Employee's end date (string in ISO format)
  }
  