import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user.model';
import { UserService } from '../../services/user.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteUserComponent {
  @Input() user!: User;
  @Output() confirmDelete = new EventEmitter<boolean>();

  constructor(private userService: UserService, public modalRef: MdbModalRef<DeleteUserComponent>) {}

  onConfirmDelete() {
    this.confirmDelete.emit(true);
    this.modalRef.close();
  }

  onCancel() {
    this.confirmDelete.emit(false);
    this.modalRef.close();
  }
}
