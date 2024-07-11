import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { AddEditUserComponent } from '../../modals/addedit/addedit.component';
import { DeleteUserComponent } from '../../modals/delete/delete.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UserRowComponent {
  // users: User[] = [];
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<number>();

  modalRef: MdbModalRef<AddEditUserComponent> | null = null;
  deleteModalRef: MdbModalRef<DeleteUserComponent> | null = null;


  constructor(private userService: UserService, private modalService: MdbModalService) {}


  openEditUserModal() {
    this.modalRef = this.modalService.open(AddEditUserComponent, {
      data: {
        editMode: true,
        currentUser: { ...this.user }
      }
    });

    this.modalRef.onClose.subscribe((result: any) => {
      if (result && result.user) {
        this.user = result.user;
        this.userUpdated.emit(this.user);
      }
    });
  }

  openDeleteUserModal() {
    this.deleteModalRef = this.modalService.open(DeleteUserComponent, {
      data: { user: this.user }
    });

    this.deleteModalRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser();
      }
    });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user.id).subscribe(
      () => {
        this.userDeleted.emit(this.user.id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
