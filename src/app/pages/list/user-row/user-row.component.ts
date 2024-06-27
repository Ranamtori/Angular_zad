import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../user.model';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  editUser() {
    this.edit.emit(this.user);
  }

  deleteUser() {
    this.delete.emit(this.user.id);
  }
}
