import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';

const CUSTOMERS: Customer[] = [
  {
    customerName: 'Customer 1',
    registrationDate: new Date(),
    address: 'Address 1',
    mobileNumber: '1234567890',
    gstNumber: 'GST123',
  },
  {
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

  masterToggle() {
    // Implement master toggle logic for checkboxes
  }

  checkboxLabel(row?: Customer): string {
    // Implement checkbox label logic
    return `${row ? 'deselect' : 'select'} row ${row ? row.customerName : ''}`;
  }
}
