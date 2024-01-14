import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date();
dayAfter.setDate(tomorrow.getDate() + 2);

const CUSTOMERS: Customer[] = [
  {
    id: 1,
    customerName: 'John Doe',
    registrationDate: today,
    address: 'Address 1',
    mobileNumber: '1234567890',
    gstNumber: 'GST123',
  },
  {
    id: 2,
    customerName: 'Michael R.',
    registrationDate: tomorrow,
    address: 'Address 2',
    mobileNumber: '9876543210',
    gstNumber: 'GST456',
  },
  {
    id: 3,
    customerName: 'Michael Smith',
    registrationDate: dayAfter,
    address: 'Address 4',
    mobileNumber: '9876543210',
    gstNumber: 'GST456',
  },
  {
    id: 4,
    customerName: 'Andrew Simon',
    registrationDate: tomorrow,
    address: 'Address 4',
    mobileNumber: '9876543210',
    gstNumber: 'GST456',
  },
];

@Component({
  selector: 'app-custmaster',
  styleUrls: ['./custmaster.component.css'],
  templateUrl: './custmaster.component.html',
})
export class CustmasterComponent {
  displayedColumns: string[] = [
    'select',
    'customerName',
    'registrationDate',
    'address',
    'mobileNumber',
    'gstNumber',
  ];
  dataSource = new MatTableDataSource<Customer>(CUSTOMERS);

  selectedCustomers: number[] = [];

  searchName = '';
  searchDate = null;

  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    // Implement your dialog here to add a new customer
    this.dialog
      .open(CustomerFormDialogComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((newCustomer) => {
        if (newCustomer) {
          newCustomer.id = new Date().getTime();
          this.dataSource.data = [...this.dataSource.data, newCustomer];
        }
      });
  }

  masterToggle(event: MatCheckboxChange) {
    // Implement master toggle logic for checkboxes
    if (event.checked) {
      this.selectedCustomers = this.dataSource.data.map((row) => row.id);
    } else {
      this.selectedCustomers = [];
    }
  }

  checkboxLabel(row: Customer, event: MatCheckboxChange): string {
    // Implement checkbox label logic

    if (event.checked) {
      if (!this.selectedCustomers.includes(row.id)) {
        this.selectedCustomers.push(row.id);
      }
    } else {
      this.selectedCustomers = this.selectedCustomers.filter(
        (x) => x !== row.id
      );
    }

    return `${row ? 'deselect' : 'select'} row ${row ? row.customerName : ''}`;
  }

  deleteSelectedCustomers() {
    this.dataSource.data = this.dataSource.data.filter(
      (customer) => !this.selectedCustomers.includes(customer.id)
    );
  }

  isSelected(id: number) {
    return this.selectedCustomers.includes(id);
  }

  searchCustomer() {
    this.dataSource.data = this.getFilteredData();
  }

  private getFilteredData() {
    let filteredData = CUSTOMERS;
    if (this.searchName) { // check if name filter textbox has value
      filteredData = filteredData.filter((customer) =>
        customer.customerName
          .toLowerCase()
          .includes(this.searchName.toLowerCase())
      );
    }

    if (this.searchDate) { // check if date filter has value
      filteredData = filteredData.filter((customer) =>
        this.isSameDate(customer.registrationDate, new Date(this.searchDate!))
      );
    }

    return filteredData;
  }

  private isSameDate(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
