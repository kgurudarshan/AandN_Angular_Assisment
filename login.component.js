const { Component } = ng.core;

const AppComponent = Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h2>Login</h2>
      <form (ngSubmit)="submitForm()" #loginForm="ngForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" name="name" [(ngModel)]="user.name" required>
          <div *ngIf="nameError" class="error">Name is required.</div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" [(ngModel)]="user.email" required>
          <div *ngIf="emailError" class="error">Email is required.</div>
          <div *ngIf="duplicateEmailError" class="error">Email is already taken.</div>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input type="tel" class="form-control" id="phone" name="phone" [(ngModel)]="user.phone" required>
          <div *ngIf="phoneError" class="error">Phone number is required.</div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || duplicateEmailError">Login</button>
      </form>
    </div>
    <div class="container">
      <h2>Admin Panel</h2>
      <div class="form-group">
        <label for="adminName">Admin Name:</label>
        <input type="text" class="form-control" id="adminName" name="adminName" [(ngModel)]="adminName" required>
      </div>
      <div>
        <button class="btn btn-success" (click)="createUser()">Create User</button>
        <button class="btn btn-primary" (click)="updateUser()">Update User</button>
        <button class="btn btn-danger" (click)="deleteUser()">Delete User</button>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 400px;
      margin: 0 auto;
    }
    
    .error {
      color: red;
      margin-top: 5px;
    }
  `
}).Class({
  constructor: function () {
    this.user = {
      name: '',
      email: '',
      phone: ''
    };
    this.nameError = false;
    this.emailError = false;
    this.duplicateEmailError = false;
    this.phoneError = false;
    this.adminName = '';
  },

  submitForm: function () {
    // Reset error flags
    this.nameError = false;
    this.emailError = false;
    this.duplicateEmailError = false;
    this.phoneError = false;

    // Validate fields
    if (!this.user.name) {
      this.nameError = true;
    }
    if (!this.user.email) {
      this.emailError = true;
    }
    if (!this.user.phone) {
      this.phoneError = true;
    }

    // Check for duplicate email
    if (this.user.email && this.checkDuplicateEmail(this.user.email)) {
      this.duplicateEmailError = true;
    }
}
})

    // Submit the form if there are
