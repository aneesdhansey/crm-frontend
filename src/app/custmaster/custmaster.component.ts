import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

const CUSTOMERS: Customer[] = [
  {
    id: 1,
    customerName: 'Customer 1',
    registrationDate: new Date(),
    address: 'Address 1',
    mobileNumber: '1234567890',
    gstNumber: 'GST123',
  },
  {
    id: 2,
    customerName: 'Customer 2',
    registrationDate: new Date(),
    address: 'Address 2',
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
          this.dataSource.data = [...this.dataSource.data, newCustomer];
        }
      });
  }

  masterToggle(event: MatCheckboxChange) {
    // Implement master toggle logic for checkboxes
    if(event.checked) {
      this.selectedCustomers = this.dataSource.data.map(row => row.id);
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
    alert('Customers to be deleted - ' + this.selectedCustomers);
  }

  isSelected(id: number) {
    return this.selectedCustomers.includes(id);
  }
}
